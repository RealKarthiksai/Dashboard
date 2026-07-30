import { useState } from 'react';
import { Plus, Calendar, Clock, MonitorSmartphone, Play, Pause, Trash, Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/shared/icons/Icon';
import { DataTable } from '@/shared/components/data-display/DataTable';
import { Badge } from '@/shared/components/indicators/Badge';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { useSchedules } from '../hooks/useSchedules';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function SchedulingPage() {
  const { data, toggleStatus, deleteSchedule } = useSchedules();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(s => 
    s.targetGroupName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.playlistId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDays = (daysOfWeek: number[]) => {
    if (daysOfWeek.length === 7) return 'Everyday';
    if (daysOfWeek.length === 5 && !daysOfWeek.includes(0) && !daysOfWeek.includes(6)) return 'Weekdays';
    if (daysOfWeek.length === 2 && daysOfWeek.includes(0) && daysOfWeek.includes(6)) return 'Weekends';
    return daysOfWeek.map(d => DAYS[d]).join(', ');
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'scheduled': return 'info';
      case 'draft': return 'warning';
      case 'expired': return 'danger';
      default: return 'default';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Scheduling</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Manage rule-based playlist deployments across fleet target groups</p>
        </div>
        <div className="flex items-center gap-3">
          <PermissionGate required={Permission.CONTENT.UPDATE}>
            <Button>
              <Icon icon={Plus} size="sm" className="mr-2" />
              Create Rule
            </Button>
          </PermissionGate>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-level-1)] p-4">
        <div className="mb-4 max-w-md">
          <input
            type="text"
            placeholder="Search rules by group or playlist..."
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex-1 overflow-auto">
          <DataTable
            data={filteredData}
            keyExtractor={s => s.id}
            columns={[
              { 
                header: 'Playlist', 
                accessorKey: 'playlistId',
                cell: (s) => <span className="font-medium text-[var(--color-primary)]">{s.playlistId}</span>
              },
              { 
                header: 'Target Group', 
                cell: (s) => (
                  <div className="flex items-center gap-1.5 text-[var(--color-text-primary)]">
                    <Icon icon={MonitorSmartphone} size="sm" className="text-[var(--color-text-muted)]" />
                    <span>{s.targetGroupName}</span>
                  </div>
                )
              },
              { 
                header: 'Schedule Rule', 
                cell: (s) => (
                  <div className="flex flex-col text-sm">
                    <div className="flex items-center gap-1.5">
                      <Icon icon={Calendar} size="sm" className="text-[var(--color-text-muted)]" />
                      <span>{formatDays(s.timeWindow.daysOfWeek)}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[var(--color-text-secondary)]">
                      <Icon icon={Clock} size="sm" className="text-[var(--color-text-muted)]" />
                      <span>{s.timeWindow.startTime} - {s.timeWindow.endTime}</span>
                    </div>
                  </div>
                )
              },
              { 
                header: 'Priority', 
                accessorKey: 'priority',
                cell: (s) => <Badge variant="default" className="bg-gray-100 font-mono">P{s.priority}</Badge>
              },
              { 
                header: 'Status', 
                accessorKey: 'status',
                cell: (s) => (
                  <Badge variant={getStatusBadgeVariant(s.status)}>
                    {s.status.toUpperCase()}
                  </Badge>
                )
              },
              { 
                header: '', 
                cell: (s) => (
                  <div className="flex items-center justify-end gap-2">
                    <PermissionGate required={Permission.CONTENT.UPDATE}>
                      <button 
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] rounded"
                        onClick={() => toggleStatus(s)}
                        title={s.status === 'active' ? 'Pause Rule' : 'Activate Rule'}
                      >
                        <Icon icon={s.status === 'active' ? Pause : Play} size="sm" />
                      </button>
                    </PermissionGate>
                    <PermissionGate required={Permission.CONTENT.UPDATE}>
                      <button className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] rounded">
                        <Icon icon={Edit} size="sm" />
                      </button>
                    </PermissionGate>
                    <PermissionGate required={Permission.CONTENT.DELETE}>
                      <button 
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-surface-hover)] rounded"
                        onClick={() => deleteSchedule(s.id)}
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
