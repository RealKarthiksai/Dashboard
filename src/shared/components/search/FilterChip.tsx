import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';

export interface FilterChipProps {
  label: string;
  value: string;
  onRemove: () => void;
  className?: string;
}

export function FilterChip({ label, value, onRemove, className }: FilterChipProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 pl-2.5 pr-1 py-1 rounded-[var(--radius-full)] text-xs font-medium bg-[var(--color-background)] border border-[var(--color-border)] text-[var(--color-text-primary)]',
        className
      )}
    >
      <span className="text-[var(--color-text-secondary)]">{label}:</span>
      <span>{value}</span>
      <button
        type="button"
        onClick={onRemove}
        className="p-0.5 ml-0.5 rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-border)] hover:text-[var(--color-text-primary)] transition-colors focus-ring outline-none"
        aria-label={`Remove filter ${label}: ${value}`}
      >
        <Icon icon={X} size="sm" />
      </button>
    </div>
  );
}
