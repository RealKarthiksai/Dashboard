import type { NavigationPresetKey } from '../experiences/experience.types';

export interface SidebarSection {
  label?: string;
  items: string[];
}

export type SidebarPreset = SidebarSection[];

export const NAVIGATION_PRESETS: Record<NavigationPresetKey, SidebarPreset> = {
  OWNER: [
    { label: 'Mission Control', items: ['overview', 'insights'] },
    { label: 'Operations', items: ['devices', 'sites', 'inventory', 'maintenance', 'field-jobs', 'monitoring', 'alerts', 'deployments'] },
    { label: 'Content', items: ['media', 'playlists', 'schedules'] },
    { label: 'Marketing', items: ['campaigns', 'advertisers', 'assignments', 'ad-reports'] },
    { label: 'Analytics', items: ['reports', 'fleet-insights', 'playback-insights', 'user-metrics'] },
    { label: 'Administration', items: ['team', 'roles', 'organization', 'billing', 'audit-log'] },
  ],
  FLEET: [
    { label: 'Dashboard', items: ['fleet-home'] },
    { label: 'Fleet Assets', items: ['devices', 'sites', 'inventory'] },
    { label: 'Work Orders', items: ['maintenance', 'field-jobs'] },
    { label: 'Monitoring', items: ['monitoring', 'alerts', 'deployments'] },
    { label: 'Reports', items: ['fleet-insights'] },
  ],
  TECHNICIAN: [
    { items: ['field-jobs', 'tech-history', 'tech-profile'] },
  ],
  CONTENT: [
    { label: 'Dashboard', items: ['content-home'] },
    { label: 'Media & Playlists', items: ['media', 'playlists'] },
    { label: 'Scheduling', items: ['schedules'] },
    { label: 'Reports', items: ['playback-insights'] },
  ],
  ADVERTISER: [
    { label: 'Campaigns', items: ['campaigns', 'advertisers'] },
    { label: 'Performance', items: ['ad-reports'] },
    { label: 'Commercial', items: ['billing'] },
  ],
  DRIVER: [
    { items: ['driver-vehicle', 'driver-report', 'driver-messages', 'driver-support'] },
  ],
  SUPPORT: [
    { label: 'Dashboard', items: ['support-home'] },
    { label: 'Support Queue', items: ['support-tickets', 'support-orgs'] },
    { label: 'Diagnostics', items: ['devices', 'audit-log'] },
  ],
  PLATFORM: [
    { label: 'Platform Operations', items: ['platform-health', 'platform-orgs'] },
    { label: 'Commercial', items: ['platform-billing', 'platform-licenses'] },
    { label: 'Support Escalations', items: ['platform-tickets'] },
  ],
};
