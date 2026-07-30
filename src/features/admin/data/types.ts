import type { PermissionKey } from '@/core/authorization/permissions';

export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleName: string;
  status: 'active' | 'pending' | 'suspended';
  avatarUrl?: string;
  lastLoginAt: string;
  createdAt: string;
}

export interface RoleTemplate {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  memberCount: number;
  permissions: PermissionKey[];
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationSettings {
  id: string;
  name: string;
  domain: string;
  type: string;
  logoUrl?: string;
  timezone: string;
  ssoEnabled: boolean;
  ssoProvider?: 'Okta' | 'Azure AD' | 'Google Workspace';
  securityPolicy: {
    requireMfa: boolean;
    sessionTimeoutMinutes: number;
    passwordExpirationDays: number;
  };
}

export interface Invoice {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: 'paid' | 'open' | 'void' | 'uncollectible';
  date: string;
  downloadUrl: string;
}

export interface BillingDetails {
  subscriptionPlan: string;
  planPriceMonthly: number;
  billingCycle: 'monthly' | 'annual';
  deviceLicensesAllocated: number;
  deviceLicensesUsed: number;
  paymentMethod: {
    brand: string;
    last4: string;
    expMonth: number;
    expYear: number;
  };
  nextBillingDate: string;
  invoices: Invoice[];
}

export interface AuditLogEvent {
  id: string;
  actorName: string;
  actorEmail: string;
  action: string;
  category: 'auth' | 'device' | 'content' | 'campaign' | 'admin' | 'billing';
  targetResource: string;
  ipAddress: string;
  timestamp: string;
  status: 'success' | 'failed' | 'warning';
}
