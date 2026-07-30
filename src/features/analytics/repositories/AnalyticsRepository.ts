import { mockAnalyticsStore, MockAnalyticsStore } from '../data/MockAnalyticsStore';
import type {
  CustomReport,
  FleetTimeSeriesPoint,
  PlaybackTimeSeriesPoint,
  UserMetricSummary,
  SystemUsageTimeSeriesPoint,
} from '../data/types';
import { ApiConfig } from '@/core/api/ApiConfig';
import { ApiAnalyticsRepository } from './ApiAnalyticsRepository';

export interface IAnalyticsRepository {
  getReports(): Promise<CustomReport[]>;
  getReportById(id: string): Promise<CustomReport | undefined>;
  createReport(report: Omit<CustomReport, 'id' | 'createdAt' | 'lastRunAt'>): Promise<CustomReport>;
  deleteReport(id: string): Promise<boolean>;
  getFleetInsights(days?: number): Promise<FleetTimeSeriesPoint[]>;
  getPlaybackInsights(days?: number): Promise<PlaybackTimeSeriesPoint[]>;
  getUserMetrics(): Promise<UserMetricSummary[]>;
  getSystemUsage(days?: number): Promise<SystemUsageTimeSeriesPoint[]>;
}

export class MockAnalyticsRepository implements IAnalyticsRepository {
  private store: MockAnalyticsStore;
  constructor(store: MockAnalyticsStore = mockAnalyticsStore) {
    this.store = store;
  }

  async getReports(): Promise<CustomReport[]> {
    return this.store.getReports();
  }

  async getReportById(id: string): Promise<CustomReport | undefined> {
    return this.store.getReportById(id);
  }

  async createReport(
    report: Omit<CustomReport, 'id' | 'createdAt' | 'lastRunAt'>
  ): Promise<CustomReport> {
    return this.store.addReport(report);
  }

  async deleteReport(id: string): Promise<boolean> {
    return this.store.deleteReport(id);
  }

  async getFleetInsights(days?: number): Promise<FleetTimeSeriesPoint[]> {
    return this.store.getFleetTimeSeries(days);
  }

  async getPlaybackInsights(days?: number): Promise<PlaybackTimeSeriesPoint[]> {
    return this.store.getPlaybackTimeSeries(days);
  }

  async getUserMetrics(): Promise<UserMetricSummary[]> {
    return this.store.getUserMetrics();
  }

  async getSystemUsage(days?: number): Promise<SystemUsageTimeSeriesPoint[]> {
    return this.store.getSystemUsageTimeSeries(days);
  }
}

export const analyticsRepository: IAnalyticsRepository = ApiConfig.useMockData
  ? new MockAnalyticsRepository()
  : new ApiAnalyticsRepository();
