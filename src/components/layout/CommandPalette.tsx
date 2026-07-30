import { useState, useEffect } from 'react';
import { Search, X, Command } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_REGISTRY } from '@/core/navigation/navigation.registry';
import { usePermission } from '@/core/authorization/PermissionContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { can } = usePermission();

  // Filter commands dynamically by query & permissions
  const visibleCommands = NAVIGATION_REGISTRY.filter(
    (item) => !item.requiredPermission || can(item.requiredPermission)
  ).filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-xl rounded-[16px] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl overflow-hidden flex flex-col">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 border-b border-[var(--color-border)]">
          <Search className="h-4 w-4 text-[var(--color-text-muted)] mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Type a command or search modules..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-4 text-sm bg-transparent border-none text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[var(--color-text-muted)] hover:bg-[var(--color-background)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {visibleCommands.length === 0 ? (
            <div className="p-8 text-center text-xs text-[var(--color-text-muted)]">
              No permission-authorized commands found.
            </div>
          ) : (
            visibleCommands.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.route);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-[var(--color-primary-light)] group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-primary)]" />
                    <span className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)]">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>

        {/* Keyboard shortcut legend */}
        <div className="px-4 py-2 bg-[var(--color-background)] border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-text-muted)]">
          <div className="flex items-center gap-1">
            <Command className="h-3 w-3" />
            <span>K to toggle</span>
          </div>
          <span>Permission Filtered Search</span>
        </div>

      </div>
    </div>
  );
}
