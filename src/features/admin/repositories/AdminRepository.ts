import { mockAdminStore, MockAdminStore } from '../data/MockAdminStore';
import type {
  User,
  RoleTemplate,
  OrganizationSettings,
  BillingDetails,
  AuditLogEvent,
} from '../data/types';
import { ApiConfig } from '@/core/api/ApiConfig';
import { ApiAdminRepository } from './ApiAdminRepository';

export interface IAdminRepository {
  getUsers(): Promise<User[]>;
  updateUserRole(userId: string, roleId: string, roleName: string): Promise<User | undefined>;
  getRoles(): Promise<RoleTemplate[]>;
  getRoleById(id: string): Promise<RoleTemplate | undefined>;
  saveRole(role: Omit<RoleTemplate, 'id' | 'createdAt' | 'updatedAt' | 'memberCount' | 'isSystem'> & { id?: string }): Promise<RoleTemplate>;
  getOrganization(): Promise<OrganizationSettings>;
  updateOrganization(settings: Partial<OrganizationSettings>): Promise<OrganizationSettings>;
  getBilling(): Promise<BillingDetails>;
  getAuditLogs(): Promise<AuditLogEvent[]>;
}

export class MockAdminRepository implements IAdminRepository {
  private store: MockAdminStore;

  constructor(store: MockAdminStore = mockAdminStore) {
    this.store = store;
  }

  async getUsers(): Promise<User[]> {
    return this.store.getUsers();
  }

  async updateUserRole(userId: string, roleId: string, roleName: string): Promise<User | undefined> {
    return this.store.updateUserRole(userId, roleId, roleName);
  }

  async getRoles(): Promise<RoleTemplate[]> {
    return this.store.getRoles();
  }

  async getRoleById(id: string): Promise<RoleTemplate | undefined> {
    return this.store.getRoleById(id);
  }

  async saveRole(role: Omit<RoleTemplate, 'id' | 'createdAt' | 'updatedAt' | 'memberCount' | 'isSystem'> & { id?: string }): Promise<RoleTemplate> {
    return this.store.saveRole(role);
  }

  async getOrganization(): Promise<OrganizationSettings> {
    return this.store.getOrganization();
  }

  async updateOrganization(settings: Partial<OrganizationSettings>): Promise<OrganizationSettings> {
    return this.store.updateOrganization(settings);
  }

  async getBilling(): Promise<BillingDetails> {
    return this.store.getBilling();
  }

  async getAuditLogs(): Promise<AuditLogEvent[]> {
    return this.store.getAuditLogs();
  }
}

export const adminRepository: IAdminRepository = ApiConfig.useMockData
  ? new MockAdminRepository()
  : new ApiAdminRepository();
