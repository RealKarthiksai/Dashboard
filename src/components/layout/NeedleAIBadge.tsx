import React from 'react';
import { Cpu } from 'lucide-react';

export const TrotAssistantBadge: React.FC = () => {
  return (
    <div className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm hover:border-[var(--color-primary)]/40 transition-colors">
      <div className="relative flex items-center justify-center">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping absolute opacity-75" />
        <span className="w-2 h-2 rounded-full bg-indigo-500 relative" />
      </div>
      <div className="flex items-center gap-1.5 text-xs">
        <Cpu className="w-3.5 h-3.5 text-indigo-400" />
        <span className="font-semibold text-[var(--color-text-primary)]">Trot Assistant</span>
        <span className="text-[var(--color-text-muted)]">•</span>
        <span className="text-[var(--color-text-muted)]">Monitoring 187 signals</span>
        <span className="text-[var(--color-text-muted)]">•</span>
        <span className="text-emerald-400 font-medium">Optimal</span>
      </div>
    </div>
  );
};

export const NeedleAIBadge = TrotAssistantBadge;
