import { mockContentStore } from '../../data/MockContentStore';
import type { Playlist } from '../../data/types';

export interface IPlaylistRepository {
  getPlaylists(): Promise<Playlist[]>;
  getPlaylist(id: string): Promise<Playlist | null>;
  savePlaylist(playlist: Playlist): Promise<Playlist>;
  deletePlaylist(id: string): Promise<void>;
}

export class MockPlaylistRepository implements IPlaylistRepository {
  private simulateLatency(ms: number = 200) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getPlaylists(): Promise<Playlist[]> {
    await this.simulateLatency();
    return [...mockContentStore.playlists];
  }

  async getPlaylist(id: string): Promise<Playlist | null> {
    await this.simulateLatency(100);
    const pl = mockContentStore.playlists.find(p => p.id === id);
    if (!pl) return null;
    return JSON.parse(JSON.stringify(pl)); // deep copy
  }

  async savePlaylist(playlist: Playlist): Promise<Playlist> {
    await this.simulateLatency(300);
    
    // Recompute total duration
    playlist.totalDuration = playlist.items.reduce((sum, item) => sum + (item.duration || 0), 0);
    playlist.updatedAt = new Date().toISOString();

    const idx = mockContentStore.playlists.findIndex(p => p.id === playlist.id);
    if (idx >= 0) {
      mockContentStore.playlists[idx] = JSON.parse(JSON.stringify(playlist));
    } else {
      mockContentStore.playlists.unshift(JSON.parse(JSON.stringify(playlist)));
    }
    
    return playlist;
  }

  async deletePlaylist(id: string): Promise<void> {
    await this.simulateLatency();
    mockContentStore.playlists = mockContentStore.playlists.filter(p => p.id !== id);
  }
}

export const playlistRepository = new MockPlaylistRepository();
