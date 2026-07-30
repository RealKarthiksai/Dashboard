import { httpClient, HttpClient } from '@/core/api/HttpClient';
import { ApiEndpoints } from '@/core/api/ApiEndpoints';
import type { Advertiser, Campaign, CampaignAssignment, CampaignReport } from '../../data/types';

export class ApiCampaignRepository {
  private client: HttpClient;

  constructor(client: HttpClient = httpClient) {
    this.client = client;
  }

  async getAdvertisers(): Promise<Advertiser[]> {
    return this.client.get<Advertiser[]>(ApiEndpoints.MARKETING.ADVERTISERS);
  }

  async getCampaigns(): Promise<Campaign[]> {
    return this.client.get<Campaign[]>(ApiEndpoints.MARKETING.CAMPAIGNS);
  }

  async getCampaignById(id: string): Promise<Campaign | undefined> {
    return this.client.get<Campaign>(ApiEndpoints.MARKETING.CAMPAIGN_DETAIL(id));
  }

  async saveCampaign(campaign: Partial<Campaign>): Promise<Campaign> {
    if (campaign.id) {
      return this.client.put<Campaign>(ApiEndpoints.MARKETING.CAMPAIGN_DETAIL(campaign.id), campaign);
    }
    return this.client.post<Campaign>(ApiEndpoints.MARKETING.CAMPAIGNS, campaign);
  }

  async deleteCampaign(id: string): Promise<boolean> {
    await this.client.delete(ApiEndpoints.MARKETING.CAMPAIGN_DETAIL(id));
    return true;
  }

  async getAssignments(): Promise<CampaignAssignment[]> {
    return this.client.get<CampaignAssignment[]>(ApiEndpoints.MARKETING.ASSIGNMENTS);
  }

  async getReports(): Promise<CampaignReport[]> {
    return this.client.get<CampaignReport[]>(ApiEndpoints.MARKETING.REPORTS);
  }
}
