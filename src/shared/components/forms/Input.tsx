import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
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

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', size = 'md', fullWidth = true, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'flex rounded-[var(--radius-md)] bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-shadow duration-[var(--animate-duration-fast)]',
          'border placeholder:text-[var(--color-text-muted)]',
          'focus:outline-none focus:ring-1',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-background)]',
          fullWidth && 'w-full',
          sizeMap[size],
          variantMap[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
