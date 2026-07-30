import { type ReactNode, useState, useRef } from 'react';
import { cn } from '@/utils/cn';

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ content, children, position = 'top', className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  
  // Basic positions (this could be improved with Floating UI/Popper in a real scenario)
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 -mt-1 border-t-[var(--color-surface)] border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 -mb-1 border-b-[var(--color-surface)] border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 -ml-1 border-l-[var(--color-surface)] border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 -mr-1 border-r-[var(--color-surface)] border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <div 
      className="relative inline-block" 
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      ref={triggerRef}
    >
      {children}
      
      {isVisible && (
        <div 
          role="tooltip"
          className={cn(
            'absolute z-[var(--z-popover)] w-max max-w-xs px-2.5 py-1.5 text-xs font-medium text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-sm)] shadow-[var(--shadow-level-2)]',
            'animate-in fade-in zoom-in-95 duration-[var(--animate-duration-fast)]',
            positionClasses[position],
            className
          )}
        >
          {content}
          <div className={cn('absolute w-0 h-0 border-[5px]', arrowClasses[position])} />
        </div>
      )}
    </div>
  );
}
