import { useState } from 'react';
import { KeyRound, X, Check, Minus } from 'lucide-react';
import { usePermission } from '@/core/authorization/PermissionContext';
import { Permission } from '@/core/authorization/permissions';

export function PermissionDebugPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentRole, userPermissions, can } = usePermission();

  // Extract all permission keys
  const allPermissions = Object.values(Permission).flatMap((group) => Object.values(group));

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--color-primary)] text-white text-xs font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          <KeyRound className="h-4 w-4" />
          <span>Debug RBAC ({currentRole})</span>
        </button>
      ) : (
        <div className="w-80 max-h-[480px] rounded-[16px] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="p-3 bg-[var(--color-background)] border-b border-[var(--color-border)] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-primary)]">
              <KeyRound className="h-4 w-4 text-[var(--color-primary)]" />
              <span>Permission Capabilities Matrix</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-surface)]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Active Role */}
          <div className="px-4 py-2 bg-[var(--color-primary-light)] text-[var(--color-primary)] text-xs font-bold flex items-center justify-between border-b border-[var(--color-border)]">
            <span>Role: {currentRole}</span>
            <span>{userPermissions.length} Active Grants</span>
          </div>

          {/* Permissions List */}
          <div className="p-3 overflow-y-auto space-y-1.5 flex-1 text-xs">
            {allPermissions.map((perm) => {
              const active = can(perm as any);
              return (
                <div
                  key={perm}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-md border ${
                    active
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'bg-rose-500/5 border-rose-500/10 text-rose-500 opacity-60 font-mono'
                  }`}
                >
                  <span>{perm}</span>
                  {active ? <Check className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
