import { useState, useEffect, useCallback } from 'react';
import { advertiserRepository } from '../repositories/MockAdvertiserRepository';
import type { Advertiser } from '../../data/types';

export function useAdvertisers() {
  const [data, setData] = useState<Advertiser[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdvertisers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await advertiserRepository.getAdvertisers();
      setData(response);
    } catch (error) {
      console.error('Failed to fetch advertisers:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAdvertisers();
  }, [fetchAdvertisers]);

  const deleteAdvertiser = async (id: string) => {
    await advertiserRepository.deleteAdvertiser(id);
    await fetchAdvertisers();
  };

  return {
    data,
    loading,
    refresh: fetchAdvertisers,
    deleteAdvertiser
  };
}
