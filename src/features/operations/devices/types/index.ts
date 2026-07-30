export type DeviceStatus = 'online' | 'offline' | 'warning' | 'unknown';

export interface DeviceLocation {
  city: string;
  country: string;
  timezone: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
  lastSeen: string; // ISO date string
  organizationId: string;
  organizationName: string;
  groupId?: string;
  groupName?: string;
  tags: string[];
  firmwareVersion: string;
  hardwareModel: string;
  resolution: string; // e.g., '1920x1080'
  orientation: 'landscape' | 'portrait';
  location: DeviceLocation;
  lastDeploymentId?: string;
  lastDeploymentStatus?: 'success' | 'failed' | 'pending';
  createdAt: string; // ISO date string
}

export interface DeviceCreateDTO {
  name: string;
  organizationId: string;
  groupId?: string;
  tags?: string[];
  hardwareModel: string;
  resolution: string;
  orientation: 'landscape' | 'portrait';
  location: DeviceLocation;
}

export interface DeviceUpdateDTO extends Partial<DeviceCreateDTO> {
  status?: DeviceStatus;
  firmwareVersion?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface DeviceFilters {
  status?: DeviceStatus[];
  organizationId?: string[];
  firmwareVersion?: string[];
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
