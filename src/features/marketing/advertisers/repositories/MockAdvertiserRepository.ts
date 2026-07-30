import { mockMarketingStore } from '../../data/MockMarketingStore';
import type { Advertiser } from '../../data/types';

export interface IAdvertiserRepository {
  getAdvertisers(): Promise<Advertiser[]>;
  saveAdvertiser(advertiser: Advertiser): Promise<Advertiser>;
  deleteAdvertiser(id: string): Promise<void>;
}

export class MockAdvertiserRepository implements IAdvertiserRepository {
  private simulateLatency(ms: number = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAdvertisers(): Promise<Advertiser[]> {
    await this.simulateLatency();
    return [...mockMarketingStore.advertisers];
  }

  async saveAdvertiser(advertiser: Advertiser): Promise<Advertiser> {
    await this.simulateLatency();
    const idx = mockMarketingStore.advertisers.findIndex(a => a.id === advertiser.id);
    if (idx >= 0) {
      mockMarketingStore.advertisers[idx] = JSON.parse(JSON.stringify(advertiser));
    } else {
      mockMarketingStore.advertisers.unshift(JSON.parse(JSON.stringify(advertiser)));
    }
    return advertiser;
  }

  async deleteAdvertiser(id: string): Promise<void> {
    await this.simulateLatency();
    mockMarketingStore.advertisers = mockMarketingStore.advertisers.filter(a => a.id !== id);
  }
}

export const advertiserRepository = new MockAdvertiserRepository();
