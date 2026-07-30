import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Clock, FileVideo, Trash, Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/shared/icons/Icon';
import { DataTable } from '@/shared/components/data-display/DataTable';
import { Badge } from '@/shared/components/indicators/Badge';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { usePlaylists } from '../hooks/usePlaylists';

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}

export function PlaylistsPage() {
  const navigate = useNavigate();
  const { data, deletePlaylist } = usePlaylists();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleCreateNew = () => {
    navigate(`/dashboard/content/playlists/new`);
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Playlists</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Sequence and version media assets for fleet deployment</p>
        </div>
        <div className="flex items-center gap-3">
          <PermissionGate required={Permission.CONTENT.UPDATE}>
            <Button onClick={handleCreateNew}>
              <Icon icon={Plus} size="sm" className="mr-2" />
              Create Playlist
            </Button>
          </PermissionGate>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-level-1)] p-4">
        <div className="mb-4 max-w-md">
          <input
            type="text"
            placeholder="Search playlists..."
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex-1 overflow-auto">
          <DataTable
            data={filteredData}
            keyExtractor={p => p.id}
            columns={[
              { 
                header: 'Playlist Name', 
                accessorKey: 'name',
                cell: (p) => (
                  <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate(`/dashboard/content/playlists/${p.id}`)}>
                    <div className="bg-[var(--color-surface-hover)] p-2 rounded-lg text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors">
                      <Icon icon={FileVideo} />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium group-hover:text-[var(--color-primary)] transition-colors">{p.name}</span>
                        <span className="text-xs font-mono text-[var(--color-text-muted)]">v{p.version}.0</span>
                      </div>
                      <span className="text-xs text-[var(--color-text-muted)]">{p.description}</span>
                    </div>
                  </div>
                )
              },
              { 
                header: 'Status', 
                cell: (p) => (
                  <Badge variant={p.status === 'published' ? 'success' : p.status === 'draft' ? 'warning' : 'default'}>
                    {p.status.toUpperCase()}
                  </Badge>
                )
              },
              { 
                header: 'Items', 
                cell: (p) => <span className="font-medium">{p.items.length} assets</span>
              },
              { 
                header: 'Total Duration', 
                cell: (p) => (
                  <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                    <Icon icon={Clock} size="sm" />
                    <span>{formatDuration(p.totalDuration)}</span>
                  </div>
                )
              },
              { 
                header: 'Last Modified', 
                cell: (p) => <span className="text-[var(--color-text-secondary)]">{new Date(p.updatedAt).toLocaleDateString()}</span>
              },
              { 
                header: '', 
                cell: (p) => (
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PermissionGate required={Permission.CONTENT.UPDATE}>
                      <button 
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] rounded"
                        onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/content/playlists/${p.id}`); }}
                      >
                        <Icon icon={Edit} size="sm" />
                      </button>
                    </PermissionGate>
                    <PermissionGate required={Permission.CONTENT.DELETE}>
                      <button 
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-surface-hover)] rounded"
                        onClick={(e) => { e.stopPropagation(); deletePlaylist(p.id); }}
                      >
                        <Icon icon={Trash} size="sm" />
                      </button>
                    </PermissionGate>
                  </div>
                )
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
