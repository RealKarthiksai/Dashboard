import { Loader2 } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'muted' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
  label?: string; // Optional screen reader / visible label
}

export function Spinner({ size = 'md', variant = 'primary', className, label }: SpinnerProps) {
  return (
    <div className={cn('inline-flex flex-col items-center justify-center gap-2', className)}>
      <Icon 
        icon={Loader2} 
        size={size} 
        variant={variant} 
        className="animate-spin" 
      />
      {label && (
        <span className="text-xs font-medium text-[var(--color-text-secondary)] animate-pulse">
          {label}
        </span>
      )}
      {!label && <span className="sr-only">Loading...</span>}
    </div>
  );
}
