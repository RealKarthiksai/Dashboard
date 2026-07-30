export interface Media {
  id: string;
  name: string;
  type: 'image' | 'video' | 'html';
  mimeType: string;
  resolution?: string;
  duration?: number; // seconds
  size: number; // bytes
  checksum: string;
  status: 'selected' | 'uploading' | 'processing' | 'ready' | 'failed';
  tags: string[];
  collectionIds: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
  url: string;
  usageCount: number;
  usedInPlaylists: string[]; // List of playlist names using this media
  lastUsed?: string;
  favorite: boolean;
  archived: boolean;
}

// Alias for backward compatibility if needed
export type Asset = Media;

export interface Collection {
  id: string;
  name: string;
  description: string;
  assetCount: number;
  createdAt: string;
}

export interface PlaylistItem {
  id: string; // Unique ID for this entry in the playlist
  assetId: string;
  duration: number; // Override duration in seconds
  transition: 'none' | 'fade' | 'slide' | 'zoom';
  volume?: number; // 0-100, if applicable
  order: number;
  notes?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  status: 'draft' | 'published' | 'archived';
  version: number;
  items: PlaylistItem[];
  totalDuration: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface ScheduleRule {
  id: string;
  playlistId: string;
  targetGroupId: string; // References Operations Device Group
  targetGroupName: string;
  timeWindow: {
    startTime: string; // HH:mm
    endTime: string; // HH:mm
    daysOfWeek: number[]; // 0=Sunday, 6=Saturday
  };
  priority: number; // Higher is more important
  startDate: string; // ISO
  endDate?: string; // ISO
  status: 'draft' | 'scheduled' | 'active' | 'expired';
}
