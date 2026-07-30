import { type ReactNode } from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-2 text-sm', className)}>
      <div className="flex items-center text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors">
        <Icon icon={Home} size="sm" />
      </div>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={index} className="flex items-center space-x-2">
            <Icon icon={ChevronRight} size="sm" className="text-[var(--color-text-muted)]" />
            {isLast || !item.href ? (
              <span className="font-semibold text-[var(--color-text-primary)] cursor-default" aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:underline focus-ring rounded-sm transition-colors"
              >
                {item.label}
              </a>
            )}
          </div>
        );
      })}
    </nav>
  );
}
