import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TrendChipProps {
  value: string;
  label?: string;
  direction?: 'up' | 'down' | 'neutral';
  isPositive?: boolean;
}

export function TrendChip({ value, label, direction = 'up', isPositive = true }: TrendChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border',
        isPositive
          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
      )}
    >
      {direction === 'up' && <TrendingUp className="h-3 w-3" />}
      {direction === 'down' && <TrendingDown className="h-3 w-3" />}
      {direction === 'neutral' && <Minus className="h-3 w-3" />}
      <span>{value}</span>
      {label && <span className="opacity-75 font-normal">{label}</span>}
    </span>
  );
}
