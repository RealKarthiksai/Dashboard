import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Sparkles } from 'lucide-react';
import { NAVIGATION_REGISTRY } from '@/core/navigation/navigation.registry';
import { NAVIGATION_PRESETS } from '@/core/navigation/navigation.presets';
import { useWorkspace } from '@/core/workspace/WorkspaceContext';
import { OrgSwitcher } from './OrgSwitcher';
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
  const { activeWorkspace, workspaceConfig } = useWorkspace();

  // Resolve active workspace navigation preset
  const preset = NAVIGATION_PRESETS[activeWorkspace] || NAVIGATION_PRESETS.OWNER;

  // Build lookup dictionary for NavigationItems
  const navById = Object.fromEntries(NAVIGATION_REGISTRY.map((item) => [item.id, item]));

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[var(--color-level-1)] border-r border-[var(--color-border)] text-[var(--color-text-primary)] transition-all duration-200 select-none">
      
      {/* Brand & Organization Header */}
      <div className="p-3 border-b border-[var(--color-border)] flex-shrink-0 space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-extrabold text-base shadow-[var(--shadow-glow)]">
              T
            </div>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-sm leading-none text-[var(--color-text-primary)]">
                  TrotOS
                </span>
                <span className="text-[9px] font-bold text-[var(--color-primary)] tracking-widest uppercase mt-1">
                  {workspaceConfig.label}
                </span>
              </div>
            )}
          </div>

          {/* Mobile Close */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Organization Switcher */}
        <OrgSwitcher isCollapsed={collapsed} />
      </div>

      {/* Navigation Links Rendered from Workspace Preset */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
        {preset.map((section, secIdx) => {
          const validItems = section.items.map((id) => navById[id]).filter(Boolean);
          if (validItems.length === 0) return null;

          return (
            <div key={secIdx} className="space-y-1">
              {secIdx > 0 && <div className="my-3 border-t border-[var(--color-border)]/50" />}
              {!collapsed && section.label && (
                <div className="px-3 text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-muted)] mb-2">
                  {section.label}
                </div>
              )}
              {validItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.id}
                    to={item.route}
                    onClick={onCloseMobile}
                    className={({ isActive }) =>
                      cn(
                        'relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-180 group',
                        isActive
                          ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold shadow-sm scale-[1.01]'
                          : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] hover:-translate-y-[1px]',
                        collapsed && 'justify-center px-0'
                      )
                    }
                    title={collapsed ? item.title : undefined}
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <div className="absolute left-0 w-1 h-5 rounded-full bg-[var(--color-primary)] shadow-[var(--shadow-glow)] animate-in fade-in zoom-in-75 duration-180" />
                        )}
                        <Icon className={cn('h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110', isActive ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]')} />
                        {!collapsed && <span className="truncate">{item.title}</span>}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer / Trot Assistant Status & Collapse Toggle */}
      <div className="p-3 border-t border-[var(--color-border)] flex-shrink-0 space-y-2">
        {!collapsed ? (
          <div className="p-3 rounded-xl bg-[var(--color-level-2)] border border-[var(--color-border)] flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 absolute -top-0.5 -right-0.5 animate-pulse" />
              </div>
              <div className="text-[11px] min-w-0">
                <span className="font-semibold text-[var(--color-text-primary)] block truncate">Trot Assistant</span>
                <span className="text-[var(--color-text-muted)] text-[10px] truncate block">{workspaceConfig.statusLine}</span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 shrink-0">
              LIVE
            </span>
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <Sparkles className="h-4 w-4 text-[var(--color-primary)]" />
          </div>
        )}

        {/* Desktop Collapse Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex items-center justify-center w-full py-2 text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] rounded-xl transition-colors"
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
          'hidden lg:block h-screen sticky top-0 transition-all duration-250 ease-out z-30',
          collapsed ? 'w-[72px]' : 'w-[296px]'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-[296px] z-50 animate-in slide-in-from-left duration-250">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
