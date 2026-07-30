import React from 'react';

export const PageLoadingFallback: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] w-full p-8 space-y-4">
      <div className="w-10 h-10 border-4 border-[var(--color-primary)]/20 border-t-[var(--color-primary)] rounded-full animate-spin" />
      <div className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider animate-pulse">
        Loading module resources...
      </div>
    </div>
  );
};
