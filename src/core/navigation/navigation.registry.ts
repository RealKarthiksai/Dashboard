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
  Settings,
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

  // Analytics
  {
    id: 'reports',
    title: 'Reports',
    route: '/dashboard/analytics/reports',
    icon: BarChart3,
    category: 'Analytics',
    requiredPermission: Permission.ANALYTICS.READ,
  },
  {
    id: 'fleet-insights',
    title: 'Fleet Analytics',
    route: '/dashboard/analytics/insights',
    icon: PieChart,
    category: 'Analytics',
    requiredPermission: Permission.ANALYTICS.READ,
  },

  // Administration
  {
    id: 'team',
    title: 'Team',
    route: '/dashboard/admin/team',
    icon: Users,
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
    id: 'settings',
    title: 'Settings',
    route: '/dashboard/admin/settings',
    icon: Settings,
    category: 'Administration',
  },
];
