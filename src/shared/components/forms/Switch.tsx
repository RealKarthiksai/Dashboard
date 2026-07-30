import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: {
    track: 'w-7 h-4',
    thumb: 'w-3 h-3 data-[checked=true]:translate-x-3',
  },
  md: {
    track: 'w-9 h-5',
    thumb: 'w-4 h-4 data-[checked=true]:translate-x-4',
  },
  lg: {
    track: 'w-11 h-6',
    thumb: 'w-5 h-5 data-[checked=true]:translate-x-5',
  },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, size = 'md', checked, disabled, onChange, ...props }, ref) => {
    return (
      <label
        className={cn(
          'relative inline-flex items-center cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            'bg-[var(--color-border)] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[var(--color-primary-light)] rounded-full peer peer-checked:bg-[var(--color-primary)] transition-colors duration-[var(--animate-duration-fast)]',
            sizeMap[size].track
          )}
        />
        <span
          data-checked={checked}
          className={cn(
            'absolute left-0.5 top-0.5 bg-white border border-gray-300 rounded-full transition-transform duration-[var(--animate-duration-fast)]',
            sizeMap[size].thumb
          )}
        />
      </label>
    );
  }
);
Switch.displayName = 'Switch';
