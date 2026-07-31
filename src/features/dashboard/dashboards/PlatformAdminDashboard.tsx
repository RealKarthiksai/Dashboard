import { 
  Building2, 
  CreditCard, 
  Layers, 
  Activity, 
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { TenantHealthWidget } from '@/shared/domain-widgets/TenantHealthWidget';

export function PlatformAdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse" />
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Platform Super Admin Portal</h1>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">SaaS tenant operations, subscription licensing, global revenue, and platform health.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" className="gap-1.5" onClick={() => navigate('/dashboard/admin/organization')}>
            <Plus className="w-4 h-4" /> Onboard Organization
          </Button>
        </div>
      </div>

      {/* PLATFORM KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
            <span>Total Tenant Orgs</span>
            <Building2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-[var(--color-text-primary)]">42</div>
          <div className="text-[11px] text-emerald-400 font-semibold">+4 This Month</div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
            <span>Licensed Screens</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-extrabold text-[var(--color-text-primary)]">8,200</div>
          <div className="text-[11px] text-cyan-400 font-semibold">8,047 Active (98.1%)</div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
            <span>Monthly Recurring Revenue</span>
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">₹42,00,000</div>
          <div className="text-[11px] text-emerald-400 font-semibold">+14.2% Growth YoY</div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
            <span>Platform Health</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">100.0%</div>
          <div className="text-[11px] text-slate-400">All Microservices Nominal</div>
        </div>
      </div>

      {/* DOMAIN WIDGET: TENANT ORGANIZATIONS */}
      <TenantHealthWidget />
    </div>
  );
}
