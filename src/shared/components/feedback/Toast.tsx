import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';

export interface ToastProps {
  title: string;
  description?: string;
  variant?: 'success' | 'danger' | 'info';
  onDismiss?: () => void;
  className?: string;
  isVisble?: boolean;
}

const variantMap = {
  success: {
    icon: CheckCircle2,
    iconVariant: 'success' as const,
  },
  danger: {
    icon: AlertCircle,
    iconVariant: 'danger' as const,
  },
  info: {
    icon: Info,
    iconVariant: 'info' as const,
  },
};

export function Toast({
  title,
  description,
  variant = 'info',
  onDismiss,
  className,
  isVisble = true,
}: ToastProps) {
  if (!isVisble) return null;

  const config = variantMap[variant];
  const ToastIcon = config.icon;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-[var(--radius-md)] bg-[var(--color-surface)] shadow-[var(--shadow-level-3)] border border-[var(--color-border)]',
        'animate-in slide-in-from-bottom-5 fade-in duration-[var(--animate-duration-standard)] ease-[var(--animate-ease-standard)]',
        className
      )}
    >
      <div className="p-4 flex items-start gap-3">
        <Icon icon={ToastIcon} variant={config.iconVariant} size="lg" className="mt-0.5" />
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h4>
          {description && (
            <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{description}</p>
          )}
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="shrink-0 p-1 rounded-md text-[var(--color-text-muted)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-ring"
            aria-label="Close toast"
          >
            <Icon icon={X} size="sm" />
          </button>
        )}
      </div>
    </div>
  );
}
