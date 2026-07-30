export interface Advertiser {
  id: string;
  name: string;
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  logoUrl?: string;
  totalSpend: number;
  activeCampaignsCount: number;
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  advertiserId: string;
  advertiserName: string;
  budget: number;
  spent: number;
  targetImpressions: number;
  deliveredImpressions: number;
  startDate: string; // ISO
  endDate: string; // ISO
  status: 'draft' | 'active' | 'paused' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'exclusive';
  targetDeviceGroupIds: string[]; // References Operations Device Groups
  playlistIds: string[]; // References Content Playlists
  createdAt: string;
  updatedAt: string;
}

export interface CampaignAssignment {
  id: string;
  campaignId: string;
  campaignName: string;
  targetGroupId: string;
  targetGroupName: string;
  shareOfVoicePercent: number; // 1-100%
  status: 'active' | 'paused';
}

export interface CampaignReport {
  campaignId: string;
  campaignName: string;
  advertiserName: string;
  flightCompletionPercent: number;
  totalImpressions: number;
  targetImpressions: number;
  dailyPlaybackData: { date: string; impressions: number }[];
  deviceGroupBreakdown: { groupName: string; impressions: number; share: number }[];
}
