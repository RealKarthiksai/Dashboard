import { useState, useEffect, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface ContextMenuItem {
  label: ReactNode;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}

export interface ContextMenuProps {
  children: ReactNode;
  items: ContextMenuItem[];
  className?: string;
}

export function ContextMenu({ children, items, className }: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleClickOutside() {
      if (isOpen) setIsOpen(false);
    }
    
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' && isOpen) setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  return (
    <>
      <div onContextMenu={handleContextMenu} className={className}>
        {children}
      </div>

      {isOpen && (
        <div
          className="fixed z-[var(--z-overlay)] min-w-[200px] py-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-level-3)] animate-in fade-in zoom-in-95 duration-[var(--animate-duration-fast)]"
          style={{ top: position.y, left: position.x }}
          role="menu"
        >
          {items.map((item, index) => (
            <button
              key={index}
              disabled={item.disabled}
              onClick={(e) => {
                e.stopPropagation();
                if (!item.disabled) {
                  item.onClick();
                  setIsOpen(false);
                }
              }}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors focus-ring outline-none',
                item.disabled && 'opacity-50 cursor-not-allowed',
                item.danger 
                  ? 'text-[var(--color-danger)] hover:bg-[var(--color-danger-light)] focus:bg-[var(--color-danger-light)]' 
                  : 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface-hover)] focus:bg-[var(--color-surface-hover)]'
              )}
              role="menuitem"
            >
              {item.icon && <span className="shrink-0">{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
