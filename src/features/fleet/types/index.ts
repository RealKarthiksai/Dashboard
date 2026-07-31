export type SiteNodeType = 
  | 'region' 
  | 'city' 
  | 'site' 
  | 'building' 
  | 'floor' 
  | 'zone' 
  | 'corridor' 
  | 'screen_location';

export interface SiteNode {
  id: string;
  parentId: string | null;
  name: string;
  nodeType: SiteNodeType;
  code?: string;
  address?: string;
  coordinates?: { lat: number; lng: number };
  deviceCount: number;
  activeAlerts: number;
  healthScore: number; // 0 - 100
  metadata?: Record<string, string | number>;
}

export type InventoryAssetStatus = 
  | 'WAREHOUSE' 
  | 'RESERVED' 
  | 'INSTALLED' 
  | 'REMOVED' 
  | 'IN_REPAIR' 
  | 'RMA' 
  | 'DISPOSED';

export type InventoryCategory = 
  | 'display' 
  | 'player_tablet' 
  | 'mount_kit' 
  | 'power_adapter' 
  | 'lte_dongle' 
  | 'cable';

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  serialNumber: string;
  category: InventoryCategory;
  status: InventoryAssetStatus;
  locationId: string;
  locationName: string;
  assignedDeviceId?: string;
  purchaseDate: string;
  warrantyExpiry: string;
  condition: 'NEW' | 'EXCELLENT' | 'FAIR' | 'DAMAGED';
  costUsd: number;
}

export type WorkOrderStatus = 
  | 'OPEN' 
  | 'ASSIGNED' 
  | 'TRAVELLING' 
  | 'ON_SITE' 
  | 'REPAIRING' 
  | 'WAITING_PARTS' 
  | 'COMPLETED' 
  | 'VERIFIED' 
  | 'CLOSED';

export type WorkOrderPriority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface MaintenanceTicket {
  id: string;
  ticketNumber: string;
  title: string;
  deviceId?: string;
  deviceName?: string;
  siteNodeId: string;
  siteNodeName: string;
  inventoryAssetId?: string;
  inventoryAssetSerial?: string;
  technicianId?: string;
  technicianName?: string;
  priority: WorkOrderPriority;
  status: WorkOrderStatus;
  category: 'SCREEN_BLACK' | 'TOUCH_FAILURE' | 'NETWORK_OFFLINE' | 'POWER_FAULT' | 'PHYSICAL_DAMAGE' | 'SOFTWARE_FREEZE';
  createdAt: string;
  slaDueDate: string;
  lastServiceDate?: string;
  warrantyStatus: 'ACTIVE' | 'EXPIRED';
  replacementSku?: string;
  notes?: string;
}
