import { type ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';

export interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string | number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
  icon?: ReactNode;
  className?: string;
}

export function KPICard({ title, value, subtitle, trend, icon, className }: KPICardProps) {
  return (
    <div className={cn("p-5 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-level-1)]", className)}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-medium text-[var(--color-text-secondary)]">{title}</h3>
        {icon && (
          <div className="p-2 bg-[var(--color-background)] rounded-[var(--radius-md)] text-[var(--color-text-muted)]">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-2xl font-bold text-[var(--color-text-primary)]">{value}</span>
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">{subtitle}</p>
      )}

      {trend && (
        <div className="mt-4 flex items-center gap-1.5">
          <span 
            className={cn(
              "inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[var(--radius-sm)] text-xs font-medium",
              trend.direction === 'up' && "bg-[var(--color-success-light)] text-[var(--color-success)]",
              trend.direction === 'down' && "bg-[var(--color-danger-light)] text-[var(--color-danger)]",
              trend.direction === 'neutral' && "bg-[var(--color-background)] text-[var(--color-text-secondary)]"
            )}
          >
            {trend.direction === 'up' && <Icon icon={TrendingUp} size="sm" />}
            {trend.direction === 'down' && <Icon icon={TrendingDown} size="sm" />}
            {trend.direction === 'neutral' && <Icon icon={Minus} size="sm" />}
            {trend.value}
          </span>
          {trend.label && (
            <span className="text-xs text-[var(--color-text-muted)]">{trend.label}</span>
          )}
        </div>
      )}
    </div>
  );
}
