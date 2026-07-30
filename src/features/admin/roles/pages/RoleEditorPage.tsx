import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminRepository } from '../../repositories/AdminRepository';
import { Permission, type PermissionKey } from '@/core/authorization/permissions';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { ArrowLeft, Save, CheckCircle2, Circle } from 'lucide-react';

interface PermissionGroup {
  module: string;
  permissions: { key: PermissionKey; label: string; description: string }[];
}

const ALL_PERMISSION_GROUPS: PermissionGroup[] = [
  {
    module: 'Operations Fleet',
    permissions: [
      { key: Permission.DEVICES.READ, label: 'View Devices & Fleet Status', description: 'Access operational fleet lists and real-time device telemetry.' },
      { key: Permission.DEVICES.CREATE, label: 'Register New Devices', description: 'Enroll physical screens into TrotOS tenant network.' },
      { key: Permission.DEVICES.UPDATE, label: 'Modify Device Settings', description: 'Update device tags, groups, network configs, and orientation.' },
      { key: Permission.DEVICES.COMMAND, label: 'Dispatch Remote Commands', description: 'Reboot, restart software, fetch logs, or update firmware.' },
      { key: Permission.DEVICES.DELETE, label: 'De-register Devices', description: 'Remove physical devices permanently from the fleet.' },
    ],
  },
  {
    module: 'Content & Scheduling',
    permissions: [
      { key: Permission.CONTENT.READ, label: 'View Media & Playlists', description: 'Browse media library, playlists, and schedules.' },
      { key: Permission.CONTENT.CREATE, label: 'Upload & Create Media', description: 'Upload media files and construct playlist sequences.' },
      { key: Permission.CONTENT.UPDATE, label: 'Edit Playlists & Schedules', description: 'Modify playlist items, drag-and-drop order, and calendar rules.' },
      { key: Permission.CONTENT.DELETE, label: 'Delete Media & Playlists', description: 'Remove assets or playlists permanently.' },
    ],
  },
  {
    module: 'Marketing & Ad Campaigns',
    permissions: [
      { key: Permission.CAMPAIGNS.READ, label: 'View Campaigns & Sponsors', description: 'Access advertiser lists and campaign flight overview.' },
      { key: Permission.CAMPAIGNS.CREATE, label: 'Create Ad Campaigns', description: 'Configure sponsor ad campaigns, budgets, and impression goals.' },
      { key: Permission.CAMPAIGNS.UPDATE, label: 'Allocate Share of Voice', description: 'Assign campaigns to target device fleets and prioritize flight.' },
      { key: Permission.CAMPAIGNS.DELETE, label: 'Delete Campaigns', description: 'Archive or permanently delete sponsor campaigns.' },
    ],
  },
  {
    module: 'Analytics & Reporting',
    permissions: [
      { key: Permission.ANALYTICS.READ, label: 'View Insights & Metrics', description: 'Access fleet health, proof of play, and operator analytics.' },
      { key: Permission.ANALYTICS.EXPORT, label: 'Export Analytics Reports', description: 'Download CSV and PDF audit reports.' },
    ],
  },
  {
    module: 'Billing & Subscriptions',
    permissions: [
      { key: Permission.BILLING.READ, label: 'View Billing & Invoices', description: 'Inspect subscription tiers, license usage, and invoices.' },
      { key: Permission.BILLING.UPDATE, label: 'Update Payment Methods', description: 'Modify credit cards and subscription tiers.' },
    ],
  },
  {
    module: 'User & Team Administration',
    permissions: [
      { key: Permission.USERS.READ, label: 'View Team Directory', description: 'Inspect organization users, active sessions, and roles.' },
      { key: Permission.USERS.UPDATE, label: 'Invite & Manage Users', description: 'Invite new operators or change user profile status.' },
      { key: Permission.USERS.ROLES_UPDATE, label: 'Manage Role Templates', description: 'Create and edit capability permission matrixes.' },
    ],
  },
];

export const RoleEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const isNew = !id || id === 'new';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<PermissionKey[]>([]);
  const [isSystem, setIsSystem] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      if (isNew) {
        setName('New Custom Role');
        setDescription('Custom capability role for specific operator responsibilities.');
        setSelectedPermissions([Permission.DEVICES.READ, Permission.CONTENT.READ]);
        setLoading(false);
        return;
      }

      setLoading(true);
      const role = await adminRepository.getRoleById(id);
      if (role) {
        setName(role.name);
        setDescription(role.description);
        setSelectedPermissions(role.permissions);
        setIsSystem(role.isSystem);
      }
      setLoading(false);
    };

    fetchRole();
  }, [id, isNew]);

  const togglePermission = (key: PermissionKey) => {
    if (isSystem) return; // System roles are read-only
    setSelectedPermissions((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSystem) return;

    await adminRepository.saveRole({
      id: isNew ? undefined : id,
      name,
      description,
      permissions: selectedPermissions,
    });

    navigate('/dashboard/admin/roles');
  };

  return (
    <PermissionGate required={Permission.USERS.READ}>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/dashboard/admin/roles')}
          className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Roles
        </button>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-[var(--color-text-muted)]">
            Loading role configuration...
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
                  {isNew ? 'Create Custom Role' : `Edit Role: ${name}`}
                </h1>
                <p className="text-sm text-[var(--color-text-muted)] mt-1">
                  Configure capability matrix permissions granted to users with this role.
                </p>
              </div>

              {!isSystem && (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  <Save className="w-4 h-4" />
                  Save Role Matrix
                </button>
              )}
            </div>

            {/* General Info */}
            <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                  Role Name
                </label>
                <input
                  type="text"
                  required
                  disabled={isSystem}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  disabled={isSystem}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)] disabled:opacity-60"
                />
              </div>
            </div>

            {/* Permission Capability Matrix */}
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
                Granted Capability Permissions ({selectedPermissions.length})
              </h2>

              {ALL_PERMISSION_GROUPS.map((group) => (
                <div
                  key={group.module}
                  className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] space-y-4"
                >
                  <h3 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider text-[var(--color-primary)]">
                    {group.module}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.permissions.map((p) => {
                      const isGranted = selectedPermissions.includes(p.key);
                      return (
                        <div
                          key={p.key}
                          onClick={() => togglePermission(p.key)}
                          className={`p-3 rounded-lg border transition-all cursor-pointer flex items-start gap-3 ${
                            isGranted
                              ? 'bg-[var(--color-primary-light)]/30 border-[var(--color-primary)]/50'
                              : 'bg-[var(--color-background)] border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
                          } ${isSystem ? 'cursor-default' : ''}`}
                        >
                          <div className="mt-0.5">
                            {isGranted ? (
                              <CheckCircle2 className="w-5 h-5 text-[var(--color-primary)]" />
                            ) : (
                              <Circle className="w-5 h-5 text-[var(--color-text-muted)]" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                              {p.label}
                            </div>
                            <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
                              {p.description}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </form>
        )}
      </div>
    </PermissionGate>
  );
};
