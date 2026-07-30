import { type ReactNode } from 'react';
import { Filter } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';


export interface FilterBarProps {
  search?: ReactNode;
  filters?: ReactNode;
  actions?: ReactNode;
  activeFilters?: ReactNode[]; // e.g. Array of <FilterChip />
  onClearFilters?: () => void;
  className?: string;
}

export function FilterBar({ search, filters, actions, activeFilters, onClearFilters, className }: FilterBarProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Top Row: Search, Dropdowns, and Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
          {search && <div className="w-full sm:w-80 shrink-0">{search}</div>}
          
          {filters && (
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-px h-6 bg-[var(--color-border)] mx-1" />
              <div className="flex items-center gap-2">
                <Icon icon={Filter} size="sm" className="text-[var(--color-text-muted)] ml-1" />
                {filters}
              </div>
            </div>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            {actions}
          </div>
        )}
      </div>

      {/* Bottom Row: Active Filter Chips */}
      {activeFilters && activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap animate-in fade-in slide-in-from-top-1">
          {activeFilters}
          {onClearFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs font-medium text-[var(--color-primary)] hover:underline ml-1 focus-ring rounded-sm outline-none"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
