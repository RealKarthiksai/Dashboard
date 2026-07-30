import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border',
        {
          'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20': variant === 'success',
          'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20': variant === 'warning',
          'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20': variant === 'danger',
          'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20': variant === 'info',
          'bg-[var(--color-border)]/50 text-[var(--color-text-secondary)] border-[var(--color-border)]': variant === 'default',
        },
        className
      )}
      {...props}
    />
  );
}
