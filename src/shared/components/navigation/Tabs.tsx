import { createContext, useContext, useState, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps {
  defaultValue: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, onValueChange, children, className }: TabsProps) {
  const [activeTab, setActiveTabInternal] = useState(defaultValue);

  const setActiveTab = (value: string) => {
    setActiveTabInternal(value);
    onValueChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export interface TabsListProps {
  children: ReactNode;
  className?: string;
  variant?: 'underline' | 'pills';
}

Tabs.List = function TabsList({ children, className, variant = 'underline' }: TabsListProps) {
  return (
    <div
      role="tablist"
      className={cn(
        'flex items-center group',
        variant === 'underline' && 'border-b border-[var(--color-border)] gap-6',
        variant === 'pills' && 'gap-2 p-1 bg-[var(--color-background)] rounded-[var(--radius-md)]',
        className
      )}
      data-variant={variant}
    >
      {children}
    </div>
  );
};

export interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

Tabs.Trigger = function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs.Trigger must be used within Tabs');

  const isActive = context.activeTab === value;

  return (
    <button
      role="tab"
      aria-selected={isActive}
      onClick={() => context.setActiveTab(value)}
      className={cn(
        'relative font-medium text-sm transition-colors focus-ring outline-none',
        // Group styling based on parent variant (using a pseudo-variant trick)
        'group-data-[variant=underline]:pb-3 group-data-[variant=underline]:-mb-px group-data-[variant=underline]:border-b-2',
        isActive
          ? 'text-[var(--color-primary)] border-[var(--color-primary)]'
          : 'text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)]',
        // For pills variant, we can just style it directly by checking a global or passing context, but let's use direct classes that apply when active
        className
      )}
    >
      {children}
    </button>
  );
};

export interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

Tabs.Content = function TabsContent({ value, children, className }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs.Content must be used within Tabs');

  if (context.activeTab !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn('mt-4 animate-in fade-in duration-[var(--animate-duration-standard)]', className)}
    >
      {children}
    </div>
  );
};
