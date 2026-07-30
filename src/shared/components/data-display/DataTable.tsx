import { type ReactNode } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';
import { EmptyState } from './EmptyState';
import { LoadingSkeleton } from './LoadingSkeleton';
import { Pagination } from '../navigation/Pagination';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (row: T) => ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  emptyState?: ReactNode;
  
  // Sorting
  sortColumn?: keyof T | string;
  sortDirection?: 'asc' | 'desc';
  onSort?: (column: string) => void;
  
  // Pagination
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  
  // Actions
  onRowClick?: (row: T) => void;
  
  // Selection
  selectedRowKeys?: Set<string>;
  onSelectRow?: (key: string, selected: boolean) => void;
  onSelectAll?: (selected: boolean) => void;
  
  className?: string;
}

export function DataTable<T>({
  data,
  columns,
  keyExtractor,
  isLoading = false,
  emptyState,
  sortColumn,
  sortDirection,
  onSort,
  currentPage,
  totalPages,
  onPageChange,
  onRowClick,
  selectedRowKeys,
  onSelectRow,
  onSelectAll,
  className,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className={cn("w-full border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] overflow-hidden", className)}>
        <LoadingSkeleton type="table" rows={5} />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className={cn("w-full border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] p-8", className)}>
        {emptyState || <EmptyState title="No results found" description="There is no data to display in this table." />}
      </div>
    );
  }

  return (
    <div className={cn("w-full flex flex-col border border-[var(--color-border)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] overflow-hidden", className)}>
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="bg-[var(--color-background)] border-b border-[var(--color-border)] text-[var(--color-text-secondary)] font-medium">
            <tr>
              {selectedRowKeys && (
                <th className="px-4 py-3 pl-6 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    checked={data.length > 0 && selectedRowKeys.size === data.length}
                    ref={input => {
                      if (input) {
                        input.indeterminate = selectedRowKeys.size > 0 && selectedRowKeys.size < data.length;
                      }
                    }}
                    onChange={(e) => onSelectAll && onSelectAll(e.target.checked)}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((col, index) => {
                const isSorted = sortColumn && (sortColumn === col.accessorKey || sortColumn === col.header);
                
                return (
                  <th 
                    key={index}
                    className={cn(
                      "px-4 py-3 first:pl-6 last:pr-6",
                      col.sortable && "cursor-pointer hover:bg-[var(--color-border)]/30 transition-colors select-none"
                    )}
                    onClick={() => col.sortable && onSort && onSort(col.accessorKey as string || col.header)}
                  >
                    <div className="flex items-center gap-2">
                      {col.header}
                      {col.sortable && (
                        <span className={cn("text-[var(--color-text-muted)]", isSorted && "text-[var(--color-primary)]")}>
                          {isSorted && sortDirection === 'desc' ? (
                            <Icon icon={ChevronDown} size="sm" />
                          ) : isSorted && sortDirection === 'asc' ? (
                            <Icon icon={ChevronUp} size="sm" />
                          ) : (
                            <div className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {data.map((row) => (
              <tr 
                key={keyExtractor(row)} 
                className={cn(
                  "hover:bg-[var(--color-surface-hover)] transition-colors group",
                  onRowClick && "cursor-pointer",
                  selectedRowKeys?.has(keyExtractor(row)) && "bg-[var(--color-primary-light)]/20"
                )}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {onSelectRow && (
                  <td className="pl-6 pr-2 py-3.5" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      className="rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                      checked={selectedRowKeys?.has(keyExtractor(row)) || false}
                      onChange={(e) => onSelectRow(keyExtractor(row), e.target.checked)}
                      aria-label="Select row"
                    />
                  </td>
                )}
                {columns.map((col, index) => (
                  <td key={index} className="px-4 py-3.5 text-xs text-[var(--color-text-primary)] first:pl-6 last:pr-6 font-medium">
                    {col.cell ? col.cell(row) : (row[col.accessorKey as keyof T] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages && totalPages > 1 && onPageChange && (
        <div className="flex items-center justify-between px-6 py-3 border-t border-[var(--color-border)] bg-[var(--color-background)]">
          <span className="text-xs text-[var(--color-text-muted)]">
            Showing page {currentPage} of {totalPages}
          </span>
          <Pagination 
            currentPage={currentPage || 1} 
            totalPages={totalPages} 
            onPageChange={onPageChange} 
          />
        </div>
      )}
    </div>
  );
}
