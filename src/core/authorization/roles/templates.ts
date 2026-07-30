import { Permission, type PermissionKey } from '../permissions';

export type RoleName =
  | 'Owner'
  | 'Admin'
  | 'Operations_Manager'
  | 'Media_Manager'
  | 'Campaign_Manager'
  | 'Sales_Manager'
  | 'Finance_Manager'
  | 'Analytics_Manager'
  | 'Support_Engineer'
  | 'Viewer';

export const ROLE_TEMPLATES: Record<RoleName, PermissionKey[]> = {
  Owner: [
    Permission.DEVICES.READ,
    Permission.DEVICES.UPDATE,
    Permission.DEVICES.COMMAND,
    Permission.DEVICES.DELETE,
    Permission.CONTENT.READ,
    Permission.CONTENT.CREATE,
    Permission.CONTENT.UPDATE,
    Permission.CONTENT.DELETE,
    Permission.CAMPAIGNS.READ,
    Permission.CAMPAIGNS.CREATE,
    Permission.CAMPAIGNS.UPDATE,
    Permission.CAMPAIGNS.DELETE,
    Permission.ANALYTICS.READ,
    Permission.ANALYTICS.EXPORT,
    Permission.BILLING.READ,
    Permission.BILLING.UPDATE,
    Permission.USERS.READ,
    Permission.USERS.UPDATE,
    Permission.USERS.ROLES_UPDATE,
  ],

  Admin: [
    Permission.DEVICES.READ,
    Permission.DEVICES.UPDATE,
    Permission.DEVICES.COMMAND,
    Permission.CONTENT.READ,
    Permission.CONTENT.CREATE,
    Permission.CONTENT.UPDATE,
    Permission.CAMPAIGNS.READ,
    Permission.CAMPAIGNS.CREATE,
    Permission.ANALYTICS.READ,
    Permission.ANALYTICS.EXPORT,
    Permission.BILLING.READ,
    Permission.USERS.READ,
    Permission.USERS.UPDATE,
  ],

  Operations_Manager: [
    Permission.DEVICES.READ,
    Permission.DEVICES.UPDATE,
    Permission.DEVICES.COMMAND,
    Permission.CONTENT.READ,
    Permission.ANALYTICS.READ,
    Permission.USERS.READ,
  ],

  Media_Manager: [
    Permission.CONTENT.READ,
    Permission.CONTENT.CREATE,
    Permission.CONTENT.UPDATE,
    Permission.CONTENT.DELETE,
    Permission.DEVICES.READ,
  ],

  Campaign_Manager: [
    Permission.CAMPAIGNS.READ,
    Permission.CAMPAIGNS.CREATE,
    Permission.CAMPAIGNS.UPDATE,
    Permission.CAMPAIGNS.DELETE,
    Permission.CONTENT.READ,
    Permission.ANALYTICS.READ,
  ],

  Sales_Manager: [
    Permission.CAMPAIGNS.READ,
    Permission.ANALYTICS.READ,
    Permission.BILLING.READ,
  ],

  Finance_Manager: [
    Permission.BILLING.READ,
    Permission.BILLING.UPDATE,
    Permission.ANALYTICS.READ,
    Permission.ANALYTICS.EXPORT,
    Permission.CAMPAIGNS.READ,
  ],

  Analytics_Manager: [
    Permission.ANALYTICS.READ,
    Permission.ANALYTICS.EXPORT,
    Permission.DEVICES.READ,
    Permission.CONTENT.READ,
    Permission.CAMPAIGNS.READ,
  ],

  Support_Engineer: [
    Permission.DEVICES.READ,
    Permission.DEVICES.COMMAND,
    Permission.ANALYTICS.READ,
  ],

  Viewer: [
    Permission.DEVICES.READ,
    Permission.CONTENT.READ,
    Permission.CAMPAIGNS.READ,
    Permission.ANALYTICS.READ,
  ],
};
