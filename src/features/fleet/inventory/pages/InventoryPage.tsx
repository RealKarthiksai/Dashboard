import { useState } from 'react';
import { 
  Package, 
  HardDrive, 
  Wrench, 
  Archive, 
  Search, 
  Plus, 
  QrCode, 
  ShieldAlert
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/shared/components/navigation/Breadcrumb';
import { MOCK_INVENTORY_ITEMS } from '../../data/mockFleetData';
import type { InventoryItem, InventoryAssetStatus } from '../../types';

export function InventoryPage() {
  const [items] = useState<InventoryItem[]>(MOCK_INVENTORY_ITEMS);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item => {
    const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus;
    const matchesQuery = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  // Status Badge Styling Helper
  const getStatusBadge = (status: InventoryAssetStatus) => {
    switch (status) {
      case 'INSTALLED':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">INSTALLED</span>;
      case 'WAREHOUSE':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">WAREHOUSE</span>;
      case 'RESERVED':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">RESERVED</span>;
      case 'IN_REPAIR':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">IN REPAIR</span>;
      case 'RMA':
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">RMA RETURN</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-semibold rounded bg-slate-700 text-slate-300">{status}</span>;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 max-w-7xl mx-auto w-full">
      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[
            { label: 'Operations', href: '/dashboard/operations/devices' },
            { label: 'Physical Inventory & Asset Lifecycle' }
          ]} />
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">Physical Inventory Assets</h1>
          <p className="text-xs text-[var(--color-text-muted)]">
            End-to-end hardware tracking: Warehouse Stock → Staging → Installed Cabs → Maintenance → RMA Disposal.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5 text-xs">
            <QrCode className="w-3.5 h-3.5" /> Scan Serial QR
          </Button>
          <Button variant="primary" size="sm" className="gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" /> Register New Asset
          </Button>
        </div>
      </div>

      {/* SUMMARY METRICS HEADER CARDS (Directive #7) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-[#141E2F] border border-[var(--color-border)] shadow-md flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Total Assets</div>
            <div className="text-lg font-bold text-white">532 Units</div>
            <div className="text-[10px] text-slate-500">$184,200 Asset Value</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#141E2F] border border-[var(--color-border)] shadow-md flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Installed Active</div>
            <div className="text-lg font-bold text-emerald-300">142 Units</div>
            <div className="text-[10px] text-emerald-400/80">In Transit Cabs & Hubs</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#141E2F] border border-[var(--color-border)] shadow-md flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Archive className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">In Warehouse</div>
            <div className="text-lg font-bold text-blue-300">335 Units</div>
            <div className="text-[10px] text-blue-400/80">Ready for Staging</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#141E2F] border border-[var(--color-border)] shadow-md flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">In Repair / Lab</div>
            <div className="text-lg font-bold text-amber-300">38 Units</div>
            <div className="text-[10px] text-amber-400/80">Serviced by Techs</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#141E2F] border border-[var(--color-border)] shadow-md flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">RMA & Reserved</div>
            <div className="text-lg font-bold text-rose-300">17 Units</div>
            <div className="text-[10px] text-rose-400/80">OEM Returns</div>
          </div>
        </div>
      </div>

      {/* FILTER BAR & TABLE */}
      <div className="bg-[#141E2F] border border-[var(--color-border)] rounded-xl p-4 space-y-4 shadow-md flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 sm:pb-0 custom-scrollbar">
            {['ALL', 'INSTALLED', 'WAREHOUSE', 'RESERVED', 'IN_REPAIR', 'RMA'].map(status => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedStatus === status
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-[#1A2436] text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search serial, SKU or name..."
              className="w-full pl-8 pr-3 py-1.5 bg-[#1A2436] border border-[var(--color-border)] rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* INVENTORY TABLE */}
        <div className="overflow-x-auto rounded-lg border border-slate-700/60 flex-1">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#1A2436] text-slate-400 font-semibold border-b border-slate-700">
              <tr>
                <th className="py-3 px-4">Asset SKU & Name</th>
                <th className="py-3 px-4">Serial Number</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status Lifecycle</th>
                <th className="py-3 px-4">Physical Location</th>
                <th className="py-3 px-4">Assigned Device</th>
                <th className="py-3 px-4">Warranty</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredItems.map(item => (
                <tr key={item.id} className="hover:bg-[#1A2436]/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-white">
                    <div>{item.name}</div>
                    <div className="text-[10px] font-mono text-indigo-400">{item.sku}</div>
                  </td>
                  <td className="py-3 px-4 font-mono text-cyan-300 font-bold">{item.serialNumber}</td>
                  <td className="py-3 px-4 capitalize text-slate-400">{item.category.replace('_', ' ')}</td>
                  <td className="py-3 px-4">{getStatusBadge(item.status)}</td>
                  <td className="py-3 px-4 text-slate-300 max-w-[180px] truncate">{item.locationName}</td>
                  <td className="py-3 px-4">
                    {item.assignedDeviceId ? (
                      <span className="font-mono text-xs text-emerald-400 font-semibold">{item.assignedDeviceId}</span>
                    ) : (
                      <span className="text-slate-500 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-mono text-[11px] text-slate-400">{item.warrantyExpiry}</td>
                  <td className="py-3 px-4 text-right">
                    <Button variant="secondary" size="sm" className="text-[10px] py-0.5 px-2">
                      Manage Asset
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
