export type JobState = 
  | 'JOB_ASSIGNED'
  | 'TECHNICIAN_ACCEPTED'
  | 'EN_ROUTE'
  | 'ARRIVED'
  | 'PAIRING'
  | 'INSTALLING'
  | 'VERIFYING'
  | 'WAITING_SIGNATURE'
  | 'COMMISSIONING'
  | 'OFFLINE_QUEUED'
  | 'COMPLETED'
  | 'FAILED';

export type HardwareDeviceType = 'player_tablet' | 'display' | 'led_wall';

export interface DiagnosticCategoryResult {
  lte: boolean;
  dns: boolean;
  display: boolean;
  touch: boolean;
  power: boolean;
  daemon: boolean;
  sync: boolean;
}

export interface DiagnosticReport {
  passed: boolean;
  checkedAt: string;
  categories: {
    connectivity: { name: string; status: boolean; detail: string }[];
    hardware: { name: string; status: boolean; detail: string }[];
    software: { name: string; status: boolean; detail: string }[];
  };
}

export interface TechnicianJob {
  id: string;
  jobCode: string;
  title: string;
  state: JobState;
  siteNodeId: string;
  siteNodeName: string;
  siteAddress: string;
  targetCoordinates: { lat: number; lng: number };
  deviceType: HardwareDeviceType;
  requiredHardwareSku: string;
  pairedSerialNumber?: string;
  pairingMethod?: 'QR' | 'NFC' | 'MANUAL';
  checklist: { id: string; label: string; completed: boolean }[];
  photos: string[];
  signatureData?: string;
  diagnosticReport?: DiagnosticReport;
  assignedTechId: string;
  assignedTechName: string;
  slaDueDate: string;
  offlineQueued?: boolean;
  failureReason?: string;
}
