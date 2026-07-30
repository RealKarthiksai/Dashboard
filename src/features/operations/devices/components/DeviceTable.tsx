import { useMemo } from 'react';
import { MoreHorizontal, RefreshCw, Trash } from 'lucide-react';
import { DataTable, type Column } from '@/shared/components/data-display/DataTable';
import { StatusIndicator } from '@/shared/components/data-display/StatusIndicator';
import { Badge } from '@/shared/components/indicators/Badge';
import { ContextMenu } from '@/shared/components/overlays/ContextMenu';
import { Icon } from '@/shared/icons/Icon';
import type { Device } from '../types';

export interface DeviceTableProps {
  data: Device[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRowClick?: (device: Device) => void;
  selectedIds: Set<string>;
  onSelectionChange: (ids: Set<string>) => void;
}

export function DeviceTable({ 
  data, 
  loading, 
  currentPage, 
  totalPages, 
  onPageChange,
  onRowClick,
  selectedIds,
  onSelectionChange 
}: DeviceTableProps) {
  
  const handleSelectRow = (id: string, selected: boolean) => {
    const next = new Set(selectedIds);
    if (selected) next.add(id);
    else next.delete(id);
    onSelectionChange(next);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      onSelectionChange(new Set(data.map(d => d.id)));
    } else {
      onSelectionChange(new Set());
    }
  };

  const columns = useMemo<Column<Device>[]>(() => [
    {
      header: 'Name',
      accessorKey: 'name',
      sortable: true,
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-[var(--color-text-primary)]">{row.name}</span>
          <span className="text-xs text-[var(--color-text-muted)]">{row.id}</span>
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => <StatusIndicator status={row.status as any} label={row.status} />
    },
    {
      header: 'Organization',
      accessorKey: 'organizationName',
      cell: (row) => row.organizationName
    },
    {
      header: 'Location',
      cell: (row) => (
        <div className="flex flex-col">
          <span>{row.location.city}</span>
          <span className="text-xs text-[var(--color-text-muted)]">{row.location.country}</span>
        </div>
      )
    },
    {
      header: 'Firmware',
      accessorKey: 'firmwareVersion',
      cell: (row) => <Badge variant="default" size="sm">{row.firmwareVersion}</Badge>
    },
    {
      header: 'Last Seen',
      accessorKey: 'lastSeen',
      cell: (row) => {
        const date = new Date(row.lastSeen);
        return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      }
    },
    {
      header: '',
      cell: (row) => (
        <div className="flex justify-end pr-2">
          <ContextMenu
            items={[
              { label: 'View Details', onClick: () => onRowClick?.(row) },
              { 
                label: 'Restart', 
                icon: <Icon icon={RefreshCw} size="sm" />, 
                onClick: () => {} 
              },
              { 
                label: 'Delete', 
                icon: <Icon icon={Trash} size="sm" />, 
                danger: true, 
                onClick: () => {} 
              },
            ]}
          >
            <button className="p-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background)] focus-ring outline-none" onClick={(e) => e.stopPropagation()}>
              <Icon icon={MoreHorizontal} size="sm" />
            </button>
          </ContextMenu>
        </div>
      )
    }
  ], [onRowClick]);

  return (
    <DataTable
      data={data}
      columns={columns}
      keyExtractor={(row) => row.id}
      isLoading={loading}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      onRowClick={onRowClick}
      selectedRowKeys={selectedIds}
      onSelectRow={handleSelectRow}
      onSelectAll={handleSelectAll}
    />
  );
}
