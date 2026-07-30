import { useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

const ROUTE_LABELS: Record<string, string> = {
  dashboard: 'Mission Control',
  overview: 'Overview',
  insights: 'TrotOS Insights',
  operations: 'Operations',
  devices: 'Devices',
  monitoring: 'Monitoring',
  alerts: 'Alerts',
  deployments: 'Deployments',
  content: 'Content',
  media: 'Media Library',
  playlists: 'Playlists',
  schedules: 'Schedules',
  marketing: 'Marketing',
  campaigns: 'Campaigns',
  advertisers: 'Advertisers',
  analytics: 'Analytics',
  reports: 'Reports',
  admin: 'Administration',
  team: 'Team',
  organization: 'Organization',
  billing: 'Billing',
  settings: 'Settings',
};

export function useBreadcrumbs(): BreadcrumbItem[] {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  let currentPath = '';
  return segments.map((segment, index) => {
    currentPath += `/${segment}`;
    const formattedLabel =
      ROUTE_LABELS[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    return {
      label: formattedLabel,
      path: currentPath,
      isLast: index === segments.length - 1,
    };
  });
}
