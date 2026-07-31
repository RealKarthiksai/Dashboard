import type { RoleName } from '../authorization/roles/templates';

export type NavigationPresetKey =
  | 'OWNER'
  | 'FLEET'
  | 'TECHNICIAN'
  | 'CONTENT'
  | 'ADVERTISER'
  | 'DRIVER'
  | 'SUPPORT'
  | 'PLATFORM';

export type DashboardKey =
  | 'OWNER'
  | 'FLEET'
  | 'TECHNICIAN'
  | 'CONTENT'
  | 'ADVERTISER'
  | 'DRIVER'
  | 'SUPPORT'
  | 'PLATFORM';

export type AssistantProfileKey =
  | 'OWNER'
  | 'FLEET'
  | 'TECHNICIAN'
  | 'CONTENT'
  | 'ADVERTISER'
  | 'DRIVER'
  | 'SUPPORT'
  | 'PLATFORM';

export type SearchProfileKey =
  | 'OWNER'
  | 'FLEET'
  | 'TECHNICIAN'
  | 'CONTENT'
  | 'ADVERTISER'
  | 'DRIVER'
  | 'SUPPORT'
  | 'PLATFORM';

export type QuickActionProfileKey =
  | 'OWNER'
  | 'FLEET'
  | 'TECHNICIAN'
  | 'CONTENT'
  | 'ADVERTISER'
  | 'DRIVER'
  | 'SUPPORT'
  | 'PLATFORM';

export interface ExperienceConfig {
  role: RoleName;
  navigationPreset: NavigationPresetKey;
  dashboard: DashboardKey;
  assistantProfile: AssistantProfileKey;
  searchProfile: SearchProfileKey;
  quickActionProfile: QuickActionProfileKey;
}
