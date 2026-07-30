import { forwardRef, type InputHTMLAttributes } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';

export interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  onClear?: () => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const sizeMap = {
  sm: 'h-8 text-xs',
  md: 'h-10 text-sm',
  lg: 'h-12 text-base',
};

const iconSizeMap = {
  sm: 'sm' as const,
  md: 'sm' as const,
  lg: 'md' as const,
};

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, size = 'md', fullWidth = true, onClear, value, onChange, ...props }, ref) => {
    return (
      <div className={cn('relative flex items-center', fullWidth ? 'w-full' : 'inline-flex')}>
        <div className="absolute left-3 flex items-center pointer-events-none">
          <Icon icon={Search} size={iconSizeMap[size]} className="text-[var(--color-text-muted)]" />
        </div>
        
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          className={cn(
            'flex rounded-[var(--radius-md)] bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-shadow duration-[var(--animate-duration-fast)]',
            'border border-[var(--color-border)] placeholder:text-[var(--color-text-muted)]',
            'focus:outline-none focus:ring-1 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--color-background)]',
            'pl-9',
            (value && onClear) ? 'pr-9' : 'pr-3',
            fullWidth && 'w-full',
            sizeMap[size],
            className
          )}
          {...props}
        />
        
        {value && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-2 p-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background)] transition-colors focus-ring"
            aria-label="Clear search"
          >
            <Icon icon={X} size="sm" />
          </button>
        )}
      </div>
    );
  }
);
SearchInput.displayName = 'SearchInput';
