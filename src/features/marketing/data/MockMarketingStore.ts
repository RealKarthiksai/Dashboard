import type { Advertiser, Campaign, CampaignAssignment, CampaignReport } from './types';

class MockMarketingStore {
  public advertisers: Advertiser[] = [];
  public campaigns: Campaign[] = [];
  public assignments: CampaignAssignment[] = [];
  public reports: CampaignReport[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // 1. Generate 10 Advertisers
    const companyNames = [
      'Acme Global', 'Starlight Media', 'Nexus Digital', 'Apex Beverages', 'Vanguard Motors',
      'Horizon Telecom', 'Pulse Energy', 'Omni Retail', 'Hyperion Tech', 'Quantum Healthcare'
    ];

    this.advertisers = companyNames.map((name, i) => ({
      id: `adv_${(i + 1).toString().padStart(3, '0')}`,
      name: `${name} Brand`,
      companyName: name,
      contactEmail: `contact@${name.toLowerCase().replace(/\s+/g, '')}.invalid`,
      contactPhone: `+1 (555) ${100 + i * 15}-${2000 + i * 33}`,
      logoUrl: `https://mock.cdn.invalid/logo_${i + 1}`,
      totalSpend: Math.floor(Math.random() * 500000) + 25000,
      activeCampaignsCount: Math.floor(Math.random() * 4) + 1,
      status: 'active',
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString()
    }));

    // 2. Generate 30 Campaigns
    const campaignNames = [
      'Summer Refresh 2026', 'Electric SUV Launch', 'Holiday Mega Sale', '5G Speed Upgrade',
      'Health & Fitness Drive', 'Zero Sugar Promo', 'Smart Home Ecosystem', 'Premium Coffee Month',
      'Black Friday Takeover', 'Winter Fashion Runway', 'Airport VIP Lounge Ad', 'Downtown Kiosk Blitz'
    ];

    const priorities: Campaign['priority'][] = ['low', 'medium', 'high', 'exclusive'];
    const statuses: Campaign['status'][] = ['active', 'active', 'draft', 'paused', 'completed'];

    for (let i = 1; i <= 30; i++) {
      const adv = this.advertisers[i % this.advertisers.length];
      const targetImp = Math.floor(Math.random() * 1000000) + 100000;
      const deliveredImp = Math.floor(targetImp * (Math.random() * 0.9 + 0.1));
      const budget = Math.floor(Math.random() * 50000) + 5000;
      const spent = Math.floor(budget * (deliveredImp / targetImp));

      const campaign: Campaign = {
        id: `cmp_${i.toString().padStart(3, '0')}`,
        name: `${campaignNames[i % campaignNames.length]} #${i}`,
        advertiserId: adv.id,
        advertiserName: adv.companyName,
        budget,
        spent,
        targetImpressions: targetImp,
        deliveredImpressions: deliveredImp,
        startDate: new Date(Date.now() - 15 * 86400000).toISOString(),
        endDate: new Date(Date.now() + 15 * 86400000).toISOString(),
        status: statuses[i % statuses.length],
        priority: priorities[i % priorities.length],
        targetDeviceGroupIds: ['grp_001', 'grp_002'],
        playlistIds: ['pl_001', 'pl_002'],
        createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      };

      this.campaigns.push(campaign);

      // Create Assignments
      this.assignments.push({
        id: `asg_${i}_1`,
        campaignId: campaign.id,
        campaignName: campaign.name,
        targetGroupId: 'grp_001',
        targetGroupName: 'North Wing Displays',
        shareOfVoicePercent: 25,
        status: 'active'
      });
    }

    // 3. Create Reports for Active Campaigns
    this.reports = this.campaigns.map(c => ({
      campaignId: c.id,
      campaignName: c.name,
      advertiserName: c.advertiserName,
      flightCompletionPercent: Math.min(100, Math.floor((c.deliveredImpressions / c.targetImpressions) * 100)),
      totalImpressions: c.deliveredImpressions,
      targetImpressions: c.targetImpressions,
      dailyPlaybackData: Array.from({ length: 7 }).map((_, idx) => ({
        date: new Date(Date.now() - (6 - idx) * 86400000).toISOString().split('T')[0],
        impressions: Math.floor(c.deliveredImpressions / 7 + (Math.random() * 2000 - 1000))
      })),
      deviceGroupBreakdown: [
        { groupName: 'North Wing Displays', impressions: Math.floor(c.deliveredImpressions * 0.6), share: 60 },
        { groupName: 'South Wing Kiosks', impressions: Math.floor(c.deliveredImpressions * 0.4), share: 40 }
      ]
    }));
  }
}

export const mockMarketingStore = new MockMarketingStore();
