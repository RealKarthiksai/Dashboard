import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface WorkOrderItem {
  id: string;
  title: string;
  location: string;
  assignedTech: string;
  status: 'ON SITE' | 'ASSIGNED' | 'PENDING';
}

const DEFAULT_WORK_ORDERS: WorkOrderItem[] = [
  { id: 'WO-2026-0881', title: 'RGIA Airport — Gate 14 Screen Replacement', location: 'RGIA Airport', assignedTech: 'Rajesh Kumar (Tech-04)', status: 'ON SITE' },
  { id: 'JOB-2026-902', title: 'Cab #432 Trot-Tab Security Cradle Pairing', location: 'ORR Gachibowli', assignedTech: 'Tech-04', status: 'ASSIGNED' },
];

export function MaintenanceQueueWidget({ orders = DEFAULT_WORK_ORDERS }: { orders?: WorkOrderItem[] }) {
  const navigate = useNavigate();

  return (
    <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)]">Maintenance & Field Queue</h2>
        <button 
          onClick={() => navigate('/dashboard/operations/maintenance')}
          className="text-xs text-[var(--color-primary)] font-semibold hover:underline flex items-center gap-1"
        >
          Full Queue <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-2 text-xs">
        {orders.map(item => (
          <div key={item.id} className="p-3 rounded-lg bg-[var(--color-level-2)] border border-[var(--color-border)] space-y-1.5">
            <div className="flex items-center justify-between font-mono font-bold text-amber-400">
              <span>{item.id}</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">{item.status}</span>
            </div>
            <div className="font-semibold text-[var(--color-text-primary)]">{item.title}</div>
            <div className="text-slate-400 text-[11px]">Assigned: {item.assignedTech}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
