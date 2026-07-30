import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface SegmentedControlOption {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 'h-8 px-2 text-xs',
  md: 'h-10 px-3 text-sm',
  lg: 'h-12 px-4 text-base',
};

export function SegmentedControl({
  options,
  value,
  onChange,
  size = 'md',
  fullWidth = false,
  className,
}: SegmentedControlProps) {
  return (
    <div
      role="radiogroup"
      className={cn(
        'inline-flex items-center p-1 bg-[var(--color-background)] rounded-[var(--radius-md)] border border-[var(--color-border)]',
        fullWidth && 'w-full flex',
        className
      )}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative flex items-center justify-center font-medium transition-all duration-[var(--animate-duration-fast)] focus-ring rounded-[var(--radius-sm)]',
              fullWidth && 'flex-1',
              sizeMap[size],
              isSelected
                ? 'bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[var(--shadow-level-1)]'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)]'
            )}
          >
            {option.icon && <span className="mr-2">{option.icon}</span>}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
