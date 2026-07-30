import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  // Simple pagination logic for demonstration (omitting complex ellipsis logic for brevity)
  const renderPages = () => {
    const pages = [];
    const maxVisible = 5;
    
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);
    
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(
        <button key={1} onClick={() => onPageChange(1)} className={pageClass(currentPage === 1)}>1</button>
      );
      if (start > 2) {
        pages.push(<span key="start-ellipsis" className="px-2 text-[var(--color-text-muted)]"><Icon icon={MoreHorizontal} size="sm" /></span>);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button key={i} onClick={() => onPageChange(i)} className={pageClass(currentPage === i)} aria-current={currentPage === i ? 'page' : undefined}>
          {i}
        </button>
      );
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push(<span key="end-ellipsis" className="px-2 text-[var(--color-text-muted)]"><Icon icon={MoreHorizontal} size="sm" /></span>);
      }
      pages.push(
        <button key={totalPages} onClick={() => onPageChange(totalPages)} className={pageClass(currentPage === totalPages)}>{totalPages}</button>
      );
    }
    
    return pages;
  };

  const pageClass = (isActive: boolean) => cn(
    'min-w-[32px] h-8 flex items-center justify-center rounded-[var(--radius-md)] text-sm font-medium transition-colors focus-ring',
    isActive 
      ? 'bg-[var(--color-primary)] text-[var(--color-text-inverse)]' 
      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'
  );

  return (
    <nav aria-label="Pagination" className={cn('flex items-center space-x-1', className)}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'p-1.5 rounded-[var(--radius-md)] transition-colors focus-ring',
          currentPage === 1 
            ? 'text-[var(--color-text-muted)] cursor-not-allowed' 
            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'
        )}
        aria-label="Previous page"
      >
        <Icon icon={ChevronLeft} size="md" />
      </button>
      
      {renderPages()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'p-1.5 rounded-[var(--radius-md)] transition-colors focus-ring',
          currentPage === totalPages 
            ? 'text-[var(--color-text-muted)] cursor-not-allowed' 
            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'
        )}
        aria-label="Next page"
      >
        <Icon icon={ChevronRight} size="md" />
      </button>
    </nav>
  );
}
