import { AlertOctagon, RefreshCw } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';
import { Button } from '@/components/ui/Button';

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'An error occurred while loading this content. Please try again.',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 text-center border border-dashed border-[var(--color-danger)]/20 rounded-[var(--radius-lg)] bg-[var(--color-danger-light)]/50', className)}>
      <div className="w-12 h-12 rounded-full bg-[var(--color-danger-light)] text-[var(--color-danger)] flex items-center justify-center mb-4">
        <Icon icon={AlertOctagon} size="xl" variant="danger" />
      </div>
      <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-1.5">{title}</h3>
      <p className="text-xs text-[var(--color-text-secondary)] max-w-sm mb-5">{description}</p>
      
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry} className="gap-2 text-[var(--color-danger)] hover:bg-[var(--color-danger-light)]">
          <Icon icon={RefreshCw} size="sm" variant="danger" />
          Try Again
        </Button>
      )}
    </div>
  );
}
