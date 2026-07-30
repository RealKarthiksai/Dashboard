import { type ReactNode } from 'react';
import { Search } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center p-8 sm:p-12 text-center', className)}>
      <div className="w-16 h-16 bg-[var(--color-background)] rounded-full flex items-center justify-center mb-4 text-[var(--color-text-muted)] border border-[var(--color-border)]">
        {icon ? icon : <Icon icon={Search} size="xl" />}
      </div>
      
      <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-1.5">{title}</h3>
      
      {description && (
        <p className="text-sm text-[var(--color-text-secondary)] max-w-sm mx-auto mb-6">
          {description}
        </p>
      )}
      
      {action && <div>{action}</div>}
    </div>
  );
}
