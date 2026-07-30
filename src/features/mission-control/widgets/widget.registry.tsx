import type { ReactNode } from 'react';
import { Permission } from '@/core/authorization/permissions';
import { MetricCard } from '../components/MetricCard';

export interface WidgetMetadata {
  id: string;
  title: string;
  category: 'Operations' | 'Content' | 'Analytics' | 'Billing';
  priority: number;
  size: 'small' | 'medium' | 'large';
  permission: string;
  render: () => ReactNode;
}

export const MISSION_CONTROL_WIDGETS: WidgetMetadata[] = [
  {
    id: 'fleet-health',
    title: 'Fleet Health Uptime',
    category: 'Operations',
    priority: 1,
    size: 'medium',
    permission: Permission.DEVICES.READ,
    render: () => (
      <MetricCard
        title="Fleet Health Uptime"
        value="96%"
        subtitle="38 of 40 active displays online"
        trendValue="↑ +2%"
        trendLabel="Since Yesterday"
        trendDirection="up"
        isPositive={true}
      />
    ),
  },
  {
    id: 'media-storage',
    title: 'Media Storage Capacity',
    category: 'Content',
    priority: 2,
    size: 'medium',
    permission: Permission.CONTENT.READ,
    render: () => (
      <MetricCard
        title="Media Storage Capacity"
        value="412 GB / 1 TB"
        subtitle="1,420 assets stored across fleet"
        trendValue="↓ -12 GB"
        trendLabel="Last 24 Hours"
        trendDirection="down"
        isPositive={true}
      />
    ),
  },
  {
    id: 'active-campaigns',
    title: 'Active Deployments',
    category: 'Analytics',
    priority: 3,
    size: 'medium',
    permission: Permission.CAMPAIGNS.READ,
    render: () => (
      <MetricCard
        title="Active Deployments"
        value="12 Campaigns"
        subtitle="Running across 38 screens"
        trendValue="↑ +3"
        trendLabel="This Week"
        trendDirection="up"
        isPositive={true}
      />
    ),
  },
];
