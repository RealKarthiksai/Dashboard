import type { LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

export interface IconProps {
  icon: LucideIcon;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'muted' | 'success' | 'warning' | 'danger' | 'info';
}

const sizeMap = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
  xl: 'h-6 w-6',
};

const variantMap = {
  default: 'text-[var(--color-text-primary)]',
  primary: 'text-[var(--color-primary)]',
  muted: 'text-[var(--color-text-muted)]',
  success: 'text-[var(--color-success)]',
  warning: 'text-[var(--color-warning)]',
  danger: 'text-[var(--color-danger)]',
  info: 'text-[var(--color-info)]',
};

export function Icon({ icon: LucideComponent, className, size = 'md', variant = 'default' }: IconProps) {
  return (
    <LucideComponent
      className={cn(
        'shrink-0', // Prevent shrinking in flex layouts
        sizeMap[size],
        variantMap[variant],
        className
      )}
      strokeWidth={2} // Normalizing stroke width globally
    />
  );
}
