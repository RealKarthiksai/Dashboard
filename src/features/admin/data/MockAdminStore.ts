import { Permission } from '@/core/authorization/permissions';
import type {
  User,
  RoleTemplate,
  OrganizationSettings,
  BillingDetails,
  AuditLogEvent,
} from './types';

export class MockAdminStore {
  private users: User[] = [
    {
      id: 'u-1',
      name: 'Sarah Jenkins',
      email: 'sarah.j@trotos.io',
      roleId: 'role-admin',
      roleName: 'System Administrator',
      status: 'active',
      lastLoginAt: '2026-07-30T14:32:00Z',
      createdAt: '2025-01-10T08:00:00Z',
    },
    {
      id: 'u-2',
      name: 'Marcus Vance',
      email: 'marcus.v@trotos.io',
      roleId: 'role-ad-ops',
      roleName: 'Ad Operations Specialist',
      status: 'active',
      lastLoginAt: '2026-07-30T15:02:00Z',
      createdAt: '2025-03-15T09:30:00Z',
    },
    {
      id: 'u-3',
      name: 'Elena Rostova',
      email: 'elena.r@trotos.io',
      roleId: 'role-content',
      roleName: 'Content Director',
      status: 'active',
      lastLoginAt: '2026-07-29T17:15:00Z',
      createdAt: '2025-02-20T11:00:00Z',
    },
    {
      id: 'u-4',
      name: 'David Kalu',
      email: 'david.k@trotos.io',
      roleId: 'role-ops',
      roleName: 'Fleet Operations Manager',
      status: 'active',
      lastLoginAt: '2026-07-30T12:44:00Z',
      createdAt: '2025-04-01T10:15:00Z',
    },
    {
      id: 'u-5',
      name: 'Chloe Bennett',
      email: 'chloe.b@trotos.io',
      roleId: 'role-viewer',
      roleName: 'Analytics Viewer',
      status: 'pending',
      lastLoginAt: '2026-07-25T11:00:00Z',
      createdAt: '2026-07-24T14:00:00Z',
    },
  ];

