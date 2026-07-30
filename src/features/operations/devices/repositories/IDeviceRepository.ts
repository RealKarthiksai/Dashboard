import type { 
  Device, 
  DeviceCreateDTO, 
  DeviceUpdateDTO, 
  PaginationParams, 
  DeviceFilters, 
  PaginatedResponse 
} from '../types';

export interface IDeviceRepository {
  /** Get a paginated and filtered list of devices */
  list(params: PaginationParams, filters?: DeviceFilters): Promise<PaginatedResponse<Device>>;
  
  /** Get a single device by ID */
  getById(id: string): Promise<Device | null>;
  
  /** Create a new device */
  create(data: DeviceCreateDTO): Promise<Device>;
  
  /** Update an existing device */
  update(id: string, data: DeviceUpdateDTO): Promise<Device>;
  
  /** Delete a device */
  delete(id: string): Promise<void>;
  
  /** Bulk delete multiple devices */
  bulkDelete(ids: string[]): Promise<void>;
  
  /** Send a restart command to a device */
  restart(id: string): Promise<void>;
  
  /** Send a bulk restart command to multiple devices */
  bulkRestart(ids: string[]): Promise<void>;
  
  /** Force a content sync on a device */
  sync(id: string): Promise<void>;
  
  /** Request a live screenshot from a device */
  screenshot(id: string): Promise<string>; // Returns an image URL
  
  /** Deploy an update to a device */
  deploy(id: string, deploymentId: string): Promise<void>;
}
