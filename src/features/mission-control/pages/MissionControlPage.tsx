import { useNavigate } from 'react-router-dom';
import { HeroCard } from '../components/HeroCard';
import { AlertTimeline } from '../components/AlertTimeline';
import { ActivityFeed } from '../components/ActivityFeed';
import { UpcomingSchedule } from '../components/UpcomingSchedule';
import { QuickActionsGrid } from '../components/QuickActionsGrid';
import { MISSION_CONTROL_WIDGETS } from '../widgets/widget.registry';
import { useAuth } from '@/context/AuthContext';
import { usePermission } from '@/core/authorization/PermissionContext';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';

export function MissionControlPage() {
  const { user } = useAuth();
  const { can } = usePermission();
  const navigate = useNavigate();

  // Filter registered widgets dynamically by active capabilities
  const visibleWidgets = MISSION_CONTROL_WIDGETS.filter((w) => can(w.permission as any));

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. Hero Card (Health Summary & TrotOS Insights) */}
      <HeroCard
        userName={user?.name || 'Jane Doe'}
        totalScreens={40}
        onlineScreens={38}
        attentionScreens={2}
        onDeployContent={() => navigate('/dashboard/content/schedules')}
        onViewAlerts={() => navigate('/dashboard/operations/alerts')}
      />

      {/* 2. Prioritized Quick Actions */}
      <QuickActionsGrid />

      {/* 3. Proactive Timelines: Critical Alerts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PermissionGate required={Permission.DEVICES.READ}>
          <AlertTimeline />
        </PermissionGate>
        
        <ActivityFeed />
      </div>

      {/* 4. Core Operational Metrics (Rendered dynamically from Widget Registry & Permissions) */}
      {visibleWidgets.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {visibleWidgets.map((widget) => (
            <div key={widget.id}>{widget.render()}</div>
          ))}
        </div>
      )}

      {/* 5. Upcoming Work & Schedules */}
      <UpcomingSchedule />

    </div>
  );
}
