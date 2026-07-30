import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminRepository } from '../../repositories/AdminRepository';
import type { RoleTemplate } from '../../data/types';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { Shield, Plus, Lock, Users, ChevronRight } from 'lucide-react';

export const RoleListPage: React.FC = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<RoleTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRoles = async () => {
    setLoading(true);
    const data = await adminRepository.getRoles();
    setRoles(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <PermissionGate required={Permission.USERS.READ}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Role Templates & Capabilities</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Construct capability-based RBAC roles, inspect granted permissions, and audit operator access levels.
            </p>
          </div>
          <PermissionGate required={Permission.USERS.ROLES_UPDATE}>
            <button
              onClick={() => navigate('/dashboard/admin/roles/new')}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Build Custom Role
            </button>
          </PermissionGate>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-[var(--color-text-muted)]">
            Loading role templates...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => navigate(`/dashboard/admin/roles/${role.id}`)}
                className="bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/50 transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-lg bg-[var(--color-primary-light)] text-[var(--color-primary)] border border-[var(--color-primary)]/20">
                      <Shield className="w-5 h-5" />
                    </div>
                    {role.isSystem ? (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider bg-[var(--color-surface-hover)] px-2 py-0.5 rounded border border-[var(--color-border)]">
                        <Lock className="w-3 h-3" /> System Role
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        Custom Role
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {role.name}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 line-clamp-2">
                      {role.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[var(--color-border)] flex items-center justify-between text-xs text-[var(--color-text-muted)]">
                  <div className="flex items-center gap-1.5 font-medium">
                    <Users className="w-3.5 h-3.5" />
                    {role.memberCount} Operators
                  </div>
                  <div className="flex items-center gap-1 font-semibold text-[var(--color-primary)]">
                    {role.permissions.length} Capabilities
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PermissionGate>
  );
};
