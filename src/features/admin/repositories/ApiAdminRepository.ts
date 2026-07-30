import { httpClient, HttpClient } from '@/core/api/HttpClient';
import { ApiEndpoints } from '@/core/api/ApiEndpoints';
import type {
  User,
  RoleTemplate,
  OrganizationSettings,
  BillingDetails,
  AuditLogEvent,
} from '../data/types';
import type { IAdminRepository } from './AdminRepository';

export class ApiAdminRepository implements IAdminRepository {
  private client: HttpClient;

  constructor(client: HttpClient = httpClient) {
    this.client = client;
  }

  async getUsers(): Promise<User[]> {
    return this.client.get<User[]>(ApiEndpoints.ADMIN.USERS);
  }

  async updateUserRole(userId: string, roleId: string, roleName: string): Promise<User | undefined> {
    return this.client.put<User>(ApiEndpoints.ADMIN.USER_ROLE(userId), { roleId, roleName });
  }

  async getRoles(): Promise<RoleTemplate[]> {
    return this.client.get<RoleTemplate[]>(ApiEndpoints.ADMIN.ROLES);
  }

  async getRoleById(id: string): Promise<RoleTemplate | undefined> {
    return this.client.get<RoleTemplate>(ApiEndpoints.ADMIN.ROLE_DETAIL(id));
  }

  async saveRole(role: Omit<RoleTemplate, 'id' | 'createdAt' | 'updatedAt' | 'memberCount' | 'isSystem'> & { id?: string }): Promise<RoleTemplate> {
    if (role.id) {
      return this.client.put<RoleTemplate>(ApiEndpoints.ADMIN.ROLE_DETAIL(role.id), role);
    }
    return this.client.post<RoleTemplate>(ApiEndpoints.ADMIN.ROLES, role);
  }

  async getOrganization(): Promise<OrganizationSettings> {
    return this.client.get<OrganizationSettings>(ApiEndpoints.ADMIN.ORGANIZATION);
  }

  async updateOrganization(settings: Partial<OrganizationSettings>): Promise<OrganizationSettings> {
    return this.client.put<OrganizationSettings>(ApiEndpoints.ADMIN.ORGANIZATION, settings);
  }

  async getBilling(): Promise<BillingDetails> {
    return this.client.get<BillingDetails>(ApiEndpoints.ADMIN.BILLING);
  }

  async getAuditLogs(): Promise<AuditLogEvent[]> {
    return this.client.get<AuditLogEvent[]>(ApiEndpoints.ADMIN.AUDIT_LOGS);
  }
}
