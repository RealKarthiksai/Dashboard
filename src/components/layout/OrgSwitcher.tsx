import { useState, useRef, useEffect } from 'react';
import { Building2, Check, ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useOrganization } from '@/features/admin/organization/context/OrganizationContext';

export function OrgSwitcher({ isCollapsed = false }: { isCollapsed?: boolean }) {
  const { currentOrg, availableOrgs, switchOrganization } = useOrganization();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:bg-[var(--color-background)] transition-colors text-left focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]',
          isCollapsed && 'justify-center p-2'
        )}
        aria-label="Switch organization"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 rounded-md bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center flex-shrink-0 font-bold text-xs">
            {currentOrg.name.charAt(0)}
          </div>
          {!isCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[var(--color-text-primary)] truncate leading-tight">
                {currentOrg.name}
              </p>
              <p className="text-[10px] text-[var(--color-text-muted)] truncate leading-tight">
                {currentOrg.type}
              </p>
            </div>
          )}
        </div>
        {!isCollapsed && <ChevronDown className="h-4 w-4 text-[var(--color-text-muted)] flex-shrink-0" />}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1.5 w-64 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[12px] shadow-[var(--shadow-level-2)] z-50 p-1 space-y-0.5 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-2 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
            Switch Organization
          </div>
          {availableOrgs.map((org) => (
            <button
              key={org.id}
              onClick={() => {
                switchOrganization(org.id);
                setIsOpen(false);
              }}
              className={cn(
                'w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors text-left',
                org.id === currentOrg.id
                  ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)]'
                  : 'text-[var(--color-text-primary)] hover:bg-[var(--color-background)]'
              )}
            >
              <div className="flex items-center gap-2 min-w-0">
                <Building2 className="h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]" />
                <div className="truncate">
                  <div className="font-semibold">{org.name}</div>
                  <div className="text-[10px] text-[var(--color-text-muted)]">{org.type}</div>
                </div>
              </div>
              {org.id === currentOrg.id && <Check className="h-4 w-4 text-[var(--color-primary)] flex-shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
