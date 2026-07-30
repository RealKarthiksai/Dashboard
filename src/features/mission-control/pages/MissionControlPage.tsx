import { useNavigate } from 'react-router-dom';
import { HeroCard } from '../components/HeroCard';
import { AlertTimeline } from '../components/AlertTimeline';
import { ActivityFeed } from '../components/ActivityFeed';
import { UpcomingSchedule } from '../components/UpcomingSchedule';
import { QuickActionsGrid } from '../components/QuickActionsGrid';
import { TelanganaFleetMap } from '../components/TelanganaFleetMap';
import { MISSION_CONTROL_WIDGETS } from '../widgets/widget.registry';
import { useAuth } from '@/context/AuthContext';
import { usePermission } from '@/core/authorization/PermissionContext';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { Activity, ShieldCheck, Zap } from 'lucide-react';

export function MissionControlPage() {
  const { user } = useAuth();
  const { can } = usePermission();
  const navigate = useNavigate();

  // Filter registered widgets dynamically by active capabilities
  const visibleWidgets = MISSION_CONTROL_WIDGETS.filter((w) => can(w.permission as any));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Editorial Mission Control Telemetry Ticker */}
      <div className="flex items-center justify-between px-4 py-2 rounded-xl bg-[var(--color-level-3)] border border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] font-medium">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] font-bold">Telemetry Live Stream:</span>
          <span className="font-mono text-emerald-400 font-semibold">1,482 events/sec</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-[11px] font-mono text-[var(--color-text-muted)]">
          <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> RBAC Engine: Active</span>
          <span className="flex items-center gap-1"><Zap className="w-3.5 h-3.5 text-amber-400" /> Avg Latency: 18ms</span>
        </div>
      </div>

      {/* 1. Hero Card (Health Summary & TrotOS Insights) */}
      <HeroCard
        userName={user?.name || 'Jane Doe'}
        totalScreens={150}
        onlineScreens={148}
        attentionScreens={2}
        onDeployContent={() => navigate('/dashboard/content/schedules')}
        onViewAlerts={() => navigate('/dashboard/operations/alerts')}
      />

      {/* 2. Prioritized Quick Actions */}
      <QuickActionsGrid />

      {/* 3. Telangana Live Fleet Roaming Radar Map */}
      <PermissionGate required={Permission.DEVICES.READ}>
        <TelanganaFleetMap />
      </PermissionGate>

      {/* 4. Editorial Asymmetric Grid: Alerts (7 cols) & Activity Feed (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <PermissionGate required={Permission.DEVICES.READ}>
            <AlertTimeline />
          </PermissionGate>
        </div>
        
        <div className="lg:col-span-5">
          <ActivityFeed />
        </div>
      </div>

      {/* 4. Core Operational Metrics (Rendered dynamically from Widget Registry & Permissions) */}
      {visibleWidgets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleWidgets.map((widget) => (
            <div key={widget.id} className="rounded-2xl bg-[var(--color-level-3)] border border-[var(--color-border)] p-4 shadow-sm hover:border-[var(--color-primary)]/40 transition-colors">
              {widget.render()}
            </div>
          ))}
        </div>
      )}

      {/* 5. Upcoming Work & Schedules */}
      <UpcomingSchedule />

    </div>
  );
}
