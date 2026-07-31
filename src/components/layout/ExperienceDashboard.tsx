import { lazy, Suspense } from 'react';
import { useWorkspace } from '@/core/workspace/WorkspaceContext';
import { PageLoadingFallback } from '@/shared/components/feedback/PageLoadingFallback';

const OwnerDashboard = lazy(() => import('@/features/dashboard/dashboards/OwnerDashboard').then(m => ({ default: m.OwnerDashboard })));
const FleetManagerDashboard = lazy(() => import('@/features/dashboard/dashboards/FleetManagerDashboard').then(m => ({ default: m.FleetManagerDashboard })));
const TechnicianDashboard = lazy(() => import('@/features/dashboard/dashboards/TechnicianDashboard').then(m => ({ default: m.TechnicianDashboard })));
const ContentDashboard = lazy(() => import('@/features/dashboard/dashboards/ContentDashboard').then(m => ({ default: m.ContentDashboard })));
const AdvertiserDashboard = lazy(() => import('@/features/dashboard/dashboards/AdvertiserDashboard').then(m => ({ default: m.AdvertiserDashboard })));
const DriverDashboard = lazy(() => import('@/features/dashboard/dashboards/DriverDashboard').then(m => ({ default: m.DriverDashboard })));
const SupportDashboard = lazy(() => import('@/features/dashboard/dashboards/SupportDashboard').then(m => ({ default: m.SupportDashboard })));
const PlatformAdminDashboard = lazy(() => import('@/features/dashboard/dashboards/PlatformAdminDashboard').then(m => ({ default: m.PlatformAdminDashboard })));

export function ExperienceDashboard() {
  const { activeWorkspace } = useWorkspace();

  const renderDashboard = () => {
    switch (activeWorkspace) {
      case 'FLEET': return <FleetManagerDashboard />;
      case 'TECHNICIAN': return <TechnicianDashboard />;
      case 'CONTENT': return <ContentDashboard />;
      case 'ADVERTISER': return <AdvertiserDashboard />;
      case 'DRIVER': return <DriverDashboard />;
      case 'SUPPORT': return <SupportDashboard />;
      case 'PLATFORM': return <PlatformAdminDashboard />;
      case 'OWNER':
      default:
        return <OwnerDashboard />;
    }
  };

  return (
    <Suspense fallback={<PageLoadingFallback />}>
      {renderDashboard()}
    </Suspense>
  );
}
