import { cn } from '@/utils/cn';

export interface LoadingSkeletonProps {
  type?: 'text' | 'card' | 'table' | 'avatar';
  rows?: number;
  className?: string;
}

export function LoadingSkeleton({ type = 'text', rows = 3, className }: LoadingSkeletonProps) {
  const pulseClass = "animate-pulse bg-[var(--color-border)] rounded-[var(--radius-sm)]";

  if (type === 'avatar') {
    return <div className={cn(pulseClass, 'w-10 h-10 rounded-full', className)} />;
  }

  if (type === 'card') {
    return (
      <div className={cn('p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)] space-y-3', className)}>
        <div className={cn(pulseClass, 'w-1/3 h-5')} />
        <div className={cn(pulseClass, 'w-full h-12')} />
        <div className={cn(pulseClass, 'w-2/3 h-4')} />
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className={cn('w-full', className)}>
        {/* Header skeleton */}
        <div className="flex gap-4 p-4 border-b border-[var(--color-border)] bg-[var(--color-background)]">
          <div className={cn(pulseClass, 'h-4 w-1/4')} />
          <div className={cn(pulseClass, 'h-4 w-1/4')} />
          <div className={cn(pulseClass, 'h-4 w-1/4')} />
          <div className={cn(pulseClass, 'h-4 w-1/4')} />
        </div>
        {/* Rows skeleton */}
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border-b border-[var(--color-border)] last:border-0">
            <div className={cn(pulseClass, 'h-4 w-1/4')} />
            <div className={cn(pulseClass, 'h-4 w-1/4')} />
            <div className={cn(pulseClass, 'h-4 w-1/4')} />
            <div className={cn(pulseClass, 'h-4 w-1/4')} />
          </div>
        ))}
      </div>
    );
  }

  // Default: text lines
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: rows }).map((_, i) => (
        <div 
          key={i} 
          className={cn(pulseClass, 'h-4')}
          style={{ width: i === rows - 1 && rows > 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  );
}
