import { Play, RotateCcw, XCircle, CheckCircle2, CircleDashed } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/shared/components/data-display/DataTable';
import { Badge } from '@/shared/components/indicators/Badge';
import { ProgressRing } from '@/shared/components/indicators/ProgressRing';
import { Icon } from '@/shared/icons/Icon';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';

import { mockStore, type DeploymentState, type Deployment } from '../../data/MockDataStore';

export function DeploymentsPage() {
  const mockDeployments = mockStore.deployments;

  const renderState = (state: DeploymentState) => {
    switch (state) {
      case 'queued': return <Badge variant="default" className="bg-[var(--color-surface-hover)] text-[var(--color-text-primary)]"><Icon icon={CircleDashed} size="sm" className="mr-1"/> Queued</Badge>;
      case 'preparing': return <Badge variant="warning"><Icon icon={RotateCcw} size="sm" className="mr-1 animate-spin"/> Preparing</Badge>;
      case 'deploying': return <Badge variant="primary"><Icon icon={RotateCcw} size="sm" className="mr-1 animate-spin"/> Deploying</Badge>;
      case 'verifying': return <Badge variant="info"><Icon icon={RotateCcw} size="sm" className="mr-1 animate-spin"/> Verifying</Badge>;
      case 'completed': return <Badge variant="success"><Icon icon={CheckCircle2} size="sm" className="mr-1"/> Completed</Badge>;
      case 'failed': return <Badge variant="danger"><Icon icon={XCircle} size="sm" className="mr-1"/> Failed</Badge>;
    }
  };

  const renderProgress = (deployment: Deployment) => {
    const progress = Math.round((deployment.completedCount / deployment.targetCount) * 100);
    return (
      <div className="flex items-center gap-3">
        <ProgressRing value={progress} size={32} />
        <span className="text-sm">
          {deployment.completedCount} / {deployment.targetCount}
        </span>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Deployments</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Manage OTA updates and bulk configuration syncs</p>
        </div>
        <div className="flex items-center gap-3">
          <PermissionGate required={Permission.DEVICES.COMMAND}>
            <Button>
              <Icon icon={Play} size="sm" className="mr-2" />
              New Deployment
            </Button>
          </PermissionGate>
        </div>
      </div>

      {/* Deployments Table */}
      <div className="flex-1 min-h-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-level-1)] p-4">
        <DataTable
          data={mockDeployments}
          keyExtractor={d => d.id}
          columns={[
            { header: 'Deployment', accessorKey: 'name', cell: (d) => (
              <div className="flex flex-col">
                <span className="font-medium">{d.name}</span>
                <span className="text-xs text-[var(--color-text-muted)]">{d.id}</span>
              </div>
            )},
            { header: 'State', accessorKey: 'state', cell: (d) => renderState(d.state) },
            { header: 'Progress', cell: (d) => renderProgress(d) },
            { header: 'Started', accessorKey: 'startTime', cell: (d) => new Date(d.startTime).toLocaleString() },
            { header: 'Initiated By', accessorKey: 'createdBy' },
          ]}
        />
      </div>
    </div>
  );
}
