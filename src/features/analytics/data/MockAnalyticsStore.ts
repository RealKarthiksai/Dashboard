import type {
  CustomReport,
  FleetTimeSeriesPoint,
  PlaybackTimeSeriesPoint,
  UserMetricSummary,
  SystemUsageTimeSeriesPoint,
} from './types';

export class MockAnalyticsStore {
  private reports: CustomReport[] = [
    {
      id: 'rep-1',
      title: 'Monthly Fleet Health & Uptime',
      description: 'Comprehensive analysis of device uptime, offline frequency, and total bandwidth.',
      category: 'fleet',
      metrics: ['uptime', 'offlineEvents', 'bandwidthUsageGb'],
      dimensions: ['deviceGroup', 'location'],
      dateRange: '30d',
      createdBy: 'Sarah Jenkins',
      createdAt: '2026-07-01T10:00:00Z',
      lastRunAt: '2026-07-29T18:30:00Z',
      schedule: 'weekly',
    },
    {
      id: 'rep-2',
      title: 'Ad Campaign Proof of Play Audit',
      description: 'Audit report verifying impression counts and playback success ratios for active sponsors.',
      category: 'playback',
      metrics: ['totalImpressions', 'completedPlays', 'proofOfPlayRatio'],
      dimensions: ['campaignId', 'advertiserId'],
      dateRange: '7d',
      createdBy: 'Marcus Vance',
      createdAt: '2026-07-10T14:20:00Z',
      lastRunAt: '2026-07-30T09:00:00Z',
      schedule: 'daily',
    },
    {
      id: 'rep-3',
      title: 'Quarterly Operator System Activity',
      description: 'User activity logs, login rates, and administrative actions performed across TrotOS.',
      category: 'user',
      metrics: ['loginCount', 'actionsPerformed', 'activeUsers'],
      dimensions: ['role', 'userEmail'],
      dateRange: '90d',
      createdBy: 'Elena Rostova',
      createdAt: '2026-06-15T11:00:00Z',
      lastRunAt: '2026-07-28T16:45:00Z',
      schedule: 'monthly',
    },
  ];

  public getReports(): CustomReport[] {
    return [...this.reports];
  }

  public getReportById(id: string): CustomReport | undefined {
    return this.reports.find((r) => r.id === id);
  }

  public addReport(report: Omit<CustomReport, 'id' | 'createdAt' | 'lastRunAt'>): CustomReport {
    const newReport: CustomReport = {
      ...report,
      id: `rep-${Date.now()}`,
      createdAt: new Date().toISOString(),
      lastRunAt: new Date().toISOString(),
    };
    this.reports.unshift(newReport);
    return newReport;
  }

  public deleteReport(id: string): boolean {
    const idx = this.reports.findIndex((r) => r.id === id);
    if (idx !== -1) {
      this.reports.splice(idx, 1);
      return true;
    }
    return false;
  }

  public getFleetTimeSeries(days: number = 30): FleetTimeSeriesPoint[] {
    const points: FleetTimeSeriesPoint[] = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const baseUptime = 98.2 + Math.sin(i / 2) * 1.5;
      points.push({
        date: dateStr,
        uptime: parseFloat(baseUptime.toFixed(1)),
        offlineEvents: Math.floor(Math.random() * 8) + 1,
        bandwidthUsageGb: parseFloat((45 + Math.random() * 20).toFixed(1)),
        activeDevices: 148 + Math.floor(Math.random() * 4),
      });
    }
    return points;
  }

  public getPlaybackTimeSeries(days: number = 30): PlaybackTimeSeriesPoint[] {
    const points: PlaybackTimeSeriesPoint[] = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const impressions = Math.floor(12000 + Math.random() * 3500 + i * 150);
      const failed = Math.floor(impressions * (0.005 + Math.random() * 0.01));
      const completed = impressions - failed;
      points.push({
        date: dateStr,
        totalImpressions: impressions,
        completedPlays: completed,
        failedPlays: failed,
        proofOfPlayRatio: parseFloat((completed / impressions).toFixed(4)),
      });
    }
    return points;
  }

  public getUserMetrics(): UserMetricSummary[] {
    return [
      {
        id: 'u-1',
        userName: 'Sarah Jenkins',
        userEmail: 'sarah.j@trotos.io',
        role: 'Fleet Operations Manager',
        loginCount: 142,
        lastActiveAt: '2026-07-30T14:32:00Z',
        actionsPerformed: 890,
        status: 'active',
      },
      {
        id: 'u-2',
        userName: 'Marcus Vance',
        userEmail: 'marcus.v@trotos.io',
        role: 'Ad Operations Specialist',
        loginCount: 98,
        lastActiveAt: '2026-07-30T15:02:00Z',
        actionsPerformed: 540,
        status: 'active',
      },
      {
        id: 'u-3',
        userName: 'Elena Rostova',
        userEmail: 'elena.r@trotos.io',
        role: 'Content Director',
        loginCount: 76,
        lastActiveAt: '2026-07-29T17:15:00Z',
        actionsPerformed: 310,
        status: 'idle',
      },
      {
        id: 'u-4',
        userName: 'David Kalu',
        userEmail: 'david.k@trotos.io',
        role: 'System Administrator',
        loginCount: 210,
        lastActiveAt: '2026-07-30T12:44:00Z',
        actionsPerformed: 1420,
        status: 'active',
      },
      {
        id: 'u-5',
        userName: 'Chloe Bennett',
        userEmail: 'chloe.b@trotos.io',
        role: 'Analytics Viewer',
        loginCount: 14,
        lastActiveAt: '2026-07-25T11:00:00Z',
        actionsPerformed: 45,
        status: 'offline',
      },
    ];
  }

  public getSystemUsageTimeSeries(days: number = 30): SystemUsageTimeSeriesPoint[] {
    const points: SystemUsageTimeSeriesPoint[] = [];
    const now = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      points.push({
        date: dateStr,
        activeUsers: Math.floor(18 + Math.random() * 12),
        apiRequests: Math.floor(84000 + Math.random() * 25000),
        errorRate: parseFloat((0.08 + Math.random() * 0.12).toFixed(2)),
      });
    }
    return points;
  }
}

export const mockAnalyticsStore = new MockAnalyticsStore();
