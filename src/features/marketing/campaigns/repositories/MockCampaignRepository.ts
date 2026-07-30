import { mockMarketingStore } from '../../data/MockMarketingStore';
import type { Campaign } from '../../data/types';

export interface ICampaignRepository {
  getCampaigns(): Promise<Campaign[]>;
  getCampaign(id: string): Promise<Campaign | null>;
  saveCampaign(campaign: Campaign): Promise<Campaign>;
  deleteCampaign(id: string): Promise<void>;
}

export class MockCampaignRepository implements ICampaignRepository {
  private simulateLatency(ms: number = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getCampaigns(): Promise<Campaign[]> {
    await this.simulateLatency();
    return [...mockMarketingStore.campaigns];
  }

  async getCampaign(id: string): Promise<Campaign | null> {
    await this.simulateLatency(100);
    const cmp = mockMarketingStore.campaigns.find(c => c.id === id);
    return cmp ? JSON.parse(JSON.stringify(cmp)) : null;
  }

  async saveCampaign(campaign: Campaign): Promise<Campaign> {
    await this.simulateLatency();
    campaign.updatedAt = new Date().toISOString();
    const idx = mockMarketingStore.campaigns.findIndex(c => c.id === campaign.id);
    if (idx >= 0) {
      mockMarketingStore.campaigns[idx] = JSON.parse(JSON.stringify(campaign));
    } else {
      mockMarketingStore.campaigns.unshift(JSON.parse(JSON.stringify(campaign)));
    }
    return campaign;
  }

  async deleteCampaign(id: string): Promise<void> {
    await this.simulateLatency();
    mockMarketingStore.campaigns = mockMarketingStore.campaigns.filter(c => c.id !== id);
  }
}

import { ApiConfig } from '@/core/api/ApiConfig';
import { ApiCampaignRepository } from './ApiCampaignRepository';

export const campaignRepository: ICampaignRepository = ApiConfig.useMockData
  ? new MockCampaignRepository()
  : (new ApiCampaignRepository() as unknown as ICampaignRepository);

