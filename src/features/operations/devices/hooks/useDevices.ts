import { useState, useCallback, useEffect } from 'react';
import type { Device, DeviceFilters, PaginationParams, PaginatedResponse } from '../types';
import { deviceRepository } from '../repositories/MockDeviceRepository';

export function useDevices(initialParams: PaginationParams = { page: 1, limit: 20 }) {
  const [data, setData] = useState<PaginatedResponse<Device> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const [params, setParams] = useState<PaginationParams>(initialParams);
  const [filters, setFilters] = useState<DeviceFilters>({});

  const fetchDevices = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await deviceRepository.list(params, filters);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch devices'));
    } finally {
      setLoading(false);
    }
  }, [params, filters]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const handlePageChange = (newPage: number) => {
    setParams(prev => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (newFilters: Partial<DeviceFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setParams(prev => ({ ...prev, page: 1 })); // Reset to first page on filter change
  };

  return {
    data,
    loading,
    error,
    params,
    filters,
    handlePageChange,
    handleFilterChange,
    refresh: fetchDevices,
  };
}
