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
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';
import { Permission, type PermissionKey } from '../authorization/permissions';

export interface NavigationItem {
  id: string;
  title: string;
  route: string;
  icon: LucideIcon;
  category: 'Mission Control' | 'Operations' | 'Content' | 'Marketing' | 'Analytics' | 'Administration' | 'Specialized';
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

  // Role Home Dashboards
  {
    id: 'fleet-home',
    title: 'Fleet Health',
    route: '/dashboard/fleet/health',
    icon: Activity,
    category: 'Specialized',
  },
  {
    id: 'content-home',
    title: 'Content Dashboard',
    route: '/dashboard/content/home',
    icon: ImageIcon,
    category: 'Specialized',
  },
  {
    id: 'support-home',
    title: 'Support Console',
    route: '/dashboard/support',
    icon: Shield,
    category: 'Specialized',
  },
  {
    id: 'support-tickets',
    title: 'Open Tickets',
    route: '/dashboard/support/tickets',
    icon: Bell,
    category: 'Specialized',
  },
  {
    id: 'support-orgs',
    title: 'Search Organizations',
    route: '/dashboard/support/orgs',
    icon: Building2,
    category: 'Specialized',
  },
  {
    id: 'platform-health',
    title: 'Platform Health',
    route: '/dashboard/platform',
    icon: Activity,
    category: 'Specialized',
  },
  {
    id: 'platform-orgs',
    title: 'Organizations',
    route: '/dashboard/platform/orgs',
    icon: Building2,
    category: 'Specialized',
  },
  {
    id: 'platform-billing',
    title: 'Global Revenue',
    route: '/dashboard/platform/billing',
    icon: CreditCard,
    category: 'Specialized',
  },
  {
    id: 'platform-licenses',
    title: 'License Seats',
    route: '/dashboard/platform/licenses',
    icon: Layers,
    category: 'Specialized',
  },
  {
    id: 'platform-tickets',
    title: 'Support Escalations',
    route: '/dashboard/platform/tickets',
    icon: Bell,
    category: 'Specialized',
  },

  // Driver Persona Entries
  {
    id: 'driver-vehicle',
    title: 'My Vehicle',
    route: '/dashboard/driver',
    icon: MonitorSmartphone,
    category: 'Specialized',
  },
  {
    id: 'driver-report',
    title: 'Report Problem',
    route: '/dashboard/driver/report',
    icon: Bell,
    category: 'Specialized',
  },
  {
    id: 'driver-messages',
    title: 'Messages',
    route: '/dashboard/driver/messages',
    icon: Users,
    category: 'Specialized',
  },
  {
    id: 'driver-support',
    title: 'Call Support',
    route: '/dashboard/driver/support',
    icon: Shield,
    category: 'Specialized',
  },

  // Technician Persona Entries
  {
    id: 'tech-history',
    title: 'History',
    route: '/dashboard/operations/field-jobs/history',
    icon: Activity,
    category: 'Specialized',
  },
  {
    id: 'tech-profile',
    title: 'Profile',
    route: '/dashboard/operations/field-jobs/profile',
    icon: Users,
    category: 'Specialized',
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
    id: 'field-jobs',
    title: 'Field Installation (Tech App)',
    route: '/dashboard/operations/field-jobs',
    icon: ClipboardList,
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
