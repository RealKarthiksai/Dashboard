import { useState, useEffect, useCallback } from 'react';
import { campaignRepository } from '../repositories/MockCampaignRepository';
import type { Campaign } from '../../data/types';

export function useCampaigns() {
  const [data, setData] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCampaigns = useCallback(async () => {
    setLoading(true);
    try {
      const response = await campaignRepository.getCampaigns();
      setData(response);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const deleteCampaign = async (id: string) => {
    await campaignRepository.deleteCampaign(id);
    await fetchCampaigns();
  };

  return {
    data,
    loading,
    refresh: fetchCampaigns,
    deleteCampaign
  };
}
