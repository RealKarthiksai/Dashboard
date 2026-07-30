import { httpClient, HttpClient } from '@/core/api/HttpClient';
import { ApiEndpoints } from '@/core/api/ApiEndpoints';
import type { Device, DeviceFilters } from '../types';

export class ApiDeviceRepository {
  private client: HttpClient;

  constructor(client: HttpClient = httpClient) {
    this.client = client;
  }

  async getDevices(filter?: DeviceFilters): Promise<Device[]> {
    const params = new URLSearchParams();
    if (filter?.status && filter.status.length > 0) params.append('status', filter.status.join(','));
    if (filter?.search) params.append('search', filter.search);
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.client.get<Device[]>(`${ApiEndpoints.DEVICES.LIST}${query}`);
  }

  async getDeviceById(id: string): Promise<Device | null> {
    return this.client.get<Device>(ApiEndpoints.DEVICES.DETAIL(id));
  }

  async createDevice(device: Partial<Device>): Promise<Device> {
    return this.client.post<Device>(ApiEndpoints.DEVICES.LIST, device);
  }

  async updateDevice(id: string, updates: Partial<Device>): Promise<Device> {
    return this.client.put<Device>(ApiEndpoints.DEVICES.DETAIL(id), updates);
  }

  async sendCommand(id: string, command: string): Promise<boolean> {
    await this.client.post(ApiEndpoints.DEVICES.COMMAND(id), { command });
    return true;
  }

  async deleteDevice(id: string): Promise<boolean> {
    await this.client.delete(ApiEndpoints.DEVICES.DETAIL(id));
    return true;
  }
}
