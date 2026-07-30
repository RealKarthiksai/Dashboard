import { useNavigate } from 'react-router-dom';
import { QUICK_ACTIONS_REGISTRY } from '../widgets/quick-actions.registry';
import { usePermission } from '@/core/authorization/PermissionContext';

export function QuickActionsGrid() {
  const navigate = useNavigate();
  const { can } = usePermission();

  // Dynamically filter quick actions based on registry permission metadata
  const visibleActions = QUICK_ACTIONS_REGISTRY.filter(
    (action) => !action.permission || can(action.permission)
  );

  if (visibleActions.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">
          Quick Actions
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {visibleActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => navigate(action.path)}
              className={`p-4 rounded-[14px] border text-left transition-all duration-150 flex flex-col justify-between group cursor-pointer ${
                action.primary
                  ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-xs hover:bg-[var(--color-primary-hover)]'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] border-[var(--color-border)] hover:bg-[var(--color-primary-light)] hover:border-[var(--color-primary)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    action.primary
                      ? 'bg-white/20 text-white'
                      : 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold leading-tight">{action.label}</div>
                <div
                  className={`text-[11px] mt-0.5 ${
                    action.primary ? 'text-white/80' : 'text-[var(--color-text-muted)]'
                  }`}
                >
                  {action.description}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
