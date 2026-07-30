import { ApiConfig } from './ApiConfig';
import { ApiError } from './ApiError';

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
}

export class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string = ApiConfig.baseUrl) {
    this.baseUrl = baseUrl;
  }

  private async fetchWithTimeout(url: string, options: RequestOptions = {}): Promise<Response> {
    const { timeoutMs = ApiConfig.timeoutMs, ...fetchInit } = options;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchInit,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...fetchInit.headers,
        },
      });
      return response;
    } finally {
      clearTimeout(timer);
    }
  }

  public async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const retries = options.retries ?? ApiConfig.maxRetries;
    let attempt = 0;

    while (attempt <= retries) {
      try {
        const response = await this.fetchWithTimeout(url, options);

        if (!response.ok) {
          let errorData: any = {};
          try {
            errorData = await response.json();
          } catch {
            // response was not JSON
          }

          throw new ApiError(
            errorData.message || `HTTP Request failed with status ${response.status}`,
            response.status,
            errorData.code,
            errorData
          );
        }

        if (response.status === 204) {
          return {} as T;
        }

        return (await response.json()) as T;
      } catch (err) {
        attempt++;
        if (attempt > retries || (err instanceof ApiError && err.statusCode < 500)) {
          throw err;
        }
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 200));
      }
    }

    throw new ApiError('Maximum retry attempts reached', 0);
  }

  public get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  public post<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  public put<T>(endpoint: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  public delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const httpClient = new HttpClient();
