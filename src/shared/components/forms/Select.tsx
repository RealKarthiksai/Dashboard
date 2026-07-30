import { forwardRef, type SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const sizeMap = {
  sm: 'h-8 px-2 text-xs',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-base',
};

const variantMap = {
  default: 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
  error: 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]',
  success: 'border-[var(--color-success)] focus:border-[var(--color-success)] focus:ring-[var(--color-success)]',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant = 'default', size = 'md', fullWidth = true, children, ...props }, ref) => {
    return (
      <div className={cn('relative', fullWidth ? 'w-full' : 'inline-block')}>
        <select
          ref={ref}
          className={cn(
            'appearance-none flex rounded-[var(--radius-md)] bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-shadow duration-[var(--animate-duration-fast)]',
            'border placeholder:text-[var(--color-text-muted)]',
            'focus:outline-none focus:ring-1',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-background)]',
            fullWidth && 'w-full',
            sizeMap[size],
            variantMap[variant],
            'pr-8', // space for chevron
            className
          )}
          {...props}
        >
          {children}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <Icon icon={ChevronDown} size="sm" className="text-[var(--color-text-muted)]" />
        </div>
      </div>
    );
  }
);
Select.displayName = 'Select';
