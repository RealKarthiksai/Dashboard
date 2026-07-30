import { useState } from 'react';
import { CheckCircle2, AlertTriangle, Info, MoreHorizontal } from 'lucide-react';
import { DataTable } from '@/shared/components/data-display/DataTable';
import { Badge } from '@/shared/components/indicators/Badge';
import { Icon } from '@/shared/icons/Icon';
import { Button } from '@/components/ui/Button';
import { SegmentedControl } from '@/shared/components/navigation/SegmentedControl';

import { mockStore, type AlertStatus, type AlertSeverity } from '../../data/MockDataStore';

export function AlertsPage() {
  const [filter, setFilter] = useState('open');

  const mockAlerts = mockStore.alerts;

  const filteredAlerts = filter === 'all' ? mockAlerts : mockAlerts.filter(a => a.status === filter);

  const renderSeverity = (severity: AlertSeverity) => {
    switch (severity) {
      case 'critical': return <Badge variant="danger" className="gap-1"><Icon icon={AlertTriangle} size="sm" /> Critical</Badge>;
      case 'warning': return <Badge variant="warning" className="gap-1"><Icon icon={AlertTriangle} size="sm" /> Warning</Badge>;
      case 'info': return <Badge variant="info" className="gap-1"><Icon icon={Info} size="sm" /> Info</Badge>;
    }
  };

  const renderStatus = (status: AlertStatus) => {
    switch (status) {
      case 'open': return <Badge variant="danger">Open</Badge>;
      case 'acknowledged': return <Badge variant="warning">Acknowledged</Badge>;
      case 'resolved': return <Badge variant="success">Resolved</Badge>;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">System Alerts</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Review and manage fleet incidents</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">
            <Icon icon={CheckCircle2} size="sm" className="mr-2" />
            Acknowledge All
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div>
        <SegmentedControl
          value={filter}
          onChange={setFilter}
          options={[
            { label: 'Open', value: 'open' },
            { label: 'Acknowledged', value: 'acknowledged' },
            { label: 'Resolved', value: 'resolved' },
            { label: 'All Alerts', value: 'all' },
          ]}
        />
      </div>

      {/* Alerts Table */}
      <div className="flex-1 min-h-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-level-1)] p-4">
        <DataTable
          data={filteredAlerts}
          keyExtractor={a => a.id}
          columns={[
            { header: 'Severity', accessorKey: 'severity', cell: (a) => renderSeverity(a.severity) },
            { header: 'Message', accessorKey: 'message', cell: (a) => <span className="font-medium">{a.message}</span> },
            { header: 'Device', accessorKey: 'deviceName', cell: (a) => (
              <div className="flex flex-col">
                <span>{a.deviceName}</span>
                <span className="text-xs text-[var(--color-text-muted)]">{a.deviceId}</span>
              </div>
            )},
            { header: 'Time', accessorKey: 'timestamp', cell: (a) => new Date(a.timestamp).toLocaleString() },
            { header: 'Status', accessorKey: 'status', cell: (a) => renderStatus(a.status) },
            { header: '', cell: () => (
              <button className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"><Icon icon={MoreHorizontal} size="sm" /></button>
            )}
          ]}
        />
      </div>
    </div>
  );
}
