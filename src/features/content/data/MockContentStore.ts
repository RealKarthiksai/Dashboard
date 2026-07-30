import type { Media, Collection, Playlist, ScheduleRule } from './types';

class MockContentStore {
  public assets: Media[] = [];
  public collections: Collection[] = [];
  public playlists: Playlist[] = [];
  public schedules: ScheduleRule[] = [];

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // 1. Generate Collections
    this.collections = [
      { id: 'col_1', name: 'Marketing', description: 'General marketing assets', assetCount: 0, createdAt: new Date().toISOString() },
      { id: 'col_2', name: 'Summer Campaign', description: '2026 Summer Promo', assetCount: 0, createdAt: new Date().toISOString() },
      { id: 'col_3', name: 'Restaurant Menu', description: 'Food and beverage', assetCount: 0, createdAt: new Date().toISOString() },
      { id: 'col_4', name: 'Holiday', description: 'Festive season content', assetCount: 0, createdAt: new Date().toISOString() },
      { id: 'col_5', name: 'Corporate', description: 'Internal communications', assetCount: 0, createdAt: new Date().toISOString() },
      { id: 'col_6', name: 'Emergency Messages', description: 'Urgent alerts', assetCount: 0, createdAt: new Date().toISOString() },
    ];

    // 2. Generate 200 Media Assets
    const types: Media['type'][] = ['image', 'video', 'html'];
    const tagsPool = ['sale', 'promo', 'food', 'drink', 'alert', 'info', 'branding', 'seasonal'];
    
    for (let i = 1; i <= 200; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const colId = this.collections[Math.floor(Math.random() * this.collections.length)].id;
      
      const numTags = Math.floor(Math.random() * 3) + 1;
      const assetTags = Array.from({ length: numTags }).map(() => tagsPool[Math.floor(Math.random() * tagsPool.length)]);
      
      this.assets.push({
        id: `ast_${i.toString().padStart(4, '0')}`,
        name: `${type.toUpperCase()} Media Asset ${i}`,
        type,
        mimeType: type === 'image' ? 'image/jpeg' : type === 'video' ? 'video/mp4' : 'text/html',
        resolution: type !== 'html' ? '1920x1080' : undefined,
        duration: type === 'video' ? Math.floor(Math.random() * 30) + 5 : (type === 'html' ? 10 : undefined),
        size: Math.floor(Math.random() * 50000000) + 100000,
        checksum: `chk_${Math.random().toString(36).substring(2, 10)}`,
        status: 'ready',
        tags: Array.from(new Set(assetTags)),
        collectionIds: [colId],
        createdBy: 'system',
        createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        updatedAt: new Date().toISOString(),
        url: `https://mock.cdn.invalid/asset_${i}`,
        thumbnailUrl: type === 'image' || type === 'video' ? `https://mock.cdn.invalid/thumb_${i}` : undefined,
        usageCount: 0,
        usedInPlaylists: [],
        favorite: Math.random() > 0.9,
        archived: Math.random() > 0.95
      });
      
      // Update collection asset count
      const col = this.collections.find(c => c.id === colId);
      if (col) col.assetCount++;
    }

    // 3. Generate Playlists & compute media usages
    const statuses: Playlist['status'][] = ['published', 'draft', 'archived'];
    for (let i = 1; i <= 50; i++) {
      const numItems = Math.floor(Math.random() * 10) + 3;
      const playlistName = `Playlist ${i}`;
      const items = Array.from({ length: numItems }).map((_, idx) => {
        const asset = this.assets[Math.floor(Math.random() * this.assets.length)];
        asset.usageCount++;
        if (!asset.usedInPlaylists.includes(playlistName)) {
          asset.usedInPlaylists.push(playlistName);
        }
        return {
          id: `pi_${Math.random().toString(36).substring(2, 9)}`,
          assetId: asset.id,
          duration: asset.duration || 10,
          transition: 'fade' as const,
          order: idx
        };
      });
      
      const totalDuration = items.reduce((sum, item) => sum + item.duration, 0);

      this.playlists.push({
        id: `pl_${i.toString().padStart(3, '0')}`,
        name: playlistName,
        description: `Generated playlist ${i}`,
        status: statuses[i % 3],
        version: Math.floor(Math.random() * 5) + 1,
        items,
        totalDuration,
        createdAt: new Date(Date.now() - Math.random() * 5000000000).toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: 'marketer1'
      });
    }

    // 4. Generate Schedules
    this.schedules = [
      {
        id: 'sch_1',
        playlistId: this.playlists[0].id,
        targetGroupId: 'grp_001',
        targetGroupName: 'North Wing Displays',
        timeWindow: {
          startTime: '08:00',
          endTime: '11:00',
          daysOfWeek: [1, 2, 3, 4, 5]
        },
        priority: 10,
        startDate: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 'sch_2',
        playlistId: this.playlists[1].id,
        targetGroupId: 'grp_002',
        targetGroupName: 'South Wing Kiosks',
        timeWindow: {
          startTime: '00:00',
          endTime: '23:59',
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
        },
        priority: 5,
        startDate: new Date().toISOString(),
        status: 'active'
      },
      {
        id: 'sch_3',
        playlistId: this.playlists[2].id,
        targetGroupId: 'grp_003',
        targetGroupName: 'Lobby Video Wall',
        timeWindow: {
          startTime: '12:00',
          endTime: '18:00',
          daysOfWeek: [1, 2, 3, 4, 5]
        },
        priority: 8,
        startDate: new Date().toISOString(),
        status: 'scheduled'
      }
    ];
  }
}

export const mockContentStore = new MockContentStore();
