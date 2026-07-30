import { X, Check } from 'lucide-react';
import { NOTIFICATION_REGISTRY } from '@/core/notifications/notification.registry';
import { usePermission } from '@/core/authorization/PermissionContext';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const { can } = usePermission();

  // Dynamically filter notifications based on user's active capabilities
  const visibleNotifications = NOTIFICATION_REGISTRY.filter(
    (n) => !n.permission || can(n.permission)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[var(--color-surface)] border-l border-[var(--color-border)] shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      
      {/* Drawer Header */}
      <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
        <div>
          <h2 className="text-sm font-bold text-[var(--color-text-primary)]">Notifications</h2>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            {visibleNotifications.filter((n) => n.unread).length} Unread Alerts
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-background)]"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {visibleNotifications.length === 0 ? (
          <div className="p-8 text-center text-xs text-[var(--color-text-muted)]">
            No authorized notifications for your current active permissions.
          </div>
        ) : (
          visibleNotifications.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`p-3 rounded-xl border text-xs space-y-1.5 transition-all ${
                  item.unread
                    ? 'bg-[var(--color-primary-light)]/40 border-[var(--color-primary)]/30'
                    : 'bg-[var(--color-background)] border-[var(--color-border)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                    <span className="font-bold text-[var(--color-text-primary)] truncate">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--color-text-muted)] font-mono">
                    {item.time}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                  {item.message}
                </p>
                <div className="flex items-center justify-between pt-1 text-[10px]">
                  <span className="font-semibold text-[var(--color-text-muted)] uppercase">
                    {item.category}
                  </span>
                  {item.unread && (
                    <span className="text-[var(--color-primary)] font-semibold flex items-center gap-0.5">
                      <Check className="h-3 w-3" /> New
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-background)] flex items-center justify-between text-xs">
        <button className="text-[var(--color-primary)] font-semibold hover:underline">
          Mark all as read
        </button>
        <span className="text-[10px] text-[var(--color-text-muted)]">Permission Filtered</span>
      </div>

    </div>
  );
}
