import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  description?: ReactNode;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  description,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex justify-between items-baseline">
        <label
          htmlFor={htmlFor}
          className="text-sm font-semibold text-[var(--color-text-primary)]"
        >
          {label}
          {required && <span className="text-[var(--color-danger)] ml-1">*</span>}
        </label>
      </div>
      
      {description && (
        <p className="text-xs text-[var(--color-text-secondary)] -mt-1 mb-1">
          {description}
        </p>
      )}
      
      <div className="relative w-full">
        {children}
      </div>
      
      {error && (
        <p className="text-xs font-medium text-[var(--color-danger)] animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
