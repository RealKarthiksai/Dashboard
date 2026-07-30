import { useState, useEffect, useCallback } from 'react';
import { playlistRepository } from '../repositories/MockPlaylistRepository';
import type { Playlist } from '../../data/types';

export function usePlaylists() {
  const [data, setData] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlaylists = useCallback(async () => {
    setLoading(true);
    try {
      const response = await playlistRepository.getPlaylists();
      setData(response);
    } catch (error) {
      console.error('Failed to fetch playlists:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const deletePlaylist = async (id: string) => {
    await playlistRepository.deletePlaylist(id);
    await fetchPlaylists();
  };

  return {
    data,
    loading,
    refresh: fetchPlaylists,
    deletePlaylist
  };
}