  private roles: RoleTemplate[] = [
    {
      id: 'role-admin',
      name: 'System Administrator',
      description: 'Full un-restricted access across all TrotOS modules, security settings, and billing.',
      isSystem: true,
      memberCount: 2,
      permissions: [
        Permission.DEVICES.READ,
        Permission.DEVICES.CREATE,
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
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2026-06-01T12:00:00Z',
    },
    {
      id: 'role-ops',
      name: 'Fleet Operations Manager',
      description: 'Can view, reboot, update, and deploy software updates across physical devices.',
      isSystem: false,
      memberCount: 4,
      permissions: [
        Permission.DEVICES.READ,
        Permission.DEVICES.CREATE,
        Permission.DEVICES.UPDATE,
        Permission.DEVICES.COMMAND,
        Permission.ANALYTICS.READ,
      ],
      createdAt: '2025-02-10T10:00:00Z',
      updatedAt: '2026-05-14T09:30:00Z',
    },
    {
      id: 'role-content',
      name: 'Content Director',
      description: 'Manages media assets, playlist sequencing, and scheduling calendars.',
      isSystem: false,
      memberCount: 3,
      permissions: [
        Permission.CONTENT.READ,
        Permission.CONTENT.CREATE,
        Permission.CONTENT.UPDATE,
        Permission.CONTENT.DELETE,
        Permission.ANALYTICS.READ,
      ],
      createdAt: '2025-02-15T11:00:00Z',
      updatedAt: '2026-04-20T16:00:00Z',
    },
    {
      id: 'role-ad-ops',
      name: 'Ad Operations Specialist',
      description: 'Manages advertisers, sponsors, campaign flight budgets, and ad reports.',
      isSystem: false,
      memberCount: 2,
      permissions: [
        Permission.CAMPAIGNS.READ,
        Permission.CAMPAIGNS.CREATE,
        Permission.CAMPAIGNS.UPDATE,
        Permission.ANALYTICS.READ,
        Permission.ANALYTICS.EXPORT,
      ],
      createdAt: '2025-03-01T09:00:00Z',
      updatedAt: '2026-07-02T14:15:00Z',
    },
    {
      id: 'role-viewer',
      name: 'Analytics Viewer',
      description: 'Read-only access to custom reports and system dashboards.',
      isSystem: false,
      memberCount: 5,
      permissions: [Permission.ANALYTICS.READ],
      createdAt: '2025-05-12T13:00:00Z',
      updatedAt: '2026-01-10T10:00:00Z',
    },
  ];

  private organization: OrganizationSettings = {
    id: 'org_acme',
    name: 'Acme Enterprise Corp',
    domain: 'acme-corp.com',
    type: 'Enterprise Production',
    timezone: 'America/New_York (UTC-5)',
    ssoEnabled: true,
    ssoProvider: 'Okta',
    securityPolicy: {
      requireMfa: true,
      sessionTimeoutMinutes: 60,
      passwordExpirationDays: 90,
    },
  };

  private billing: BillingDetails = {
    subscriptionPlan: 'Enterprise Fleet Tier',
    planPriceMonthly: 1499,
    billingCycle: 'monthly',
    deviceLicensesAllocated: 200,
    deviceLicensesUsed: 150,
    paymentMethod: {
      brand: 'Visa',
      last4: '4242',
      expMonth: 12,
      expYear: 2028,
    },
    nextBillingDate: '2026-08-15T00:00:00Z',
    invoices: [
      {
        id: 'inv-101',
        number: 'INV-2026-007',
        amount: 1499,
        currency: 'USD',
        status: 'paid',
        date: '2026-07-15T00:00:00Z',
        downloadUrl: '#',
      },
      {
        id: 'inv-100',
        number: 'INV-2026-006',
        amount: 1499,
        currency: 'USD',
        status: 'paid',
        date: '2026-06-15T00:00:00Z',
        downloadUrl: '#',
      },
      {
        id: 'inv-099',
        number: 'INV-2026-005',
        amount: 1499,
        currency: 'USD',
        status: 'paid',
        date: '2026-05-15T00:00:00Z',
        downloadUrl: '#',
      },
    ],
  };

  private auditLogs: AuditLogEvent[] = [
    {
      id: 'aud-1',
      actorName: 'Sarah Jenkins',
      actorEmail: 'sarah.j@trotos.io',
      action: 'ROLE_ASSIGNED',
      category: 'admin',
      targetResource: 'User: Marcus Vance -> Ad Operations Specialist',
      ipAddress: '192.168.1.140',
      timestamp: '2026-07-30T14:35:00Z',
      status: 'success',
    },
    {
      id: 'aud-2',
      actorName: 'David Kalu',
      actorEmail: 'david.k@trotos.io',
      action: 'DEVICE_REBOOT',
      category: 'device',
      targetResource: 'Device: DEV-NY-091',
      ipAddress: '192.168.1.188',
      timestamp: '2026-07-30T12:46:00Z',
      status: 'success',
    },
    {
      id: 'aud-3',
      actorName: 'Elena Rostova',
      actorEmail: 'elena.r@trotos.io',
      action: 'PLAYLIST_PUBLISHED',
      category: 'content',
      targetResource: 'Playlist: Summer Promotional Loop v2.1',
      ipAddress: '192.168.2.14',
      timestamp: '2026-07-29T16:50:00Z',
      status: 'success',
    },
    {
      id: 'aud-4',
      actorName: 'Marcus Vance',
      actorEmail: 'marcus.v@trotos.io',
      action: 'CAMPAIGN_UPDATED',
      category: 'campaign',
      targetResource: 'Campaign: Nike Summer Blast 2026',
      ipAddress: '192.168.3.82',
      timestamp: '2026-07-28T11:20:00Z',
      status: 'success',
    },
    {
      id: 'aud-5',
      actorName: 'System Security',
      actorEmail: 'system@trotos.io',
      action: 'MFA_FAILED_ATTEMPT',
      category: 'auth',
      targetResource: 'User: Chloe Bennett',
      ipAddress: '45.132.18.9',
      timestamp: '2026-07-27T03:14:00Z',
      status: 'warning',
    },
  ];

  public getUsers(): User[] {
    return [...this.users];
  }

  public updateUserRole(userId: string, roleId: string, roleName: string): User | undefined {
    const user = this.users.find((u) => u.id === userId);
    if (user) {
      user.roleId = roleId;
      user.roleName = roleName;
    }
    return user;
  }

  public getRoles(): RoleTemplate[] {
    return [...this.roles];
  }

  public getRoleById(id: string): RoleTemplate | undefined {
    return this.roles.find((r) => r.id === id);
  }

  public saveRole(role: Omit<RoleTemplate, 'id' | 'createdAt' | 'updatedAt' | 'memberCount' | 'isSystem'> & { id?: string }): RoleTemplate {
    if (role.id) {
      const idx = this.roles.findIndex((r) => r.id === role.id);
      if (idx !== -1) {
        this.roles[idx] = {
          ...this.roles[idx],
          ...role,
          updatedAt: new Date().toISOString(),
        };
        return this.roles[idx];
      }
    }
    const newRole: RoleTemplate = {
      ...role,
      id: `role-${Date.now()}`,
      isSystem: false,
      memberCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.roles.push(newRole);
    return newRole;
  }

  public getOrganization(): OrganizationSettings {
    return { ...this.organization };
  }

  public updateOrganization(settings: Partial<OrganizationSettings>): OrganizationSettings {
    this.organization = { ...this.organization, ...settings };
    return this.organization;
  }

  public getBilling(): BillingDetails {
    return { ...this.billing };
  }

  public getAuditLogs(): AuditLogEvent[] {
    return [...this.auditLogs];
  }
}

export const mockAdminStore = new MockAdminStore();
