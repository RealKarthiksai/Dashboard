import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';
import { Badge } from '@/shared/components/indicators/Badge';

export interface Option {
  label: string;
  value: string;
}

export interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = 'Select options...',
  disabled = false,
  className,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const removeOption = (e: React.MouseEvent, value: string) => {
    e.stopPropagation();
    onChange(selected.filter((v) => v !== value));
  };

  const selectedOptions = options.filter((opt) => selected.includes(opt.value));

  return (
    <div className={cn('relative w-full', className)} ref={containerRef}>
      <div
        className={cn(
          'min-h-[40px] w-full flex items-center justify-between flex-wrap gap-2 px-3 py-1.5 rounded-[var(--radius-md)] border bg-[var(--color-surface)] transition-shadow duration-[var(--animate-duration-fast)] cursor-pointer',
          isOpen ? 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]' : 'border-[var(--color-border)]',
          disabled && 'opacity-50 cursor-not-allowed bg-[var(--color-background)]'
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) setIsOpen(!isOpen);
          }
        }}
      >
        <div className="flex flex-wrap gap-1.5 flex-1">
          {selectedOptions.length === 0 ? (
            <span className="text-sm text-[var(--color-text-muted)] mt-0.5">{placeholder}</span>
          ) : (
            selectedOptions.map((opt) => (
              <Badge key={opt.value} variant="primary" size="sm" className="gap-1 rounded-sm">
                {opt.label}
                <button
                  type="button"
                  onClick={(e) => removeOption(e, opt.value)}
                  className="hover:text-[var(--color-danger)] focus:outline-none"
                >
                  <Icon icon={X} size="sm" />
                </button>
              </Badge>
            ))
          )}
        </div>
        <Icon icon={ChevronDown} size="sm" className={cn("text-[var(--color-text-muted)] transition-transform", isOpen && "rotate-180")} />
      </div>

      {isOpen && (
        <div className="absolute z-[var(--z-dropdown)] w-full mt-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-level-2)] max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-1">
          {options.length === 0 ? (
            <div className="p-3 text-sm text-[var(--color-text-muted)] text-center">No options available</div>
          ) : (
            <div className="p-1">
              {options.map((opt) => {
                const isSelected = selected.includes(opt.value);
                return (
                  <div
                    key={opt.value}
                    className={cn(
                      'flex items-center justify-between px-3 py-2 text-sm rounded-md cursor-pointer hover:bg-[var(--color-background)]',
                      isSelected && 'bg-[var(--color-primary-light)] text-[var(--color-primary)] font-medium hover:bg-[var(--color-primary-light)]'
                    )}
                    onClick={() => toggleOption(opt.value)}
                  >
                    {opt.label}
                    {isSelected && <Icon icon={Check} size="sm" variant="primary" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
