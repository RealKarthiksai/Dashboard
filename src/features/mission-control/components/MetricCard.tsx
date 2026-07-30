import type { ReactNode } from 'react';
import { TrendChip } from './TrendChip';

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
  trendValue?: string;
  trendLabel?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  isPositive?: boolean;
}

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trendValue,
  trendLabel,
  trendDirection = 'up',
  isPositive = true,
}: MetricCardProps) {
  return (
    <div className="p-5 rounded-[16px] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-level-1)] flex flex-col justify-between space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
          {title}
        </span>
        {icon && <div className="text-[var(--color-text-muted)]">{icon}</div>}
      </div>

      <div>
        <div className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
          {value}
        </div>
        {subtitle && (
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{subtitle}</p>
        )}
      </div>

      {trendValue && (
        <div className="pt-1">
          <TrendChip
            value={trendValue}
            label={trendLabel}
            direction={trendDirection}
            isPositive={isPositive}
          />
        </div>
      )}
    </div>
  );
}
