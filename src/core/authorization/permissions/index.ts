export const Permission = {
  DEVICES: {
    READ: 'DEVICES:READ',
    UPDATE: 'DEVICES:UPDATE',
    COMMAND: 'DEVICES:COMMAND',
    DELETE: 'DEVICES:DELETE',
  },
  CONTENT: {
    READ: 'CONTENT:READ',
    CREATE: 'CONTENT:CREATE',
    UPDATE: 'CONTENT:UPDATE',
    DELETE: 'CONTENT:DELETE',
  },
  CAMPAIGNS: {
    READ: 'CAMPAIGNS:READ',
    CREATE: 'CAMPAIGNS:CREATE',
    UPDATE: 'CAMPAIGNS:UPDATE',
    DELETE: 'CAMPAIGNS:DELETE',
  },
  ANALYTICS: {
    READ: 'ANALYTICS:READ',
    EXPORT: 'ANALYTICS:EXPORT',
  },
  BILLING: {
    READ: 'BILLING:READ',
    UPDATE: 'BILLING:UPDATE',
  },
  USERS: {
    READ: 'USERS:READ',
    UPDATE: 'USERS:UPDATE',
    ROLES_UPDATE: 'USERS:ROLES_UPDATE',
  },
} as const;

// Helper type for any valid permission string
export type PermissionKey =
  | (typeof Permission.DEVICES)[keyof typeof Permission.DEVICES]
  | (typeof Permission.CONTENT)[keyof typeof Permission.CONTENT]
  | (typeof Permission.CAMPAIGNS)[keyof typeof Permission.CAMPAIGNS]
  | (typeof Permission.ANALYTICS)[keyof typeof Permission.ANALYTICS]
  | (typeof Permission.BILLING)[keyof typeof Permission.BILLING]
  | (typeof Permission.USERS)[keyof typeof Permission.USERS];
