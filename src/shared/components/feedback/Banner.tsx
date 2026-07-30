import { X, Info, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';

export interface BannerProps {
  title: string;
  description?: string;
  variant?: 'info' | 'warning' | 'danger';
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
  className?: string;
}

const variantMap = {
  info: {
    bg: 'bg-[var(--color-primary-light)] dark:bg-[var(--color-primary)]/10',
    border: 'border-[var(--color-primary)]/20',
    icon: Info,
    iconVariant: 'primary' as const,
  },
  warning: {
    bg: 'bg-[var(--color-warning-light)] dark:bg-[var(--color-warning)]/10',
    border: 'border-[var(--color-warning)]/20',
    icon: AlertTriangle,
    iconVariant: 'warning' as const,
  },
  danger: {
    bg: 'bg-[var(--color-danger-light)] dark:bg-[var(--color-danger)]/10',
    border: 'border-[var(--color-danger)]/20',
    icon: AlertCircle,
    iconVariant: 'danger' as const,
  },
};

export function Banner({
  title,
  description,
  variant = 'info',
  action,
  onDismiss,
  className,
}: BannerProps) {
  const config = variantMap[variant];
  const BannerIcon = config.icon;

  return (
    <div
      role="banner"
      className={cn(
        'relative w-full px-4 py-3 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b',
        config.bg,
        config.border,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon icon={BannerIcon} variant={config.iconVariant} size="lg" className="mt-0.5 sm:mt-0" />
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{title}</h3>
          {description && (
            <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">{description}</p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto ml-10 sm:ml-0">
        {action && (
          <button
            onClick={action.onClick}
            className="text-xs font-semibold hover:underline focus-ring px-2 py-1 rounded"
            style={{ color: `var(--color-${config.iconVariant})` }}
          >
            {action.label}
          </button>
        )}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1.5 rounded-md text-[var(--color-text-muted)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-ring"
            aria-label="Dismiss banner"
          >
            <Icon icon={X} size="sm" />
          </button>
        )}
      </div>
    </div>
  );
}
