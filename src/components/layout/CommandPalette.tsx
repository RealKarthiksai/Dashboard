import { useState, useEffect } from 'react';
import { Search, X, Command, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { NAVIGATION_REGISTRY } from '@/core/navigation/navigation.registry';
import { usePermission } from '@/core/authorization/PermissionContext';
import { useWorkspace } from '@/core/workspace/WorkspaceContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { can } = usePermission();
  const { workspaceConfig } = useWorkspace();

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
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-xl bg-[var(--color-level-2)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        
        {/* Input Bar */}
        <div className="p-4 border-b border-[var(--color-border)] flex items-center gap-3">
          <Search className="h-5 w-5 text-[var(--color-primary)] shrink-0" />
          <input
            type="text"
            placeholder={`Search across ${workspaceConfig.label}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full py-1 text-sm bg-transparent border-none text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-surface-hover)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 custom-scrollbar">
          {visibleCommands.length === 0 ? (
            <div className="p-8 text-center text-xs text-[var(--color-text-muted)]">
              No matching authorized results found.
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
                  className="w-full flex items-center justify-between p-2.5 rounded-xl text-left hover:bg-[var(--color-level-4)] group transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[var(--color-level-3)] border border-[var(--color-border)] text-[var(--color-primary)]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors block">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)]">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 group-hover:text-[var(--color-primary)] transition-all transform group-hover:translate-x-1" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[var(--color-level-1)] border-t border-[var(--color-border)] flex items-center justify-between text-[11px] text-[var(--color-text-muted)] font-mono">
          <div className="flex items-center gap-2">
            <Command className="h-3 w-3" />
            <span>Active Workspace: {workspaceConfig.label}</span>
          </div>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
