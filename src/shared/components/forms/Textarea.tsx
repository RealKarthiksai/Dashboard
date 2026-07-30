import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'error' | 'success';
  fullWidth?: boolean;
}

const variantMap = {
  default: 'border-[var(--color-border)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
  error: 'border-[var(--color-danger)] focus:border-[var(--color-danger)] focus:ring-[var(--color-danger)]',
  success: 'border-[var(--color-success)] focus:border-[var(--color-success)] focus:ring-[var(--color-success)]',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', fullWidth = true, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'flex min-h-[80px] rounded-[var(--radius-md)] bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-shadow duration-[var(--animate-duration-fast)]',
          'border px-3 py-2 text-sm placeholder:text-[var(--color-text-muted)]',
          'focus:outline-none focus:ring-1',
          'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-background)]',
          'resize-y',
          fullWidth && 'w-full',
          variantMap[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';
