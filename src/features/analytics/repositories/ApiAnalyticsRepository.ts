import { httpClient, HttpClient } from '@/core/api/HttpClient';
import { ApiEndpoints } from '@/core/api/ApiEndpoints';
import type {
  CustomReport,
  FleetTimeSeriesPoint,
  PlaybackTimeSeriesPoint,
  UserMetricSummary,
  SystemUsageTimeSeriesPoint,
} from '../data/types';
import type { IAnalyticsRepository } from './AnalyticsRepository';

export class ApiAnalyticsRepository implements IAnalyticsRepository {
  private client: HttpClient;

  constructor(client: HttpClient = httpClient) {
    this.client = client;
  }

  async getReports(): Promise<CustomReport[]> {
    return this.client.get<CustomReport[]>(ApiEndpoints.ANALYTICS.REPORTS);
  }

  async getReportById(id: string): Promise<CustomReport | undefined> {
    return this.client.get<CustomReport>(`${ApiEndpoints.ANALYTICS.REPORTS}/${id}`);
  }

  async createReport(report: Omit<CustomReport, 'id' | 'createdAt' | 'lastRunAt'>): Promise<CustomReport> {
    return this.client.post<CustomReport>(ApiEndpoints.ANALYTICS.REPORTS, report);
  }

  async deleteReport(id: string): Promise<boolean> {
    await this.client.delete(`${ApiEndpoints.ANALYTICS.REPORTS}/${id}`);
    return true;
  }

  async getFleetInsights(days?: number): Promise<FleetTimeSeriesPoint[]> {
    const query = days ? `?days=${days}` : '';
    return this.client.get<FleetTimeSeriesPoint[]>(`${ApiEndpoints.ANALYTICS.FLEET_INSIGHTS}${query}`);
  }

  async getPlaybackInsights(days?: number): Promise<PlaybackTimeSeriesPoint[]> {
    const query = days ? `?days=${days}` : '';
    return this.client.get<PlaybackTimeSeriesPoint[]>(`${ApiEndpoints.ANALYTICS.PLAYBACK_INSIGHTS}${query}`);
  }

  async getUserMetrics(): Promise<UserMetricSummary[]> {
    return this.client.get<UserMetricSummary[]>(ApiEndpoints.ANALYTICS.USER_METRICS);
  }

  async getSystemUsage(days?: number): Promise<SystemUsageTimeSeriesPoint[]> {
    const query = days ? `?days=${days}` : '';
    return this.client.get<SystemUsageTimeSeriesPoint[]>(`/analytics/metrics/system${query}`);
  }
}
