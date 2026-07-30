import { useState } from 'react';
import { Plus, RefreshCw, Trash, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/shared/icons/Icon';
import { SearchInput } from '@/shared/components/search/SearchInput';
import { FilterBar } from '@/shared/components/search/FilterBar';
import { FilterChip } from '@/shared/components/search/FilterChip';
import { MultiSelect } from '@/shared/components/forms/MultiSelect';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { useNavigate } from 'react-router-dom';
import { useDevices } from '../hooks/useDevices';
import { DeviceTable } from '../components/DeviceTable';
import { DeviceFormDrawer } from '../components/DeviceFormDrawer';
import type { DeviceStatus, Device, DeviceCreateDTO } from '../types';
import { deviceRepository } from '../repositories/MockDeviceRepository';

export function DeviceListPage() {
  const navigate = useNavigate();
  const { data, loading, handlePageChange, handleFilterChange, refresh } = useDevices({ page: 1, limit: 15 });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Search state
  const [search, setSearch] = useState('');

  // Status Filter state
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  
  // Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | undefined>(undefined);

  const statusOptions = [
    { label: 'Online', value: 'online' },
    { label: 'Offline', value: 'offline' },
    { label: 'Warning', value: 'warning' },
    { label: 'Unknown', value: 'unknown' },
  ];

  const handleSearch = (value: string) => {
    setSearch(value);
    handleFilterChange({ search: value || undefined });
  };

  const applyStatusFilter = (values: string[]) => {
    setStatusFilter(values);
    handleFilterChange({ status: values.length > 0 ? (values as DeviceStatus[]) : undefined });
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Devices</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Manage and monitor your physical fleet</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={refresh}>
            <Icon icon={RefreshCw} size="sm" className="mr-2" />
            Refresh
          </Button>
          <PermissionGate required={Permission.DEVICES.CREATE}>
            <Button onClick={() => { setEditingDevice(undefined); setIsDrawerOpen(true); }}>
              <Icon icon={Plus} size="sm" className="mr-2" />
              Add Device
            </Button>
          </PermissionGate>
        </div>
      </div>

      {/* Filters & Bulk Actions */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-4 shadow-[var(--shadow-level-1)]">
        {selectedIds.size > 0 ? (
          <div className="flex items-center justify-between h-10 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                {selectedIds.size} {selectedIds.size === 1 ? 'device' : 'devices'} selected
              </span>
              <button onClick={() => setSelectedIds(new Set())} className="text-xs text-[var(--color-text-muted)] hover:underline focus-ring rounded-sm">
                Clear selection
              </button>
            </div>
            <div className="flex items-center gap-2">
              <PermissionGate required={Permission.DEVICES.COMMAND}>
                <Button variant="secondary" size="sm">
                  <Icon icon={RefreshCw} size="sm" className="mr-2" />
                  Restart
                </Button>
              </PermissionGate>
              <PermissionGate required={Permission.DEVICES.DELETE}>
                <Button variant="destructive" size="sm">
                  <Icon icon={Trash} size="sm" className="mr-2" />
                  Delete
                </Button>
              </PermissionGate>
            </div>
          </div>
        ) : (
          <FilterBar
            search={
              <SearchInput 
                placeholder="Search by name, ID, or organization..." 
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                onClear={() => handleSearch('')}
              />
            }
            filters={
              <div className="w-48">
                <MultiSelect
                  options={statusOptions}
                  selected={statusFilter}
                  onChange={applyStatusFilter}
                  placeholder="Filter Status"
                />
              </div>
            }
            actions={
              <Button variant="secondary">
                <Icon icon={Download} size="sm" className="mr-2" />
                Export
              </Button>
            }
            activeFilters={[
              ...statusFilter.map(s => (
                <FilterChip 
                  key={`status-${s}`} 
                  label="Status" 
                  value={statusOptions.find(opt => opt.value === s)?.label || s} 
                  onRemove={() => applyStatusFilter(statusFilter.filter(v => v !== s))} 
                />
              ))
            ]}
            onClearFilters={statusFilter.length > 0 ? () => applyStatusFilter([]) : undefined}
          />
        )}
      </div>

      {/* Table */}
      <div className="flex-1 min-h-0">
        <DeviceTable 
          data={data?.data || []} 
          loading={loading}
          currentPage={data?.page || 1}
          totalPages={data?.totalPages || 1}
          onPageChange={handlePageChange}
          selectedIds={selectedIds}
          onSelectionChange={setSelectedIds}
          onRowClick={(device) => {
            navigate(`/dashboard/operations/devices/${device.id}`);
          }}
        />
      </div>

      {/* Drawer */}
      <DeviceFormDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        device={editingDevice} 
        onSubmit={async (formData) => {
          if (editingDevice) {
            await deviceRepository.update(editingDevice.id, formData as any);
          } else {
            await deviceRepository.create(formData as DeviceCreateDTO);
          }
          refresh();
        }}
      />
    </div>
  );
}
