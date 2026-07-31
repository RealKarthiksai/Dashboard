import { lazy, type ComponentType } from 'react';
import type { DashboardKey } from '../experiences/experience.types';

export const DASHBOARD_REGISTRY: Record<DashboardKey, React.LazyExoticComponent<ComponentType<any>>> = {
  OWNER: lazy(() => import('@/features/dashboard/dashboards/OwnerDashboard').then(m => ({ default: m.OwnerDashboard }))),
  FLEET: lazy(() => import('@/features/dashboard/dashboards/FleetManagerDashboard').then(m => ({ default: m.FleetManagerDashboard }))),
  TECHNICIAN: lazy(() => import('@/features/dashboard/dashboards/TechnicianDashboard').then(m => ({ default: m.TechnicianDashboard }))),
  CONTENT: lazy(() => import('@/features/dashboard/dashboards/ContentDashboard').then(m => ({ default: m.ContentDashboard }))),
  ADVERTISER: lazy(() => import('@/features/dashboard/dashboards/AdvertiserDashboard').then(m => ({ default: m.AdvertiserDashboard }))),
  DRIVER: lazy(() => import('@/features/dashboard/dashboards/DriverDashboard').then(m => ({ default: m.DriverDashboard }))),
  SUPPORT: lazy(() => import('@/features/dashboard/dashboards/SupportDashboard').then(m => ({ default: m.SupportDashboard }))),
  PLATFORM: lazy(() => import('@/features/dashboard/dashboards/PlatformAdminDashboard').then(m => ({ default: m.PlatformAdminDashboard }))),
};
