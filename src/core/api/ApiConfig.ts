export const ApiConfig = {
  baseUrl: (import.meta.env.VITE_API_BASE_URL as string) || 'https://api.trotos.io/v1',
  useMockData: import.meta.env.VITE_USE_MOCK_DATA !== 'false',
  timeoutMs: 15000,
  maxRetries: 3,
};
