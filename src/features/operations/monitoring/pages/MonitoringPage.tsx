import { Activity, AlertTriangle, MonitorX, DownloadCloud } from 'lucide-react';
import { KPICard } from '@/shared/components/data-display/KPICard';
import { Icon } from '@/shared/icons/Icon';
import { DataTable } from '@/shared/components/data-display/DataTable';
import { StatusIndicator } from '@/shared/components/data-display/StatusIndicator';

import { mockStore } from '../../data/MockDataStore';

export function MonitoringPage() {
  const allDevices = mockStore.devices;
  
  const offlineDevices = allDevices.filter(d => d.status === 'offline');
  const unhealthyDevices = allDevices.filter(d => d.status === 'warning');
  
  // Group by region to find regions with issues
  const regionsWithIssues = new Set(
    [...offlineDevices, ...unhealthyDevices].map(d => d.location.country)
  );

  const outdatedDevices = allDevices.filter(d => 
    d.firmwareVersion !== 'v2.4.2' && d.firmwareVersion !== 'v2.5.0-beta'
  );

  // Map to the format needed by the DataTable
  const actionRequiredList = [...offlineDevices, ...unhealthyDevices].map(d => ({
    id: d.id,
    name: d.name,
    status: d.status,
    issue: d.status === 'offline' ? 'Network Timeout' : 'High CPU/Memory',
    lastPing: new Date(d.lastSeen).toLocaleString(),
    location: `${d.location.city}, ${d.location.country}`
  }));

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Monitoring Overview</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">Real-time health and operational metrics</p>
      </div>

      {/* KPI Cards (Answering specific questions) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard 
          title="Offline Devices" 
          value={offlineDevices.length.toString()} 
          subtitle={`Out of ${allDevices.length} total`}
          icon={<Icon icon={MonitorX} />}
          trend={{ direction: 'up', value: '3 since yesterday' }} 
        />
        <KPICard 
          title="Unhealthy Devices" 
          value={unhealthyDevices.length.toString()} 
          subtitle="Warnings and high loads"
          icon={<Icon icon={AlertTriangle} className="text-[var(--color-warning)]" />}
          trend={{ direction: 'neutral', value: 'Stable' }} 
        />
        <KPICard 
          title="Regions with Issues" 
          value={regionsWithIssues.size.toString()} 
          subtitle={Array.from(regionsWithIssues).slice(0,3).join(', ') + (regionsWithIssues.size > 3 ? '...' : '')}
          icon={<Icon icon={Activity} />}
        />
        <KPICard 
          title="Outdated Firmware" 
          value={outdatedDevices.length.toString()} 
          subtitle="Devices running older than v2.4.2"
          icon={<Icon icon={DownloadCloud} />}
          trend={{ direction: 'down', value: '15 updated today' }} 
        />
      </div>

      {/* Unhealthy Devices List */}
      <div className="flex-1 flex flex-col gap-4 mt-4">
        <h2 className="text-lg font-bold text-[var(--color-text-primary)]">Action Required</h2>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-level-1)] p-4 flex-1">
          <DataTable
            data={actionRequiredList}
            keyExtractor={r => r.id}
            columns={[
              { header: 'Device', accessorKey: 'name', cell: (r) => <div className="font-medium">{r.name}</div> },
              { header: 'Status', cell: (r) => <StatusIndicator status={r.status as any} label={r.status} /> },
              { header: 'Current Issue', accessorKey: 'issue', cell: (r) => <span className="text-[var(--color-danger)] font-medium">{r.issue}</span> },
              { header: 'Location', accessorKey: 'location' },
              { header: 'Last Ping', accessorKey: 'lastPing', cell: (r) => <span className="text-[var(--color-text-muted)]">{r.lastPing}</span> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
