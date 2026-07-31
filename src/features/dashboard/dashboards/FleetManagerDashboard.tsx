import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { FleetUptimeMetricsWidget } from '@/shared/domain-widgets/FleetUptimeMetricsWidget';
import { OfflineDevicesQueueWidget } from '@/shared/domain-widgets/OfflineDevicesQueueWidget';
import { MaintenanceQueueWidget } from '@/shared/domain-widgets/MaintenanceQueueWidget';

export function FleetManagerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Fleet Operations Console</h1>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Real-time telemetry, hardware health, and maintenance queues.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard/operations/devices')}>
            View All Devices
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/dashboard/operations/maintenance')}>
            + New Work Order
          </Button>
        </div>
      </div>

      {/* DOMAIN WIDGET: FLEET UPTIME METRICS */}
      <FleetUptimeMetricsWidget />

      {/* 2-COLUMN OPERATIONS WORKSPACE COMPOSING DOMAIN WIDGETS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: OFFLINE SCREENS WIDGET */}
        <div className="lg:col-span-7">
          <OfflineDevicesQueueWidget />
        </div>

        {/* RIGHT: MAINTENANCE QUEUE WIDGET */}
        <div className="lg:col-span-5">
          <MaintenanceQueueWidget />
        </div>
      </div>
    </div>
  );
}
