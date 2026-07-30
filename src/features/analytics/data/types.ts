export interface CustomReport {
  id: string;
  title: string;
  description: string;
  category: 'fleet' | 'playback' | 'user' | 'custom';
  metrics: string[];
  dimensions: string[];
  dateRange: '7d' | '30d' | '90d' | 'custom';
  startDate?: string;
  endDate?: string;
  createdBy: string;
  createdAt: string;
  lastRunAt: string;
  schedule: 'none' | 'daily' | 'weekly' | 'monthly';
}

export interface FleetTimeSeriesPoint {
  date: string;
  uptime: number; // percentage 0-100
  offlineEvents: number;
  bandwidthUsageGb: number;
  activeDevices: number;
}

export interface PlaybackTimeSeriesPoint {
  date: string;
  totalImpressions: number;
  completedPlays: number;
  failedPlays: number;
  proofOfPlayRatio: number; // 0-1
}

export interface UserMetricSummary {
  id: string;
  userName: string;
  userEmail: string;
  role: string;
  loginCount: number;
  lastActiveAt: string;
  actionsPerformed: number;
  status: 'active' | 'idle' | 'offline';
}

export interface SystemUsageTimeSeriesPoint {
  date: string;
  activeUsers: number;
  apiRequests: number;
  errorRate: number; // percentage 0-100
}
