import type { IDeviceRepository } from './IDeviceRepository';
import type { 
  Device, 
  DeviceCreateDTO, 
  DeviceUpdateDTO, 
  PaginationParams, 
  DeviceFilters, 
  PaginatedResponse 
} from '../types';
import { mockStore } from '../../data/MockDataStore';

export class MockDeviceRepository implements IDeviceRepository {
  get devices() {
    return mockStore.devices;
  }

  set devices(val) {
    mockStore.devices = val;
  }

  // Helper to simulate network latency
  private async delay(ms: number = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async list(params: PaginationParams, filters?: DeviceFilters): Promise<PaginatedResponse<Device>> {
    await this.delay();

    let result = [...this.devices];

    if (filters) {
      if (filters.status && filters.status.length > 0) {
        result = result.filter(d => filters.status!.includes(d.status));
      }
      if (filters.organizationId && filters.organizationId.length > 0) {
        result = result.filter(d => filters.organizationId!.includes(d.organizationId));
      }
      if (filters.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(d => 
          d.name.toLowerCase().includes(query) || 
          d.id.toLowerCase().includes(query) ||
          d.organizationName.toLowerCase().includes(query)
        );
      }
    }

    // Sort by name for consistency (or lastSeen)
    result.sort((a, b) => a.name.localeCompare(b.name));

    const total = result.length;
    const start = (params.page - 1) * params.limit;
    const paginatedData = result.slice(start, start + params.limit);

    return {
      data: paginatedData,
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit)
    };
  }

  async getById(id: string): Promise<Device | null> {
    await this.delay(150);
    return this.devices.find(d => d.id === id) || null;
  }

  async create(data: DeviceCreateDTO): Promise<Device> {
    await this.delay(500);
    
    const newDevice: Device = {
      id: `dev_${Date.now()}`, // simple ID generation
      name: data.name,
      status: 'offline', // New devices start offline until they ping
      lastSeen: new Date().toISOString(),
      organizationId: data.organizationId,
      organizationName: 'Unknown Org', // in real life, fetched from org repo
      groupId: data.groupId,
      groupName: data.groupId ? 'Unknown Group' : undefined,
      tags: data.tags || [],
      hardwareModel: data.hardwareModel,
      resolution: data.resolution,
      orientation: data.orientation,
      firmwareVersion: 'v1.0.0', // factory default
      location: data.location,
      createdAt: new Date().toISOString()
    };

    this.devices.unshift(newDevice); // add to front
    return newDevice;
  }

  async update(id: string, data: DeviceUpdateDTO): Promise<Device> {
    await this.delay(400);
    const index = this.devices.findIndex(d => d.id === id);
    if (index === -1) throw new Error('Device not found');

    const updatedDevice = { ...this.devices[index], ...data };
    this.devices[index] = updatedDevice;
    return updatedDevice;
  }

  async delete(id: string): Promise<void> {
    await this.delay(300);
    this.devices = this.devices.filter(d => d.id !== id);
  }

  async bulkDelete(ids: string[]): Promise<void> {
    await this.delay(600);
    this.devices = this.devices.filter(d => !ids.includes(d.id));
  }

  async restart(id: string): Promise<void> {
    await this.delay(800);
    const device = await this.getById(id);
    if (!device) throw new Error('Device not found');
    
    // Simulate restart (goes offline then online)
    console.log(`[Mock Repo] Restart command sent to ${device.name}`);
  }

  async bulkRestart(ids: string[]): Promise<void> {
    await this.delay(1200);
    console.log(`[Mock Repo] Bulk restart command sent to ${ids.length} devices`);
  }

  async sync(id: string): Promise<void> {
    await this.delay(500);
    console.log(`[Mock Repo] Sync command sent to ${id}`);
  }

  async screenshot(id: string): Promise<string> {
    await this.delay(1500);
    // Return a random placeholder image
    return `https://picsum.photos/seed/${id}/800/600`;
  }

  async deploy(id: string, deploymentId: string): Promise<void> {
    await this.delay(600);
    console.log(`[Mock Repo] Deployment ${deploymentId} initiated for ${id}`);
  }
}

import { ApiConfig } from '@/core/api/ApiConfig';
import { ApiDeviceRepository } from './ApiDeviceRepository';

// Singleton instance for the frontend to use
export const deviceRepository: IDeviceRepository = ApiConfig.useMockData
  ? new MockDeviceRepository()
  : (new ApiDeviceRepository() as unknown as IDeviceRepository);

