import { ShieldAlert } from 'lucide-react';
import { usePermission } from '@/core/authorization/PermissionContext';
import { ROLE_TEMPLATES, type RoleName } from '@/core/authorization/roles/templates';

const ALL_ROLES: RoleName[] = Object.keys(ROLE_TEMPLATES) as RoleName[];

export function DevelopmentRoleSimulator() {
  const { currentRole, setRole } = usePermission();

  return (
    <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold">
      <ShieldAlert className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Role Sim:</span>
      <select
        value={currentRole}
        onChange={(e) => setRole(e.target.value as RoleName)}
        className="bg-transparent font-semibold border-none focus:outline-none cursor-pointer text-xs"
      >
        {ALL_ROLES.map((role) => (
          <option key={role} value={role} className="bg-[var(--color-surface)] text-[var(--color-text-primary)]">
            {role.replace(/_/g, ' ')}
          </option>
        ))}
      </select>
    </div>
  );
}
