import { Activity, WifiOff, Wrench, Users } from 'lucide-react';

export interface FleetUptimeMetricsProps {
  totalDevices?: number;
  onlineDevices?: number;
  offlineCount?: number;
  openWorkOrders?: number;
  activeTechnicians?: number;
}

export function FleetUptimeMetricsWidget({
  totalDevices = 150,
  onlineDevices = 148,
  offlineCount = 3,
  openWorkOrders = 2,
  activeTechnicians = 4,
}: FleetUptimeMetricsProps) {
  const uptimeRate = ((onlineDevices / totalDevices) * 100).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-1">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
          <span>Fleet Uptime Rate</span>
          <Activity className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-2xl font-extrabold text-[var(--color-text-primary)]">{uptimeRate}%</div>
        <div className="text-[11px] text-emerald-400 font-semibold">{onlineDevices} / {totalDevices} Devices Online</div>
      </div>

      <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-1">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
          <span>Offline Devices</span>
          <WifiOff className="w-4 h-4 text-rose-400" />
        </div>
        <div className="text-2xl font-extrabold text-rose-400">{offlineCount}</div>
        <div className="text-[11px] text-rose-400 font-semibold">Requires Attention</div>
      </div>

      <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-1">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
          <span>Open Work Orders</span>
          <Wrench className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-2xl font-extrabold text-amber-400">{openWorkOrders}</div>
        <div className="text-[11px] text-slate-400">Avg Resolution: 2.4 hrs</div>
      </div>

      <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-1">
        <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
          <span>Active Technicians</span>
          <Users className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="text-2xl font-extrabold text-[var(--color-text-primary)]">{activeTechnicians}</div>
        <div className="text-[11px] text-emerald-400 font-semibold">1 On Site · 3 Available</div>
      </div>
    </div>
  );
}
