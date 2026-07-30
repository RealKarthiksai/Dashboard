import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Monitor, PlaySquare, Megaphone, BarChart, Users, Settings, Command } from 'lucide-react';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  route: string;
  icon: React.ReactNode;
}

const COMMAND_ITEMS: CommandItem[] = [
  { id: 'c-1', title: 'Device Fleet Manager', category: 'Operations', route: '/dashboard/operations/devices', icon: <Monitor className="w-4 h-4 text-blue-400" /> },
  { id: 'c-2', title: 'Real-Time Telemetry & Monitoring', category: 'Operations', route: '/dashboard/operations/monitoring', icon: <Monitor className="w-4 h-4 text-emerald-400" /> },
  { id: 'c-3', title: 'Media Library & Assets', category: 'Content', route: '/dashboard/content/media', icon: <PlaySquare className="w-4 h-4 text-purple-400" /> },
  { id: 'c-4', title: '3-Pane Playlist Builder', category: 'Content', route: '/dashboard/content/playlists', icon: <PlaySquare className="w-4 h-4 text-indigo-400" /> },
  { id: 'c-5', title: 'Ad Campaign Flight Configurator', category: 'Marketing', route: '/dashboard/marketing/campaigns', icon: <Megaphone className="w-4 h-4 text-amber-400" /> },
  { id: 'c-6', title: 'Proof-of-Play & Fleet Analytics', category: 'Analytics', route: '/dashboard/analytics/insights/fleet', icon: <BarChart className="w-4 h-4 text-cyan-400" /> },
  { id: 'c-7', title: 'Team Directory & Role Matrix', category: 'Administration', route: '/dashboard/admin/team', icon: <Users className="w-4 h-4 text-pink-400" /> },
  { id: 'c-8', title: 'Organization & SSO Policies', category: 'Administration', route: '/dashboard/admin/organization', icon: <Settings className="w-4 h-4 text-slate-400" /> },
];

export const CommandPaletteModal: React.FC<CommandPaletteModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = COMMAND_ITEMS.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (route: string) => {
    navigate(route);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-24 p-4 animate-in fade-in duration-150">
      <div className="bg-[var(--color-level-2)] border border-[var(--color-border)] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden space-y-0">
        
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--color-border)] bg-[var(--color-level-1)]">
          <Search className="w-5 h-5 text-[var(--color-primary)]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search devices, playlists, campaigns..."
            className="w-full bg-transparent text-sm font-medium text-[var(--color-text-primary)] outline-none placeholder:text-[var(--color-text-muted)]"
          />
          <div className="flex items-center gap-1 text-[10px] font-bold text-[var(--color-text-muted)] uppercase bg-[var(--color-level-3)] px-2 py-1 rounded border border-[var(--color-border)]">
            ESC
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs text-[var(--color-text-muted)]">
              No matching commands or resources found.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.route)}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-[var(--color-level-4)] text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[var(--color-level-3)] border border-[var(--color-border)]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-primary)] transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[10px] text-[var(--color-text-muted)]">{item.category}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Jump <Command className="w-3 h-3" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
