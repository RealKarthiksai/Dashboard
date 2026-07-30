import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';
import type { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isCollapsed?: boolean;
}

export function SidebarItem({ to, icon: Icon, label, isCollapsed = false }: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      title={isCollapsed ? label : undefined}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group mb-1 font-medium text-xs select-none',
          isCollapsed ? 'justify-center px-2' : '',
          {
            'text-[var(--color-primary)] bg-[var(--color-primary-light)] font-semibold': isActive,
            'text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-background)]':
              !isActive,
          }
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            aria-hidden="true"
            className={cn(
              'h-4 w-4 flex-shrink-0 transition-colors',
              isActive
                ? 'text-[var(--color-primary)]'
                : 'text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]'
            )}
          />
          {!isCollapsed && <span className="truncate">{label}</span>}
        </>
      )}
    </NavLink>
  );
}
