import { cn } from '@/utils/cn';

export interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'unknown';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const statusMap = {
  online: 'bg-[var(--color-success)]',
  offline: 'bg-[var(--color-danger)]',
  warning: 'bg-[var(--color-warning)]',
  unknown: 'bg-[var(--color-text-muted)]',
};

const pulseMap = {
  online: 'bg-[var(--color-success)]',
  offline: 'bg-[var(--color-danger)]',
  warning: 'bg-[var(--color-warning)]',
  unknown: 'bg-[var(--color-text-muted)]',
};

const sizeMap = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2.5 h-2.5',
  lg: 'w-3.5 h-3.5',
};

export function StatusIndicator({ status, label, size = 'md', className }: StatusIndicatorProps) {
  return (
    <div className={cn("inline-flex items-center gap-2", className)}>
      <div className="relative flex items-center justify-center">
        {status !== 'unknown' && status !== 'offline' && (
          <span className={cn("absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping", pulseMap[status])} />
        )}
        <span className={cn("relative inline-flex rounded-full", sizeMap[size], statusMap[status])} />
      </div>
      {label && (
        <span className="text-sm font-medium text-[var(--color-text-primary)]">
          {label}
        </span>
      )}
    </div>
  );
}
