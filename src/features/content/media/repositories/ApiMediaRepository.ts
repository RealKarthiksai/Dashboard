import { httpClient, HttpClient } from '@/core/api/HttpClient';
import { ApiEndpoints } from '@/core/api/ApiEndpoints';
import type { Media, Playlist, Collection } from '../../data/types';
import type { MediaFilters, PaginatedMediaResponse, IMediaRepository } from './MockMediaRepository';

export class ApiMediaRepository implements IMediaRepository {
  private client: HttpClient;

  constructor(client: HttpClient = httpClient) {
    this.client = client;
  }

  async getMedia(filters: MediaFilters): Promise<PaginatedMediaResponse> {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.type) params.append('type', filters.type);
    if (filters.collectionId) params.append('collectionId', filters.collectionId);
    params.append('page', String(filters.page));
    params.append('limit', String(filters.limit));
    const query = params.toString() ? `?${params.toString()}` : '';
    return this.client.get<PaginatedMediaResponse>(`${ApiEndpoints.CONTENT.MEDIA}${query}`);
  }

  async getMediaItem(id: string): Promise<Media | null> {
    return this.client.get<Media>(`${ApiEndpoints.CONTENT.MEDIA}/${id}`);
  }

  async uploadMedia(file: File, collectionId?: string): Promise<Media> {
    const formData = new FormData();
    formData.append('file', file);
    if (collectionId) formData.append('collectionId', collectionId);
    return this.client.post<Media>(ApiEndpoints.CONTENT.MEDIA, formData);
  }

  async updateMediaStatus(id: string, status: Media['status']): Promise<void> {
    await this.client.put(`${ApiEndpoints.CONTENT.MEDIA}/${id}/status`, { status });
  }

  async deleteMedia(id: string): Promise<{ success: boolean; affectedPlaylists?: string[] }> {
    return this.client.delete<{ success: boolean; affectedPlaylists?: string[] }>(
      `${ApiEndpoints.CONTENT.MEDIA}/${id}`
    );
  }

  async getCollections(): Promise<Collection[]> {
    return this.client.get<Collection[]>('/content/collections');
  }

  async getPlaylists(): Promise<Playlist[]> {
    return this.client.get<Playlist[]>(ApiEndpoints.CONTENT.PLAYLISTS);
  }

  async getPlaylistById(id: string): Promise<Playlist | undefined> {
    return this.client.get<Playlist>(ApiEndpoints.CONTENT.PLAYLIST_DETAIL(id));
  }

  async savePlaylist(playlist: Playlist): Promise<Playlist> {
    return this.client.put<Playlist>(ApiEndpoints.CONTENT.PLAYLIST_DETAIL(playlist.id), playlist);
  }
}
