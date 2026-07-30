import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
}

const variantMap = {
  default: 'bg-[var(--color-border)]/50 text-[var(--color-text-secondary)] border-[var(--color-border)]',
  primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary)] border-[var(--color-primary)]/20',
  success: 'bg-[var(--color-success-light)] text-[var(--color-success)] border-[var(--color-success)]/20',
  warning: 'bg-[var(--color-warning-light)] text-[var(--color-warning)] border-[var(--color-warning)]/20',
  danger: 'bg-[var(--color-danger-light)] text-[var(--color-danger)] border-[var(--color-danger)]/20',
  info: 'bg-[var(--color-info-light)] text-[var(--color-info)] border-[var(--color-info)]/20',
};

const sizeMap = {
  sm: 'px-1.5 py-0.5 text-[10px]',
  md: 'px-2.5 py-0.5 text-[11px]',
  lg: 'px-3 py-1 text-xs',
};

export function Badge({ className, variant = 'default', size = 'md', children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-semibold tracking-wide border',
        sizeMap[size],
        variantMap[variant],
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
