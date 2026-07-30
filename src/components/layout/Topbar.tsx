import { Menu, Search, Bell, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Breadcrumbs } from './Breadcrumbs';
import { OrgSwitcher } from './OrgSwitcher';
import { DevelopmentRoleSimulator } from '../dev/DevelopmentRoleSimulator';

interface TopbarProps {
  onOpenMobileSidebar: () => void;
  onOpenCommandPalette: () => void;
  onOpenNotifications: () => void;
}

export function Topbar({
  onOpenMobileSidebar,
  onOpenCommandPalette,
  onOpenNotifications,
}: TopbarProps) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-4 flex items-center justify-between sticky top-0 z-20 transition-colors">
      
      {/* Left: Mobile Drawer Trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-[var(--color-text-muted)] hover:bg-[var(--color-background)]"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Breadcrumbs />
      </div>

      {/* Right: Actions, Role Simulator, Theme Toggle, Profile */}
      <div className="flex items-center gap-3">
        
        {/* Development Role Simulator */}
        <DevelopmentRoleSimulator />

        {/* Organization Switcher */}
        <div className="hidden md:block">
          <OrgSwitcher />
        </div>

        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-all cursor-pointer"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Search...</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md font-semibold">
            ⌘K
          </kbd>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-background)] transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-primary)] ring-2 ring-[var(--color-surface)]" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-background)] transition-colors cursor-pointer"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* User Avatar & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-[var(--color-border)]">
          <div className="w-8 h-8 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold text-xs flex items-center justify-center border border-[var(--color-primary)]/20">
            {user?.name ? user.name.charAt(0) : 'J'}
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-rose-500/10 transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

      </div>

    </header>
  );
}
