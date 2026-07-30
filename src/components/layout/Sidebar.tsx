import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { NAVIGATION_REGISTRY } from '@/core/navigation/navigation.registry';
import { usePermission } from '@/core/authorization/PermissionContext';
import { cn } from '@/utils/cn';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function Sidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  const { can } = usePermission();

  // Filter navigation entries dynamically by capability
  const visibleNav = NAVIGATION_REGISTRY.filter(
    (item) => !item.requiredPermission || can(item.requiredPermission)
  );

  // Group by category
  const categories = Array.from(new Set(visibleNav.map((item) => item.category)));

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[var(--color-surface)] border-r border-[var(--color-border)] text-[var(--color-text-primary)] transition-all duration-200">
      
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[var(--color-border)] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-lg shadow-sm">
            T
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-base leading-none text-[var(--color-text-primary)]">
                TrotOS
              </span>
              <span className="text-[10px] font-semibold text-[var(--color-text-muted)] tracking-wide uppercase mt-0.5">
                Mission Control
              </span>
            </div>
          )}
        </div>

        {/* Mobile Close */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-background)]"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {categories.map((category) => {
          const items = visibleNav.filter((item) => item.category === category);
          return (
            <div key={category} className="space-y-1">
              {!collapsed && (
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                  {category}
                </div>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.id}
                    to={item.route}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150',
                        isActive
                          ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)]',
                        collapsed && 'justify-center px-0'
                      )
                    }
                    title={collapsed ? item.title : undefined}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {!collapsed && <span>{item.title}</span>}
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer / TrotOS Engine Badge */}
      <div className="p-3 border-t border-[var(--color-border)] flex-shrink-0">
        {!collapsed ? (
          <div className="p-3 rounded-xl bg-[var(--color-background)] border border-[var(--color-border)] flex items-center gap-2.5">
            <Sparkles className="h-4 w-4 text-[var(--color-primary)] flex-shrink-0" />
            <div className="text-[11px]">
              <span className="font-semibold text-[var(--color-text-primary)] block">Engine Status</span>
              <span className="text-[var(--color-text-muted)] text-[10px]">Needle AI Active</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
          </div>
        )}

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center w-full mt-2 py-2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background)] rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'hidden lg:block h-screen sticky top-0 transition-all duration-200 z-30',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-64 z-50 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
