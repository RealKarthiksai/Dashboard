import { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Layers, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Plus, 
  Monitor, 
  AlertTriangle, 
  Globe, 
  Navigation2, 
  ShieldCheck, 
  HardDrive,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/shared/components/indicators/Badge';
import { Breadcrumb } from '@/shared/components/navigation/Breadcrumb';
import { MOCK_SITE_NODES, MOCK_INVENTORY_ITEMS, MOCK_MAINTENANCE_TICKETS } from '../../data/mockFleetData';
import type { SiteNode, SiteNodeType } from '../../types';

export function SiteHierarchyPage() {
  const [nodes] = useState<SiteNode[]>(MOCK_SITE_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-gate14');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['node-tg', 'node-hyd', 'node-rgia', 'node-t1', 'node-dep-a']));

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const toggleExpand = (id: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Node type icon mapper
  const getNodeIcon = (type: SiteNodeType) => {
    switch (type) {
      case 'region': return <Globe className="w-4 h-4 text-indigo-400" />;
      case 'city': return <MapPin className="w-4 h-4 text-cyan-400" />;
      case 'site': return <Building2 className="w-4 h-4 text-emerald-400" />;
      case 'building': return <Building2 className="w-4 h-4 text-amber-400" />;
      case 'floor': return <Layers className="w-4 h-4 text-purple-400" />;
      case 'zone': return <Navigation2 className="w-4 h-4 text-sky-400" />;
      case 'corridor': return <Navigation2 className="w-4 h-4 text-rose-400" />;
      case 'screen_location': return <Monitor className="w-4 h-4 text-emerald-300" />;
      default: return <Building2 className="w-4 h-4 text-slate-400" />;
    }
  };

  // Build tree hierarchy
  const getChildren = (parentId: string | null) => {
    return nodes.filter(n => n.parentId === parentId && (
      !searchQuery || n.name.toLowerCase().includes(searchQuery.toLowerCase()) || (n.code && n.code.toLowerCase().includes(searchQuery.toLowerCase()))
    ));
  };

  // Render tree recursive
  const renderTreeNodes = (parentId: string | null, depth = 0) => {
    const children = getChildren(parentId);
    if (children.length === 0) return null;

    return (
      <div className="space-y-1">
        {children.map(node => {
          const hasKids = nodes.some(n => n.parentId === node.id);
          const isExpanded = expandedNodes.has(node.id);
          const isSelected = selectedNodeId === node.id;

          return (
            <div key={node.id} className="select-none">
              <div
                onClick={() => setSelectedNodeId(node.id)}
                style={{ paddingLeft: `${depth * 14 + 10}px` }}
                className={`flex items-center justify-between py-2 pr-3 rounded-lg text-xs font-medium cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-indigo-600/20 text-indigo-200 border border-indigo-500/40 shadow-xs' 
                    : 'text-slate-300 hover:bg-[#1A2436] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  {hasKids ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleExpand(node.id); }}
                      className="p-0.5 hover:bg-slate-700/50 rounded text-slate-400 hover:text-white"
                    >
                      {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                    </button>
                  ) : (
                    <span className="w-4" />
                  )}
                  {getNodeIcon(node.nodeType)}
                  <span className="truncate">{node.name}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {node.activeAlerts > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      <AlertTriangle className="w-2.5 h-2.5" />
                      {node.activeAlerts}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800/80 px-1.5 py-0.2 rounded border border-slate-700/50">
                    {node.deviceCount} screens
                  </span>
                </div>
              </div>

              {hasKids && isExpanded && renderTreeNodes(node.id, depth + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  // Find linked items for selected node
  const linkedAssets = MOCK_INVENTORY_ITEMS.filter(i => i.locationId === selectedNode.id || i.locationId === selectedNode.parentId);
  const linkedTickets = MOCK_MAINTENANCE_TICKETS.filter(t => t.siteNodeId === selectedNode.id);

  return (
    <div className="h-full flex flex-col space-y-4 max-w-7xl mx-auto w-full">
      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[
            { label: 'Operations', href: '/dashboard/operations/devices' },
            { label: 'Site Hierarchy Explorer' }
          ]} />
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">Generic Site Hierarchy Workspace</h1>
          <p className="text-xs text-[var(--color-text-muted)]">
            Multi-domain location model supporting Airports, Transit Corridors, Retail Malls & Fleet Hubs without hardcoded levels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
            <Maximize2 className="w-3.5 h-3.5" /> Fullscreen Canvas
          </Button>
          <Button variant="primary" size="sm" className="gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" /> Add Location Node
          </Button>
        </div>
      </div>

      {/* 3-COLUMN WORKSPACE GRID */}
      <div className="grid grid-cols-12 gap-4 flex-1 min-h-[640px]">
        {/* COLUMN 1: TREE NAVIGATOR (3 cols) */}
        <div className="col-span-12 lg:col-span-3 bg-[#141E2F] border border-[var(--color-border)] rounded-xl p-3 flex flex-col space-y-3 shadow-md">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search site nodes or code..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#1A2436] border border-[var(--color-border)] rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 border-b border-slate-700/50 pb-2 px-1">
            <span>LOCATION TREE</span>
            <span>{nodes.length} Nodes</span>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 space-y-1 custom-scrollbar">
            {renderTreeNodes(null)}
          </div>
        </div>

        {/* COLUMN 2: VISUALIZER CANVAS WORKSPACE (6 cols) */}
        <div className="col-span-12 lg:col-span-6 bg-[#1A2436] border border-[var(--color-border)] rounded-xl p-4 flex flex-col space-y-4 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
            <div className="flex items-center gap-2">
              {getNodeIcon(selectedNode.nodeType)}
              <span className="font-bold text-sm text-white">{selectedNode.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-indigo-500/30">
                {selectedNode.code || selectedNode.nodeType.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={selectedNode.healthScore > 95 ? 'success' : 'warning'}>
                {selectedNode.healthScore}% Health Score
              </Badge>
            </div>
          </div>

          {/* Interactive Workspace Canvas Graphic */}
          <div className="flex-1 rounded-xl bg-[#0F172A] border border-slate-700/50 p-4 relative flex flex-col justify-between overflow-hidden group">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                <span>Coordinates: </span>
                <span className="text-cyan-300">{selectedNode.coordinates ? `${selectedNode.coordinates.lat}, ${selectedNode.coordinates.lng}` : 'Zone Bounds N/A'}</span>
              </div>
              <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Telemetry Active
              </div>
            </div>

            {/* Canvas Node Diagram */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center space-y-4 py-8">
              <div className="p-4 rounded-2xl bg-indigo-600/20 border border-indigo-500/50 shadow-xl flex items-center gap-4">
                <div className="p-3 rounded-xl bg-indigo-600 text-white shadow-lg">
                  {getNodeIcon(selectedNode.nodeType)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">{selectedNode.name}</h3>
                  <p className="text-xs text-slate-400">{selectedNode.address || 'Integrated Transit Node'}</p>
                </div>
              </div>

              {/* Sub-node Connection Grid */}
              <div className="grid grid-cols-3 gap-3 w-full max-w-lg mt-4">
                <div className="p-3 rounded-lg bg-[#141E2F] border border-slate-700 text-center">
                  <Monitor className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <div className="text-xs font-bold text-white">{selectedNode.deviceCount}</div>
                  <div className="text-[10px] text-slate-400">Active Displays</div>
                </div>
                <div className="p-3 rounded-lg bg-[#141E2F] border border-slate-700 text-center">
                  <HardDrive className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
                  <div className="text-xs font-bold text-white">{linkedAssets.length}</div>
                  <div className="text-[10px] text-slate-400">Inventory Assets</div>
                </div>
                <div className="p-3 rounded-lg bg-[#141E2F] border border-slate-700 text-center">
                  <AlertTriangle className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                  <div className="text-xs font-bold text-white">{selectedNode.activeAlerts}</div>
                  <div className="text-[10px] text-slate-400">Active Alerts</div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-slate-800 pt-3">
              <span className="text-xs text-slate-400">Last Synced: Just Now</span>
              <Button variant="secondary" size="sm" className="text-xs gap-1">
                <Plus className="w-3 h-3" /> Commission New Device
              </Button>
            </div>
          </div>
        </div>

        {/* COLUMN 3: NODE PROPERTIES INSPECTOR (3 cols) */}
        <div className="col-span-12 lg:col-span-3 bg-[#141E2F] border border-[var(--color-border)] rounded-xl p-4 flex flex-col space-y-4 shadow-md">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-700/50 pb-2">
            Node Properties & Assets
          </h2>

          <div className="space-y-3">
            <div>
              <span className="text-[11px] text-slate-400">Node Identifier</span>
              <div className="text-xs font-mono font-bold text-indigo-300 mt-0.5">{selectedNode.id}</div>
            </div>
            <div>
              <span className="text-[11px] text-slate-400">Location Type</span>
              <div className="text-xs font-semibold text-white capitalize mt-0.5 flex items-center gap-1.5">
                {getNodeIcon(selectedNode.nodeType)}
                {selectedNode.nodeType.replace('_', ' ')}
              </div>
            </div>
            {selectedNode.address && (
              <div>
                <span className="text-[11px] text-slate-400">Physical Address</span>
                <div className="text-xs text-slate-200 mt-0.5">{selectedNode.address}</div>
              </div>
            )}
          </div>

          <hr className="border-slate-800" />

          {/* Linked Inventory Assets */}
          <div>
            <h3 className="text-xs font-semibold text-white mb-2 flex items-center justify-between">
              <span>Linked Assets</span>
              <span className="text-[10px] text-slate-400">{linkedAssets.length}</span>
            </h3>
            {linkedAssets.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                {linkedAssets.map(asset => (
                  <div key={asset.id} className="p-2 rounded-lg bg-[#1A2436] border border-slate-700/60 text-xs">
                    <div className="font-semibold text-white truncate">{asset.name}</div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-mono">
                      <span>{asset.serialNumber}</span>
                      <span className="text-emerald-400 font-bold">{asset.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No physical inventory bound directly to this node.</p>
            )}
          </div>

          <hr className="border-slate-800" />

          {/* Active Maintenance Tickets */}
          <div>
            <h3 className="text-xs font-semibold text-white mb-2 flex items-center justify-between">
              <span>Maintenance Tickets</span>
              <span className="text-[10px] text-slate-400">{linkedTickets.length}</span>
            </h3>
            {linkedTickets.length > 0 ? (
              <div className="space-y-2">
                {linkedTickets.map(t => (
                  <div key={t.id} className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/40 text-xs">
                    <div className="font-bold text-rose-200 truncate">{t.title}</div>
                    <div className="flex items-center justify-between text-[10px] text-rose-300 mt-1 font-mono">
                      <span>{t.ticketNumber}</span>
                      <span className="px-1.5 py-0.2 rounded bg-rose-600 text-white font-bold">{t.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/30">
                <ShieldCheck className="w-4 h-4" />
                No active service tickets for this node.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
