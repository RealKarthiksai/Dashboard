import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
      {breadcrumbs.map((item) => (
        <div key={item.path} className="flex items-center gap-1.5">
          {item.isLast ? (
            <span className="font-semibold text-[var(--color-text-primary)]" aria-current="page">
              {item.label}
            </span>
          ) : (
            <>
              <Link to={item.path} className="hover:text-[var(--color-primary)] transition-colors">
                {item.label}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-[var(--color-text-muted)]" />
            </>
          )}
        </div>
      ))}
    </nav>
  );
}
