import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { CommandPalette } from './CommandPalette';
import { NotificationPanel } from './NotificationPanel';
import { PermissionDebugPanel } from '../dev/PermissionDebugPanel';
import { WorkspaceProvider } from '@/core/workspace/WorkspaceContext';

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <WorkspaceProvider>
      <div className="min-h-screen flex bg-[var(--color-background)] font-sans antialiased selection:bg-[var(--color-primary-light)]">
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--color-primary)] focus:text-white focus:rounded-xl focus:shadow-lg focus:outline-none"
        >
          Skip to main content
        </a>

        {/* Dynamic Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Main Viewport Container */}
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar
            onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
            onOpenCommandPalette={() => setCommandPaletteOpen(true)}
            onOpenNotifications={() => setNotificationsOpen(true)}
          />

          <main id="main-content" className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
            <Outlet />
          </main>
        </div>

        {/* Global Modals & Overlays */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
        />

        <NotificationPanel
          isOpen={notificationsOpen}
          onClose={() => setNotificationsOpen(false)}
        />

        {/* Floating Permission Debug Panel */}
        <PermissionDebugPanel />
      </div>
    </WorkspaceProvider>
  );
}
