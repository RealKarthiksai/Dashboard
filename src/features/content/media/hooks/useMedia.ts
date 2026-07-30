import { useState, useEffect, useCallback } from 'react';
import { mediaRepository, type MediaFilters } from '../repositories/MockMediaRepository';
import type { Media, Collection } from '../../data/types';

export function useMedia(initialFilters: MediaFilters) {
  const [data, setData] = useState<Media[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MediaFilters>(initialFilters);

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    try {
      const response = await mediaRepository.getMedia(filters);
      setData(response.data);
      setTotal(response.total);
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const fetchCollections = useCallback(async () => {
    try {
      const cols = await mediaRepository.getCollections();
      setCollections(cols);
    } catch (error) {
      console.error('Failed to fetch collections:', error);
    }
  }, []);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const handleFilterChange = (newFilters: Partial<MediaFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const uploadMedia = async (file: File, collectionId?: string) => {
    const item = await mediaRepository.uploadMedia(file, collectionId);
    // Extended upload lifecycle: Selected -> Uploading -> Processing -> Ready
    fetchMedia();
    setTimeout(() => {
      mediaRepository.updateMediaStatus(item.id, 'uploading').then(() => fetchMedia());
      setTimeout(() => {
        mediaRepository.updateMediaStatus(item.id, 'processing').then(() => fetchMedia());
        setTimeout(() => {
          mediaRepository.updateMediaStatus(item.id, 'ready').then(() => fetchMedia());
        }, 1500);
      }, 1500);
    }, 1000);
  };

  return {
    data,
    collections,
    total,
    loading,
    filters,
    handleFilterChange,
    handlePageChange,
    refresh: fetchMedia,
    uploadMedia,
  };
}
