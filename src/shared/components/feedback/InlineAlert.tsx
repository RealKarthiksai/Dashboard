import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';

export interface InlineAlertProps {
  title: string;
  description?: string;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  onDismiss?: () => void;
  className?: string;
}

const variantMap = {
  info: {
    bg: 'bg-[var(--color-info-light)]',
    border: 'border-[var(--color-info)]/20',
    text: 'text-[var(--color-info)]',
    icon: Info,
  },
  success: {
    bg: 'bg-[var(--color-success-light)]',
    border: 'border-[var(--color-success)]/20',
    text: 'text-[var(--color-success)]',
    icon: CheckCircle2,
  },
  warning: {
    bg: 'bg-[var(--color-warning-light)]',
    border: 'border-[var(--color-warning)]/20',
    text: 'text-[var(--color-warning)]',
    icon: AlertTriangle,
  },
  danger: {
    bg: 'bg-[var(--color-danger-light)]',
    border: 'border-[var(--color-danger)]/20',
    text: 'text-[var(--color-danger)]',
    icon: AlertCircle,
  },
};

export function InlineAlert({
  title,
  description,
  variant = 'info',
  onDismiss,
  className,
}: InlineAlertProps) {
  const config = variantMap[variant];
  const AlertIcon = config.icon;

  return (
    <div
      className={cn(
        'relative flex items-start p-3 sm:p-4 rounded-[var(--radius-md)] border',
        config.bg,
        config.border,
        className
      )}
      role="alert"
    >
      <Icon icon={AlertIcon} variant={variant} size="lg" className="mr-3 mt-0.5" />
      <div className="flex-1">
        <h4 className={cn('text-sm font-semibold', config.text)}>{title}</h4>
        {description && (
          <p className="mt-1 text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-4 p-1 rounded-md text-[var(--color-text-muted)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus-ring"
          aria-label="Dismiss alert"
        >
          <Icon icon={X} size="sm" />
        </button>
      )}
    </div>
  );
}
