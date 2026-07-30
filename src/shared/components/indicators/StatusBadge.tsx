import React from 'react';

export type StatusType = 'healthy' | 'monitoring' | 'warning' | 'critical' | 'online' | 'offline';

interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'md' }) => {
  const configs: Record<
    StatusType,
    { symbol: string; text: string; bg: string; color: string; border: string }
  > = {
    healthy: {
      symbol: '●',
      text: label || 'Healthy',
      bg: 'bg-emerald-500/10',
      color: 'text-emerald-400',
      border: 'border-emerald-500/20',
    },
    online: {
      symbol: '●',
      text: label || 'Online',
      bg: 'bg-emerald-500/10',
      color: 'text-emerald-400',
      border: 'border-emerald-500/20',
    },
    monitoring: {
      symbol: '◐',
      text: label || 'Monitoring',
      bg: 'bg-cyan-500/10',
      color: 'text-cyan-400',
      border: 'border-cyan-500/20',
    },
    warning: {
      symbol: '▲',
      text: label || 'Warning',
      bg: 'bg-amber-500/10',
      color: 'text-amber-400',
      border: 'border-amber-500/20',
    },
    critical: {
      symbol: '■',
      text: label || 'Critical',
      bg: 'bg-rose-500/10',
      color: 'text-rose-400',
      border: 'border-rose-500/20',
    },
    offline: {
      symbol: '■',
      text: label || 'Offline',
      bg: 'bg-rose-500/10',
      color: 'text-rose-400',
      border: 'border-rose-500/20',
    },
  };

  const cfg = configs[status] || configs.monitoring;
  const isSm = size === 'sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${cfg.bg} ${cfg.color} ${cfg.border} ${
        isSm ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <span className="font-mono text-[10px] leading-none">{cfg.symbol}</span>
      <span>{cfg.text}</span>
    </span>
  );
};
