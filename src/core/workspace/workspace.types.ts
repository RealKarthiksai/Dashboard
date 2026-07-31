import type { RoleName } from '../authorization/roles/templates';

export type WorkspaceId =
  | 'OWNER'
  | 'FLEET'
  | 'TECHNICIAN'
  | 'CONTENT'
  | 'ADVERTISER'
  | 'DRIVER'
  | 'SUPPORT'
  | 'PLATFORM';

export interface WorkspaceConfig {
  id: WorkspaceId;
  label: string;
  defaultRoute: string;
  statusLine: string;
}

export const WORKSPACE_DEFINITIONS: Record<WorkspaceId, WorkspaceConfig> = {
  OWNER: { id: 'OWNER', label: 'Mission Control', defaultRoute: '/dashboard/overview', statusLine: 'Active & Syncing · 148/150 online' },
  FLEET: { id: 'FLEET', label: 'Fleet Operations', defaultRoute: '/dashboard/fleet/health', statusLine: '3 devices offline · 2 tickets open' },
  TECHNICIAN: { id: 'TECHNICIAN', label: 'Field Technician App', defaultRoute: '/dashboard/operations/field-jobs', statusLine: 'Job #901 · Gate 14 · 09:30 AM' },
  CONTENT: { id: 'CONTENT', label: 'Content Publishing', defaultRoute: '/dashboard/content/media', statusLine: 'All schedules live · 12 playlists active' },
  ADVERTISER: { id: 'ADVERTISER', label: 'Advertiser Portal', defaultRoute: '/dashboard/marketing/campaigns', statusLine: 'Campaign A: 18,400 impr today' },
  DRIVER: { id: 'DRIVER', label: 'Cab Driver Console', defaultRoute: '/dashboard/driver', statusLine: 'Your screen is online' },
  SUPPORT: { id: 'SUPPORT', label: 'Customer Support Console', defaultRoute: '/dashboard/support', statusLine: '5 open tickets · 2 critical' },
  PLATFORM: { id: 'PLATFORM', label: 'Platform Super Admin', defaultRoute: '/dashboard/platform', statusLine: 'Platform OK · 42 orgs active' },
};

export const ROLE_DEFAULT_WORKSPACE: Record<RoleName, WorkspaceId> = {
  Platform_Super_Admin: 'PLATFORM',
  Organization_Owner: 'OWNER',
  Fleet_Manager: 'FLEET',
  Technician: 'TECHNICIAN',
  Content_Manager: 'CONTENT',
  Advertiser: 'ADVERTISER',
  Driver: 'DRIVER',
  Customer_Support: 'SUPPORT',
};
