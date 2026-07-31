import { Permission, type PermissionKey } from '../permissions';

export type RoleName =
  | 'Platform_Super_Admin'
  | 'Organization_Owner'
  | 'Fleet_Manager'
  | 'Technician'
  | 'Content_Manager'
  | 'Advertiser'
  | 'Driver'
  | 'Customer_Support';

export const ROLE_TEMPLATES: Record<RoleName, PermissionKey[]> = {
  Platform_Super_Admin: [
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

  Organization_Owner: [
    Permission.DEVICES.READ,
    Permission.DEVICES.UPDATE,
    Permission.DEVICES.COMMAND,
    Permission.CONTENT.READ,
    Permission.CONTENT.CREATE,
    Permission.CONTENT.UPDATE,
    Permission.CAMPAIGNS.READ,
    Permission.CAMPAIGNS.CREATE,
    Permission.CAMPAIGNS.UPDATE,
    Permission.ANALYTICS.READ,
    Permission.ANALYTICS.EXPORT,
    Permission.BILLING.READ,
    Permission.BILLING.UPDATE,
    Permission.USERS.READ,
    Permission.USERS.UPDATE,
    Permission.USERS.ROLES_UPDATE,
  ],

  Fleet_Manager: [
    Permission.DEVICES.READ,
    Permission.DEVICES.UPDATE,
    Permission.DEVICES.COMMAND,
    Permission.CONTENT.READ,
    Permission.ANALYTICS.READ,
    Permission.USERS.READ,
  ],

  Technician: [
    Permission.DEVICES.READ,
    Permission.DEVICES.UPDATE,
    Permission.DEVICES.COMMAND,
  ],

  Content_Manager: [
    Permission.CONTENT.READ,
    Permission.CONTENT.CREATE,
    Permission.CONTENT.UPDATE,
    Permission.CONTENT.DELETE,
    Permission.DEVICES.READ,
    Permission.ANALYTICS.READ,
  ],

  Advertiser: [
    Permission.CAMPAIGNS.READ,
    Permission.CAMPAIGNS.CREATE,
    Permission.CAMPAIGNS.UPDATE,
    Permission.ANALYTICS.READ,
  ],

  Driver: [
    Permission.DEVICES.READ,
  ],

  Customer_Support: [
    Permission.DEVICES.READ,
    Permission.DEVICES.COMMAND,
    Permission.ANALYTICS.READ,
    Permission.USERS.READ,
  ],
};
