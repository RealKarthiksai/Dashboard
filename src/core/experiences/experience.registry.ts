import type { RoleName } from '../authorization/roles/templates';
import type { ExperienceConfig } from './experience.types';

export const EXPERIENCE_REGISTRY: Record<RoleName, ExperienceConfig> = {
  Platform_Super_Admin: {
    role: 'Platform_Super_Admin',
    navigationPreset: 'PLATFORM',
    dashboard: 'PLATFORM',
    assistantProfile: 'PLATFORM',
    searchProfile: 'PLATFORM',
    quickActionProfile: 'PLATFORM',
  },
  Organization_Owner: {
    role: 'Organization_Owner',
    navigationPreset: 'OWNER',
    dashboard: 'OWNER',
    assistantProfile: 'OWNER',
    searchProfile: 'OWNER',
    quickActionProfile: 'OWNER',
  },
  Fleet_Manager: {
    role: 'Fleet_Manager',
    navigationPreset: 'FLEET',
    dashboard: 'FLEET',
    assistantProfile: 'FLEET',
    searchProfile: 'FLEET',
    quickActionProfile: 'FLEET',
  },
  Technician: {
    role: 'Technician',
    navigationPreset: 'TECHNICIAN',
    dashboard: 'TECHNICIAN',
    assistantProfile: 'TECHNICIAN',
    searchProfile: 'TECHNICIAN',
    quickActionProfile: 'TECHNICIAN',
  },
  Content_Manager: {
    role: 'Content_Manager',
    navigationPreset: 'CONTENT',
    dashboard: 'CONTENT',
    assistantProfile: 'CONTENT',
    searchProfile: 'CONTENT',
    quickActionProfile: 'CONTENT',
  },
  Advertiser: {
    role: 'Advertiser',
    navigationPreset: 'ADVERTISER',
    dashboard: 'ADVERTISER',
    assistantProfile: 'ADVERTISER',
    searchProfile: 'ADVERTISER',
    quickActionProfile: 'ADVERTISER',
  },
  Driver: {
    role: 'Driver',
    navigationPreset: 'DRIVER',
    dashboard: 'DRIVER',
    assistantProfile: 'DRIVER',
    searchProfile: 'DRIVER',
    quickActionProfile: 'DRIVER',
  },
  Customer_Support: {
    role: 'Customer_Support',
    navigationPreset: 'SUPPORT',
    dashboard: 'SUPPORT',
    assistantProfile: 'SUPPORT',
    searchProfile: 'SUPPORT',
    quickActionProfile: 'SUPPORT',
  },
};
