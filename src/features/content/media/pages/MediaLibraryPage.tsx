import { useState, useRef } from 'react';
import { Upload, Search, Image as ImageIcon, Video, Code, MoreHorizontal, Layers } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/shared/icons/Icon';
import { FilterBar } from '@/shared/components/search/FilterBar';
import { Badge } from '@/shared/components/indicators/Badge';
import { LoadingSkeleton } from '@/shared/components/data-display/LoadingSkeleton';
import { EmptyState } from '@/shared/components/data-display/EmptyState';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { useMedia } from '../hooks/useMedia';
import type { Media } from '../../data/types';

function formatBytes(bytes: number) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function MediaLibraryPage() {
  const { data, collections, total, loading, filters, handleFilterChange, handlePageChange, uploadMedia } = useMedia({ page: 1, limit: 20 });
  const [searchTerm, setSearchTerm] = useState('');
  const [quickFilter, setQuickFilter] = useState<'all' | 'image' | 'video' | 'html' | 'recent'>('all');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFilterChange({ search: searchTerm });
    }
  };

  const handleQuickFilter = (type: 'all' | 'image' | 'video' | 'html' | 'recent') => {
    setQuickFilter(type);
    if (type === 'all') {
      handleFilterChange({ type: undefined, recentlyAdded: undefined });
    } else if (type === 'recent') {
      handleFilterChange({ type: undefined, recentlyAdded: true });
    } else {
      handleFilterChange({ type, recentlyAdded: undefined });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadMedia(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderIcon = (type: Media['type']) => {
    switch(type) {
      case 'image': return <Icon icon={ImageIcon} size="sm" />;
      case 'video': return <Icon icon={Video} size="sm" />;
      case 'html': return <Icon icon={Code} size="sm" />;
    }
  };

  const renderStatus = (status: Media['status']) => {
    switch(status) {
      case 'selected': return <Badge variant="default">Selected</Badge>;
      case 'uploading': return <Badge variant="warning">Uploading...</Badge>;
      case 'processing': return <Badge variant="info">Processing...</Badge>;
      case 'failed': return <Badge variant="danger">Failed</Badge>;
      default: return null;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Digital Asset Manager (DAM)</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Manage media assets, widgets, and collection metadata</p>
        </div>
        <div className="flex items-center gap-3">
          <PermissionGate required={Permission.CONTENT.CREATE}>
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileSelect}
              accept="image/*,video/*,text/html"
            />
            <Button onClick={() => fileInputRef.current?.click()}>
              <Icon icon={Upload} size="sm" className="mr-2" />
              Upload Media
            </Button>
          </PermissionGate>
        </div>
      </div>

      {/* Quick Filters Pill Bar */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2">
        <span className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mr-2">Quick Filters:</span>
        {(['all', 'image', 'video', 'html', 'recent'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => handleQuickFilter(tab)}
            className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
              quickFilter === tab 
                ? 'bg-[var(--color-primary)] text-white' 
                : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)]'
            }`}
          >
            {tab === 'recent' ? 'Recently Added' : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <FilterBar 
        search={
          <div className="relative w-full">
            <Icon icon={Search} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" size="sm" />
            <input
              type="text"
              placeholder="Search by name, tags, or creator..."
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        }
        filters={
          <select 
            className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            value={filters.collectionId || ''}
            onChange={(e) => handleFilterChange({ collectionId: e.target.value || undefined })}
          >
            <option value="">All Collections</option>
            {collections.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.assetCount})</option>
            ))}
          </select>
        }
      />

      <div className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-48 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] p-2">
                <LoadingSkeleton className="h-28 w-full rounded-[var(--radius-md)] mb-3" />
                <LoadingSkeleton className="h-4 w-3/4 mb-2" />
                <LoadingSkeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <EmptyState
            icon={ImageIcon as any}
            title="No media assets found"
            description="Try adjusting your search or filter criteria."
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.map(media => (
              <div key={media.id} className="group relative flex flex-col bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-sm hover:shadow-[var(--shadow-level-2)] transition-shadow overflow-hidden cursor-pointer">
                {/* Thumbnail Area */}
                <div className="relative h-32 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {media.thumbnailUrl ? (
                    <img src={media.thumbnailUrl} alt={media.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-[var(--color-text-muted)] opacity-50">
                      <Icon icon={media.type === 'image' ? ImageIcon : media.type === 'video' ? Video : Code} size="lg" />
                    </div>
                  )}
                  {/* Status Overlay */}
                  {media.status !== 'ready' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
                      {renderStatus(media.status)}
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/60 rounded px-1.5 py-0.5 text-white text-xs flex items-center gap-1 backdrop-blur-md">
                    {renderIcon(media.type)}
                    {media.duration && <span>{media.duration}s</span>}
                  </div>
                </div>

                {/* Info Area */}
                <div className="p-3 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-medium text-[var(--color-text-primary)] truncate" title={media.name}>
                      {media.name}
                    </h3>
                    <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon icon={MoreHorizontal} size="sm" />
                    </button>
                  </div>
                  <div className="flex items-center text-xs text-[var(--color-text-muted)] gap-2 mb-2">
                    <span>{formatBytes(media.size)}</span>
                    {media.resolution && (
                      <>
                        <span>&bull;</span>
                        <span>{media.resolution}</span>
                      </>
                    )}
                  </div>

                  {/* Usage Relationships */}
                  {media.usedInPlaylists.length > 0 && (
                    <div className="flex items-center gap-1 text-[11px] text-[var(--color-primary)] font-medium mb-2">
                      <Icon icon={Layers} size="sm" />
                      <span>Used in {media.usedInPlaylists.length} playlist{media.usedInPlaylists.length > 1 ? 's' : ''}</span>
                    </div>
                  )}

                  <div className="mt-auto flex flex-wrap gap-1">
                    {media.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] bg-[var(--color-surface-hover)] text-[var(--color-text-secondary)] px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {total > filters.limit && (
          <div className="flex justify-center mt-6 mb-4">
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" disabled={filters.page === 1} onClick={() => handlePageChange(filters.page - 1)}>Prev</Button>
              <div className="flex items-center px-4 text-sm text-[var(--color-text-secondary)]">Page {filters.page} of {Math.ceil(total / filters.limit)}</div>
              <Button variant="secondary" size="sm" disabled={filters.page >= Math.ceil(total / filters.limit)} onClick={() => handlePageChange(filters.page + 1)}>Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
