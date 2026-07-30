import { mockContentStore } from '../../data/MockContentStore';
import type { Media, Collection } from '../../data/types';

export interface MediaFilters {
  search?: string;
  type?: 'image' | 'video' | 'html';
  collectionId?: string;
  tags?: string[];
  recentlyAdded?: boolean;
  page: number;
  limit: number;
}

export interface PaginatedMediaResponse {
  data: Media[];
  total: number;
  page: number;
  limit: number;
}

export interface IMediaRepository {
  getMedia(filters: MediaFilters): Promise<PaginatedMediaResponse>;
  getMediaItem(id: string): Promise<Media | null>;
  uploadMedia(file: File, collectionId?: string): Promise<Media>;
  updateMediaStatus(id: string, status: Media['status']): Promise<void>;
  deleteMedia(id: string): Promise<{ success: boolean; affectedPlaylists?: string[] }>;
  getCollections(): Promise<Collection[]>;
}

export class MockMediaRepository implements IMediaRepository {
  private simulateLatency(ms: number = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getMedia(filters: MediaFilters): Promise<PaginatedMediaResponse> {
    await this.simulateLatency();

    let result = mockContentStore.assets;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(a => a.name.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q)));
    }
    if (filters.type) {
      result = result.filter(a => a.type === filters.type);
    }
    if (filters.collectionId) {
      result = result.filter(a => a.collectionIds.includes(filters.collectionId!));
    }
    if (filters.tags && filters.tags.length > 0) {
      result = result.filter(a => filters.tags!.every(t => a.tags.includes(t)));
    }
    if (filters.recentlyAdded) {
      result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const start = (filters.page - 1) * filters.limit;
    const paginatedData = result.slice(start, start + filters.limit);

    return {
      data: paginatedData,
      total: result.length,
      page: filters.page,
      limit: filters.limit
    };
  }

  async getMediaItem(id: string): Promise<Media | null> {
    await this.simulateLatency(100);
    return mockContentStore.assets.find(a => a.id === id) || null;
  }

  async uploadMedia(file: File, collectionId?: string): Promise<Media> {
    const newMedia: Media = {
      id: `ast_new_${Date.now()}`,
      name: file.name,
      type: file.type.startsWith('video') ? 'video' : file.type.startsWith('image') ? 'image' : 'html',
      mimeType: file.type || 'application/octet-stream',
      size: file.size,
      checksum: `chk_${Math.random().toString(36).substring(2, 9)}`,
      status: 'selected',
      tags: ['new'],
      collectionIds: collectionId ? [collectionId] : [],
      createdBy: 'currentUser',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      url: '',
      usageCount: 0,
      usedInPlaylists: [],
      favorite: false,
      archived: false,
    };

    mockContentStore.assets.unshift(newMedia);
    return newMedia;
  }

  async updateMediaStatus(id: string, status: Media['status']): Promise<void> {
    const asset = mockContentStore.assets.find(a => a.id === id);
    if (asset) {
      asset.status = status;
      if (status === 'ready') {
        asset.url = `https://mock.cdn.invalid/${id}`;
        if (asset.type === 'image' || asset.type === 'video') {
          asset.thumbnailUrl = `https://mock.cdn.invalid/thumb_${id}`;
        }
      }
    }
  }

  async deleteMedia(id: string): Promise<{ success: boolean; affectedPlaylists?: string[] }> {
    await this.simulateLatency();
    const asset = mockContentStore.assets.find(a => a.id === id);
    if (asset && asset.usedInPlaylists.length > 0) {
      return { success: false, affectedPlaylists: asset.usedInPlaylists };
    }
    mockContentStore.assets = mockContentStore.assets.filter(a => a.id !== id);
    return { success: true };
  }

  async getCollections(): Promise<Collection[]> {
    await this.simulateLatency(100);
    return mockContentStore.collections;
  }
}

import { ApiConfig } from '@/core/api/ApiConfig';
import { ApiMediaRepository } from './ApiMediaRepository';

export const mediaRepository: IMediaRepository = ApiConfig.useMockData
  ? new MockMediaRepository()
  : (new ApiMediaRepository() as unknown as IMediaRepository);

