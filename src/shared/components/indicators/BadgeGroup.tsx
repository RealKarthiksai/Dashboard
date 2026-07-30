import { type ReactNode, Children } from 'react';
import { cn } from '@/utils/cn';

export interface BadgeGroupProps {
  children: ReactNode;
  max?: number;
  className?: string;
}

export function BadgeGroup({ children, max, className }: BadgeGroupProps) {
  const allBadges = Children.toArray(children);
  const visibleBadges = max ? allBadges.slice(0, max) : allBadges;
  const hiddenCount = allBadges.length - visibleBadges.length;

  return (
    <div className={cn('flex flex-wrap items-center gap-1.5', className)}>
      {visibleBadges}
      {hiddenCount > 0 && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-[var(--color-background)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
          +{hiddenCount}
        </span>
      )}
    </div>
  );
}
