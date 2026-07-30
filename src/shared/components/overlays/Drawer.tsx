import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Icon } from '@/shared/icons/Icon';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: 'right' | 'left';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const sizeMap = {
  sm: 'max-w-xs',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full',
};

const positionClasses = {
  right: 'right-0 top-0 h-full border-l slide-in-from-right-full',
  left: 'left-0 top-0 h-full border-r slide-in-from-left-full',
};

export function Drawer({ isOpen, onClose, children, position = 'right', size = 'md', className }: DrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      
      // Basic focus trap
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;
        
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    // Auto focus first element
    const focusable = drawerRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    (focusable?.[0] as HTMLElement)?.focus();

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-overlay)]">
      {/* Backdrop */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-[var(--animate-duration-standard)]"
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Drawer Panel */}
      <div 
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        className={cn(
          'absolute w-full bg-[var(--color-surface)] shadow-[var(--shadow-modal)] border-[var(--color-border)] flex flex-col',
          'animate-in duration-[var(--animate-duration-standard)] ease-[var(--animate-ease-drawer)]',
          positionClasses[position],
          sizeMap[size],
          className
        )}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 p-2 rounded-full text-[var(--color-text-muted)] hover:bg-[var(--color-background)] hover:text-[var(--color-text-primary)] transition-colors focus-ring"
          aria-label="Close drawer"
        >
          <Icon icon={X} size="md" />
        </button>
        {children}
      </div>
    </div>
  );
}

Drawer.Header = function DrawerHeader({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-5 border-b border-[var(--color-border)] bg-[var(--color-surface)] shrink-0 pr-14', className)}>
      {children}
    </div>
  );
};

Drawer.Body = function DrawerBody({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-6 overflow-y-auto flex-1', className)}>
      {children}
    </div>
  );
};

Drawer.Footer = function DrawerFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn('px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-background)] shrink-0 flex items-center gap-3', className)}>
      {children}
    </div>
  );
};
