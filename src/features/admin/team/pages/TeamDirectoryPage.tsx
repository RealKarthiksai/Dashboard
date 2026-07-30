import React, { useEffect, useState } from 'react';
import { adminRepository } from '../../repositories/AdminRepository';
import type { User, RoleTemplate } from '../../data/types';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { DataTable, type Column } from '@/shared/components/data-display/DataTable';
import { UserPlus, Shield, CheckCircle, Clock, XCircle, Edit2 } from 'lucide-react';

export const TeamDirectoryPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<RoleTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRoleId, setNewRoleId] = useState<string>('');

  const fetchData = async () => {
    setLoading(true);
    const [uData, rData] = await Promise.all([
      adminRepository.getUsers(),
      adminRepository.getRoles(),
    ]);
    setUsers(uData);
    setRoles(rData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRoleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !newRoleId) return;
    const targetRole = roles.find((r) => r.id === newRoleId);
    if (targetRole) {
      await adminRepository.updateUserRole(selectedUser.id, targetRole.id, targetRole.name);
      setSelectedUser(null);
      fetchData();
    }
  };

  const columns: Column<User>[] = [
    {
      header: 'Member Name',
      cell: (user: User) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold text-xs flex items-center justify-center border border-[var(--color-primary)]/20">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="font-semibold text-[var(--color-text-primary)]">{user.name}</div>
            <div className="text-xs text-[var(--color-text-muted)]">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: 'Assigned Role',
      cell: (user: User) => (
        <div className="flex items-center gap-1.5 font-medium text-xs text-[var(--color-text-primary)]">
          <Shield className="w-3.5 h-3.5 text-[var(--color-primary)]" />
          {user.roleName}
        </div>
      ),
    },
    {
      header: 'Status',
      cell: (user: User) => {
        const badges = {
          active: (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <CheckCircle className="w-3 h-3" /> Active
            </span>
          ),
          pending: (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Clock className="w-3 h-3" /> Invite Pending
            </span>
          ),
          suspended: (
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20">
              <XCircle className="w-3 h-3" /> Suspended
            </span>
          ),
        };
        return badges[user.status];
      },
    },
    {
      header: 'Last Login',
      cell: (user: User) =>
        new Date(user.lastLoginAt).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      header: 'Actions',
      cell: (user: User) => (
        <PermissionGate required={Permission.USERS.ROLES_UPDATE}>
          <button
            onClick={() => {
              setSelectedUser(user);
              setNewRoleId(user.roleId);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] transition-colors"
          >
            <Edit2 className="w-3 h-3 text-[var(--color-primary)]" />
            Edit Role
          </button>
        </PermissionGate>
      ),
    },
  ];

  return (
    <PermissionGate required={Permission.USERS.READ}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Team & User Directory</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Manage organization operators, assign permission role templates, and inspect active sessions.
            </p>
          </div>
          <PermissionGate required={Permission.USERS.UPDATE}>
            <button
              onClick={() => alert('Invite Operator modal triggered')}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <UserPlus className="w-4 h-4" />
              Invite Team Member
            </button>
          </PermissionGate>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-[var(--color-text-muted)]">
            Loading team directory...
          </div>
        ) : (
          <DataTable data={users} columns={columns} keyExtractor={(u) => u.id} />
        )}

        {/* Role Editing Drawer Modal */}
        {selectedUser && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl w-full max-w-md p-6 space-y-5 shadow-2xl">
              <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
                Assign Role to {selectedUser.name}
              </h3>

              <form onSubmit={handleRoleChange} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                    Select Role Template
                  </label>
                  <select
                    value={newRoleId}
                    onChange={(e) => setNewRoleId(e.target.value)}
                    className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                  >
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name} ({r.permissions.length} capabilities)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setSelectedUser(null)}
                    className="px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium text-sm hover:opacity-90"
                  >
                    Save Role Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PermissionGate>
  );
};
