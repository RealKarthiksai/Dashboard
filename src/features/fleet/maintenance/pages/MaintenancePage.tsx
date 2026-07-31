import { useState } from 'react';
import { 
  Wrench, 
  Clock, 
  AlertOctagon, 
  UserCheck, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  Search, 
  Plus, 
  HardDrive, 
  Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/shared/components/navigation/Breadcrumb';
import { MOCK_MAINTENANCE_TICKETS } from '../../data/mockFleetData';
import type { MaintenanceTicket, WorkOrderStatus } from '../../types';

export function MaintenancePage() {
  const [tickets] = useState<MaintenanceTicket[]>(MOCK_MAINTENANCE_TICKETS);
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceTicket | null>(tickets[0]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTickets = tickets.filter(t => {
    const matchesStatus = selectedStatus === 'ALL' || t.status === selectedStatus;
    const matchesQuery = !searchQuery || 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      t.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.siteNodeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesQuery;
  });

  // Work Order Status Badge Helper (Directive #3)
  const getStatusBadge = (status: WorkOrderStatus) => {
    switch (status) {
      case 'OPEN':
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">OPEN</span>;
      case 'ASSIGNED':
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">ASSIGNED</span>;
      case 'TRAVELLING':
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">TRAVELLING</span>;
      case 'ON_SITE':
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">ON SITE</span>;
      case 'REPAIRING':
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">REPAIRING</span>;
      case 'WAITING_PARTS':
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-orange-500/20 text-orange-300 border border-orange-500/30">WAITING PARTS</span>;
      case 'COMPLETED':
      case 'VERIFIED':
      case 'CLOSED':
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">COMPLETED</span>;
      default:
        return <span className="px-2 py-0.5 text-xs font-bold rounded bg-slate-700 text-slate-300">{status}</span>;
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 max-w-7xl mx-auto w-full">
      {/* Header & Breadcrumb */}
      <div className="flex items-center justify-between">
        <div>
          <Breadcrumb items={[
            { label: 'Operations', href: '/dashboard/operations/devices' },
            { label: 'Field Maintenance & Work Orders' }
          ]} />
          <h1 className="text-xl font-bold text-white tracking-tight mt-1">Maintenance & Field Work Orders</h1>
          <p className="text-xs text-[var(--color-text-muted)]">
            Full Work Order Lifecycle: Open → Assigned → Travelling → On Site → Repairing → Completed → Verified.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" className="gap-1.5 text-xs">
            <Plus className="w-3.5 h-3.5" /> Dispatch Field Ticket
          </Button>
        </div>
      </div>

      {/* WORKORDER LIFECYCLE SUMMARY METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#141E2F] border border-[var(--color-border)] shadow-md flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-rose-600/20 text-rose-400 border border-rose-500/30">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Critical Tickets</div>
            <div className="text-lg font-bold text-rose-300">1 Urgent</div>
            <div className="text-[10px] text-rose-400/80">SLA Breach Risk</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#141E2F] border border-[var(--color-border)] shadow-md flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/30">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Techs On Site / En Route</div>
            <div className="text-lg font-bold text-amber-300">2 Active</div>
            <div className="text-[10px] text-amber-400/80">GPS Field Tracking</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#141E2F] border border-[var(--color-border)] shadow-md flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Avg Resolution Time</div>
            <div className="text-lg font-bold text-purple-300">2.4 Hours</div>
            <div className="text-[10px] text-purple-400/80">Within SLA Target</div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#141E2F] border border-[var(--color-border)] shadow-md flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-400 font-medium">Completed This Week</div>
            <div className="text-lg font-bold text-emerald-300">18 Tickets</div>
            <div className="text-[10px] text-emerald-400/80">100% Quality Verified</div>
          </div>
        </div>
      </div>

      {/* WORK ORDER WORKSPACE GRID */}
      <div className="grid grid-cols-12 gap-4 flex-1">
        {/* LEFT LIST: WORK ORDER TICKETS (7 cols) */}
        <div className="col-span-12 lg:col-span-7 bg-[#141E2F] border border-[var(--color-border)] rounded-xl p-4 flex flex-col space-y-4 shadow-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1 overflow-x-auto max-w-full pb-1 sm:pb-0 custom-scrollbar">
              {['ALL', 'ON_SITE', 'TRAVELLING', 'WAITING_PARTS', 'COMPLETED'].map(status => (
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

            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ticket..."
                className="w-full pl-8 pr-3 py-1.5 bg-[#1A2436] border border-[var(--color-border)] rounded-lg text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-[520px] pr-1 custom-scrollbar">
            {filteredTickets.map(t => {
              const isSelected = selectedTicket?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicket(t)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/60 shadow-md ring-1 ring-indigo-500/40'
                      : 'bg-[#1A2436] border-slate-700/60 hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-indigo-400">{t.ticketNumber}</span>
                    {getStatusBadge(t.status)}
                  </div>
                  <h3 className="font-bold text-white text-sm mt-1.5">{t.title}</h3>
                  <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {t.siteNodeName}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px] text-amber-400">
                      <Clock className="w-3 h-3" />
                      SLA: {new Date(t.slaDueDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT INSPECTOR: CONNECTED WORK ORDER DETAILS (5 cols - Directive #8) */}
        {selectedTicket ? (
          <div className="col-span-12 lg:col-span-5 bg-[#1A2436] border border-[var(--color-border)] rounded-xl p-4 flex flex-col space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-indigo-400">{selectedTicket.ticketNumber}</span>
                <h2 className="text-base font-bold text-white mt-0.5">{selectedTicket.title}</h2>
              </div>
              {getStatusBadge(selectedTicket.status)}
            </div>

            {/* Connected Work Order Details */}
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-lg bg-[#141E2F] border border-slate-700">
                <div className="text-[11px] font-semibold text-slate-400 mb-1">TARGET DEVICE & VEHICLE</div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedTicket.deviceName || selectedTicket.deviceId}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#141E2F] border border-slate-700">
                <div className="text-[11px] font-semibold text-slate-400 mb-1">SITE HIERARCHY LOCATION</div>
                <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {selectedTicket.siteNodeName}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#141E2F] border border-slate-700">
                <div className="text-[11px] font-semibold text-slate-400 mb-1">LINKED INVENTORY ASSET SERIAL</div>
                <div className="font-mono font-bold text-amber-300 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                  {selectedTicket.inventoryAssetSerial || 'SN-DISP-99214A'}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#141E2F] border border-slate-700">
                <div className="text-[11px] font-semibold text-slate-400 mb-1">ASSIGNED FIELD TECHNICIAN</div>
                <div className="font-bold text-indigo-200 flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                  {selectedTicket.technicianName}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#141E2F] border border-slate-700">
                <div className="text-[11px] font-semibold text-slate-400 mb-1">REPLACEMENT PART REQUIRED</div>
                <div className="font-mono text-emerald-300 font-bold">
                  SKU: {selectedTicket.replacementSku || 'TROT-TAB-10X'}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#141E2F] border border-slate-700">
                <div className="text-[11px] font-semibold text-slate-400 mb-1">WORK ORDER NOTES</div>
                <p className="text-slate-300 italic">{selectedTicket.notes}</p>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-3 flex items-center justify-between">
              <Button variant="secondary" size="sm" className="text-xs">
                Update Status
              </Button>
              <Button variant="primary" size="sm" className="text-xs">
                Reassign Tech
              </Button>
            </div>
          </div>
        ) : (
          <div className="col-span-12 lg:col-span-5 bg-[#141E2F] border border-slate-800 rounded-xl p-8 flex flex-col items-center justify-center text-center text-slate-500">
            <Wrench className="w-8 h-8 mb-2" />
            <p className="text-xs">Select a work order ticket from the list to inspect details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
