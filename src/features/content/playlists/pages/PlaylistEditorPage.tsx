import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, AlertCircle, GripVertical, Image as ImageIcon, Video, Code, Trash, CheckCircle2 } from 'lucide-react';
import { 
  DndContext, 
  closestCenter, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy, 
  useSortable 
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Button } from '@/components/ui/Button';
import { Icon } from '@/shared/icons/Icon';
import { Badge } from '@/shared/components/indicators/Badge';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';

import { playlistRepository } from '../repositories/MockPlaylistRepository';
import { mediaRepository } from '../../media/repositories/MockMediaRepository';
import type { Playlist, PlaylistItem, Media } from '../../data/types';

// Sortable Item Component
function SortablePlaylistItem({ item, asset, isSelected, onClick }: { item: PlaylistItem, asset?: Media, isSelected: boolean, onClick: () => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getIcon = (type?: string) => {
    switch(type) {
      case 'image': return ImageIcon;
      case 'video': return Video;
      case 'html': return Code;
      default: return ImageIcon;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`flex items-center gap-3 p-3 bg-[var(--color-surface)] border ${isSelected ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' : 'border-[var(--color-border)]'} rounded-md shadow-sm mb-2 cursor-pointer transition-colors hover:border-[var(--color-primary-muted)]`}
    >
      <div {...attributes} {...listeners} className="cursor-grab text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] px-1">
        <Icon icon={GripVertical} size="sm" />
      </div>
      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex items-center justify-center flex-shrink-0">
        {asset?.thumbnailUrl ? (
          <img src={asset.thumbnailUrl} alt={asset.name} className="w-full h-full object-cover" />
        ) : (
          <Icon icon={getIcon(asset?.type)} className="text-[var(--color-text-muted)] opacity-50" />
        )}
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <span className="font-medium text-sm truncate">{asset?.name || 'Unknown Asset'}</span>
        <span className="text-xs text-[var(--color-text-muted)]">{item.duration}s • {item.transition}</span>
      </div>
    </div>
  );
}

export function PlaylistEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [propertyTab, setPropertyTab] = useState<'general' | 'playback' | 'audio' | 'conditions' | 'advanced'>('general');
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [pl, media] = await Promise.all([
        id === 'new' ? Promise.resolve({
          id: `pl_new_${Date.now()}`, name: 'New Playlist', description: '', status: 'draft' as const, version: 1, items: [], totalDuration: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), createdBy: 'currentUser'
        }) : playlistRepository.getPlaylist(id!),
        mediaRepository.getMedia({ page: 1, limit: 100 })
      ]);
      setPlaylist(pl as Playlist);
      setMediaItems(media.data);
      setLoading(false);
    }
    load();
  }, [id]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPlaylist((prev) => {
        if (!prev) return prev;
        const oldIndex = prev.items.findIndex(i => i.id === active.id);
        const newIndex = prev.items.findIndex(i => i.id === over.id);
        const newItems = arrayMove(prev.items, oldIndex, newIndex);
        return { ...prev, items: newItems.map((it, idx) => ({ ...it, order: idx })) };
      });
    }
  };

  const handleAddAsset = (asset: Media) => {
    const newItem: PlaylistItem = {
      id: `pi_${Math.random().toString(36).substring(2, 9)}`,
      assetId: asset.id,
      duration: asset.duration || 10,
      transition: 'none',
      order: playlist?.items.length || 0,
    };
    setPlaylist(prev => prev ? { ...prev, items: [...prev.items, newItem] } : prev);
  };

  const handleSave = async (publish: boolean = false) => {
    if (!playlist) return;
    setSaving(true);
    const updated: Playlist = {
      ...playlist,
      status: publish ? 'published' : playlist.status,
      version: publish ? playlist.version + 1 : playlist.version
    };
    await playlistRepository.savePlaylist(updated);
    setSaving(false);
    navigate('/dashboard/content/playlists');
  };

  if (loading) return <div className="h-full flex items-center justify-center">Loading editor...</div>;
  if (!playlist) return <div className="h-full flex items-center justify-center text-[var(--color-danger)]">Playlist not found</div>;

  const selectedItem = playlist.items.find(i => i.id === selectedItemId);
  const selectedMedia = selectedItem ? mediaItems.find(a => a.id === selectedItem.assetId) : null;

  return (
    <div className="h-full flex flex-col bg-[var(--color-background)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center gap-4">
          <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]" onClick={() => navigate('/dashboard/content/playlists')}>
            <Icon icon={ArrowLeft} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <input 
                type="text" 
                className="text-xl font-bold bg-transparent focus:outline-none focus:border-b border-[var(--color-primary)] text-[var(--color-text-primary)]" 
                value={playlist.name} 
                onChange={e => setPlaylist({...playlist, name: e.target.value})}
              />
              <Badge variant={playlist.status === 'published' ? 'success' : 'warning'}>
                {playlist.status.toUpperCase()} v{playlist.version}.0
              </Badge>
            </div>
            <div className="text-sm text-[var(--color-text-secondary)] mt-0.5">
              {playlist.items.length} items • Total Duration: {playlist.items.reduce((s, i) => s + i.duration, 0)}s
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/dashboard/content/playlists')}>Cancel</Button>
          <PermissionGate required={Permission.CONTENT.UPDATE}>
            <Button variant="secondary" onClick={() => handleSave(false)} disabled={saving}>
              <Icon icon={Save} size="sm" className="mr-2" />
              Save Draft
            </Button>
            <Button onClick={() => handleSave(true)} disabled={saving}>
              <Icon icon={CheckCircle2} size="sm" className="mr-2" />
              Publish v{playlist.version + (playlist.status === 'published' ? 1 : 0)}.0
            </Button>
          </PermissionGate>
        </div>
      </div>

      {/* 3-Pane Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Pane 1: Media Library */}
        <div className="w-80 border-r border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col">
          <div className="p-4 border-b border-[var(--color-border)] font-semibold text-sm">Media Library</div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {mediaItems.map(media => (
              <div key={media.id} className="flex items-center gap-3 p-2 hover:bg-[var(--color-surface-hover)] rounded-md border border-transparent hover:border-[var(--color-border)] group">
                <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  {media.thumbnailUrl ? <img src={media.thumbnailUrl} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center"><Icon icon={ImageIcon} size="sm" className="text-gray-400"/></div>}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <span className="text-sm truncate">{media.name}</span>
                  <span className="text-xs text-[var(--color-text-muted)]">{media.type}</span>
                </div>
                <button 
                  className="opacity-0 group-hover:opacity-100 text-[var(--color-primary)] hover:bg-[var(--color-primary-muted)] p-1 rounded transition-all"
                  onClick={() => handleAddAsset(media)}
                >
                  <Icon icon={ArrowLeft} size="sm" className="rotate-180" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Pane 2: Timeline */}
        <div className="flex-1 bg-[var(--color-background)] flex flex-col relative overflow-hidden">
          <div className="p-4 border-b border-[var(--color-border)] bg-[var(--color-surface)] font-semibold text-sm flex justify-between">
            <span>Playlist Timeline</span>
            {playlist.items.length === 0 && <span className="text-[var(--color-warning)] flex items-center gap-1 text-xs"><Icon icon={AlertCircle} size="sm"/> Empty Playlist</span>}
          </div>
          <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
            <div className="max-w-2xl mx-auto">
              <DndContext 
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext 
                  items={playlist.items.map(i => i.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {playlist.items.map((item) => (
                    <SortablePlaylistItem 
                      key={item.id} 
                      item={item} 
                      asset={mediaItems.find(a => a.id === item.assetId)}
                      isSelected={selectedItemId === item.id}
                      onClick={() => setSelectedItemId(item.id)}
                    />
                  ))}
                </SortableContext>
              </DndContext>
              {playlist.items.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed border-[var(--color-border)] rounded-lg text-[var(--color-text-muted)]">
                  Add assets from the library to build your sequence.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Pane 3: Properties Panel */}
        <div className="w-80 border-l border-[var(--color-border)] bg-[var(--color-surface)] flex flex-col">
          <div className="p-4 border-b border-[var(--color-border)] font-semibold text-sm">Item Properties</div>
          
          {selectedItem && (
            <div className="flex border-b border-[var(--color-border)] bg-gray-50 text-xs">
              {(['general', 'playback', 'audio', 'conditions', 'advanced'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setPropertyTab(tab)}
                  className={`flex-1 py-2 text-center capitalize border-b-2 ${propertyTab === tab ? 'border-[var(--color-primary)] font-bold text-[var(--color-primary)] bg-white' : 'border-transparent text-[var(--color-text-muted)]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {!selectedItem ? (
              <div className="text-sm text-[var(--color-text-muted)] text-center mt-10">Select an item in the timeline to edit properties.</div>
            ) : (
              <div className="space-y-6">
                {propertyTab === 'general' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Asset Info</h4>
                      <div className="p-3 bg-gray-50 rounded text-xs text-[var(--color-text-secondary)] space-y-1">
                        <div><strong>Name:</strong> {selectedMedia?.name}</div>
                        <div><strong>Type:</strong> {selectedMedia?.type}</div>
                        <div><strong>Resolution:</strong> {selectedMedia?.resolution || 'N/A'}</div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Notes</label>
                      <textarea
                        className="w-full border border-[var(--color-border)] rounded px-3 py-2 text-sm"
                        rows={3}
                        placeholder="Add operator notes..."
                        value={selectedItem.notes || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPlaylist(prev => !prev ? prev : {
                            ...prev, items: prev.items.map(i => i.id === selectedItem.id ? { ...i, notes: val } : i)
                          });
                        }}
                      />
                    </div>
                  </div>
                )}

                {propertyTab === 'playback' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Duration (seconds)</label>
                      <input 
                        type="number" 
                        className="w-full border border-[var(--color-border)] rounded px-3 py-2 text-sm"
                        value={selectedItem.duration}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || 0;
                          setPlaylist(prev => !prev ? prev : {
                            ...prev, items: prev.items.map(i => i.id === selectedItem.id ? { ...i, duration: val } : i)
                          });
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Transition</label>
                      <select 
                        className="w-full border border-[var(--color-border)] rounded px-3 py-2 text-sm"
                        value={selectedItem.transition}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setPlaylist(prev => !prev ? prev : {
                            ...prev, items: prev.items.map(i => i.id === selectedItem.id ? { ...i, transition: val } : i)
                          });
                        }}
                      >
                        <option value="none">None</option>
                        <option value="fade">Fade</option>
                        <option value="slide">Slide</option>
                        <option value="zoom">Zoom</option>
                      </select>
                    </div>
                  </div>
                )}

                {propertyTab === 'audio' && (
                  <div className="space-y-4">
                    {selectedMedia?.type === 'video' ? (
                      <div>
                        <label className="block text-sm font-medium mb-1">Volume ({selectedItem.volume || 100}%)</label>
                        <input 
                          type="range" 
                          min="0" max="100" 
                          className="w-full"
                          value={selectedItem.volume || 100}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            setPlaylist(prev => !prev ? prev : {
                              ...prev, items: prev.items.map(i => i.id === selectedItem.id ? { ...i, volume: val } : i)
                            });
                          }}
                        />
                      </div>
                    ) : (
                      <div className="text-xs text-[var(--color-text-muted)]">Audio controls are only available for video assets.</div>
                    )}
                  </div>
                )}

                {(propertyTab === 'conditions' || propertyTab === 'advanced') && (
                  <div className="text-xs text-[var(--color-text-muted)] p-4 bg-gray-50 rounded border border-dashed text-center">
                    {propertyTab === 'conditions' ? 'Rule-based playback conditions reserved for future sprint.' : 'Advanced hardware acceleration rules reserved.'}
                  </div>
                )}

                <div className="pt-4 border-t border-[var(--color-border)]">
                  <Button 
                    variant="destructive" 
                    className="w-full justify-center"
                    onClick={() => {
                      setPlaylist(prev => !prev ? prev : {
                        ...prev, items: prev.items.filter(i => i.id !== selectedItem.id)
                      });
                      setSelectedItemId(null);
                    }}
                  >
                    <Icon icon={Trash} size="sm" className="mr-2" />
                    Remove from Playlist
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
