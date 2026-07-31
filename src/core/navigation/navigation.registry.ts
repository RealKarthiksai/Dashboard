import {
  LayoutDashboard,
  Activity,
  MonitorSmartphone,
  Bell,
  DownloadCloud,
  Image as ImageIcon,
  ListVideo,
  Calendar,
  Megaphone,
  Users,
  BarChart3,
  PieChart,
  Building2,
  CreditCard,
  Layers,
  Shield,
  Terminal,
  Package,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { Permission, type PermissionKey } from '../authorization/permissions';

export interface NavigationItem {
  id: string;
  title: string;
  route: string;
  icon: LucideIcon;
  category: 'Mission Control' | 'Operations' | 'Content' | 'Marketing' | 'Analytics' | 'Administration';
  requiredPermission?: PermissionKey;
}

export const NAVIGATION_REGISTRY: NavigationItem[] = [
  // Mission Control
  {
    id: 'overview',
    title: 'Overview',
    route: '/dashboard/overview',
    icon: LayoutDashboard,
    category: 'Mission Control',
  },
  {
    id: 'insights',
    title: 'TrotOS Insights',
    route: '/dashboard/insights',
    icon: Activity,
    category: 'Mission Control',
  },

  // Operations
  {
    id: 'devices',
    title: 'Devices',
    route: '/dashboard/operations/devices',
    icon: MonitorSmartphone,
    category: 'Operations',
    requiredPermission: Permission.DEVICES.READ,
  },
  {
    id: 'sites',
    title: 'Site Hierarchy',
    route: '/dashboard/operations/sites',
    icon: Building2,
    category: 'Operations',
    requiredPermission: Permission.DEVICES.READ,
  },
  {
    id: 'inventory',
    title: 'Physical Inventory',
    route: '/dashboard/operations/inventory',
    icon: Package,
    category: 'Operations',
    requiredPermission: Permission.DEVICES.READ,
  },
  {
    id: 'maintenance',
    title: 'Maintenance & Work Orders',
    route: '/dashboard/operations/maintenance',
    icon: Wrench,
    category: 'Operations',
    requiredPermission: Permission.DEVICES.READ,
  },
  {
    id: 'monitoring',
    title: 'Monitoring',
    route: '/dashboard/operations/monitoring',
    icon: Activity,
    category: 'Operations',
    requiredPermission: Permission.DEVICES.READ,
  },
  {
    id: 'alerts',
    title: 'Alerts',
    route: '/dashboard/operations/alerts',
    icon: Bell,
    category: 'Operations',
    requiredPermission: Permission.DEVICES.READ,
  },
  {
    id: 'deployments',
    title: 'Deployments',
    route: '/dashboard/operations/deployments',
    icon: DownloadCloud,
    category: 'Operations',
    requiredPermission: Permission.DEVICES.COMMAND,
  },

  // Content
  {
    id: 'media',
    title: 'Media Library',
    route: '/dashboard/content/media',
    icon: ImageIcon,
    category: 'Content',
    requiredPermission: Permission.CONTENT.READ,
  },
  {
    id: 'playlists',
    title: 'Playlists',
    route: '/dashboard/content/playlists',
    icon: ListVideo,
    category: 'Content',
    requiredPermission: Permission.CONTENT.READ,
  },
  {
    id: 'schedules',
    title: 'Schedules',
    route: '/dashboard/content/schedules',
    icon: Calendar,
    category: 'Content',
    requiredPermission: Permission.CONTENT.READ,
  },

  // Marketing
  {
    id: 'campaigns',
    title: 'Campaigns',
    route: '/dashboard/marketing/campaigns',
    icon: Megaphone,
    category: 'Marketing',
    requiredPermission: Permission.CAMPAIGNS.READ,
  },
  {
    id: 'advertisers',
    title: 'Advertisers',
    route: '/dashboard/marketing/advertisers',
    icon: Users,
    category: 'Marketing',
    requiredPermission: Permission.CAMPAIGNS.READ,
  },
  {
    id: 'assignments',
    title: 'Fleet Assignments',
    route: '/dashboard/marketing/assignments',
    icon: Layers,
    category: 'Marketing',
    requiredPermission: Permission.CAMPAIGNS.READ,
  },
  {
    id: 'ad-reports',
    title: 'Campaign Reports',
    route: '/dashboard/marketing/reports',
    icon: BarChart3,
    category: 'Marketing',
    requiredPermission: Permission.CAMPAIGNS.READ,
  },

  // Analytics
  {
    id: 'reports',
    title: 'Custom Reports',
    route: '/dashboard/analytics/reports',
    icon: BarChart3,
    category: 'Analytics',
    requiredPermission: Permission.ANALYTICS.READ,
  },
  {
    id: 'fleet-insights',
    title: 'Fleet Analytics',
    route: '/dashboard/analytics/insights/fleet',
    icon: PieChart,
    category: 'Analytics',
    requiredPermission: Permission.ANALYTICS.READ,
  },
  {
    id: 'playback-insights',
    title: 'Playback Analytics',
    route: '/dashboard/analytics/insights/playback',
    icon: Layers,
    category: 'Analytics',
    requiredPermission: Permission.ANALYTICS.READ,
  },
  {
    id: 'user-metrics',
    title: 'User Metrics',
    route: '/dashboard/analytics/metrics',
    icon: Users,
    category: 'Analytics',
    requiredPermission: Permission.ANALYTICS.READ,
  },

  // Administration
  {
    id: 'team',
    title: 'Team Directory',
    route: '/dashboard/admin/team',
    icon: Users,
    category: 'Administration',
    requiredPermission: Permission.USERS.READ,
  },
  {
    id: 'roles',
    title: 'Roles & Capabilities',
    route: '/dashboard/admin/roles',
    icon: Shield,
    category: 'Administration',
    requiredPermission: Permission.USERS.READ,
  },
  {
    id: 'organization',
    title: 'Organization',
    route: '/dashboard/admin/organization',
    icon: Building2,
    category: 'Administration',
    requiredPermission: Permission.USERS.READ,
  },
  {
    id: 'billing',
    title: 'Billing',
    route: '/dashboard/admin/billing',
    icon: CreditCard,
    category: 'Administration',
    requiredPermission: Permission.BILLING.READ,
  },
  {
    id: 'audit-log',
    title: 'Audit Log',
    route: '/dashboard/admin/audit',
    icon: Terminal,
    category: 'Administration',
    requiredPermission: Permission.USERS.READ,
  },
];
