import { Menu, Search, Bell, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { Breadcrumbs } from './Breadcrumbs';
import { DevelopmentRoleSimulator } from '../dev/DevelopmentRoleSimulator';
import { NeedleAIBadge } from './NeedleAIBadge';

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
    <header className="h-16 bg-[var(--color-level-1)] border-b border-[var(--color-border)] px-4 flex items-center justify-between sticky top-0 z-20 transition-colors">
      
      {/* Left: Mobile Drawer Trigger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Breadcrumbs />
      </div>

      {/* Right: Trot Assistant Badge, Command Palette, Role Simulator, Theme Toggle, Profile */}
      <div className="flex items-center gap-3">
        
        {/* Live Trot Assistant Presence Badge */}
        <NeedleAIBadge />

        {/* Development Role Simulator */}
        <DevelopmentRoleSimulator />

        {/* Command Palette Trigger */}
        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-level-2)] text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-primary)] transition-all cursor-pointer shadow-xs"
        >
          <Search className="h-3.5 w-3.5 text-[var(--color-primary)]" />
          <span className="hidden sm:inline">Search (Devices, Playlists, Campaigns)...</span>
          <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] font-mono bg-[var(--color-level-3)] border border-[var(--color-border)] rounded-md font-semibold text-[var(--color-text-primary)]">
            ⌘K
          </kbd>
        </button>

        {/* Notification Bell */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--color-primary)] ring-2 ring-[var(--color-level-1)]" />
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
        >
          {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
        </button>

        {/* User Avatar & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-[var(--color-border)]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center border border-indigo-400/30 shadow-sm">
            {user?.name ? user.name.charAt(0) : 'J'}
          </div>
          <button
            onClick={logout}
            className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>

      </div>

    </header>
  );
}
