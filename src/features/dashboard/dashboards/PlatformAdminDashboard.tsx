import { 
  Building2, 
  CreditCard, 
  Layers, 
  Activity, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

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

      {/* ORGANIZATIONS LIST */}
      <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[var(--color-text-primary)]">Active Customer Organizations</h2>
          <button onClick={() => navigate('/dashboard/admin/organization')} className="text-xs text-[var(--color-primary)] font-semibold hover:underline flex items-center gap-1">
            Manage All <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { id: 'org_acme', name: 'Acme Enterprise Corp', plan: 'Enterprise Pro', screens: '150 / 200', mrr: '₹1,50,000', status: 'ACTIVE' },
            { id: 'org_transit', name: 'Telangana Transit Fleet', plan: 'Growth Tier', screens: '430 / 500', mrr: '₹4,20,000', status: 'ACTIVE' },
            { id: 'org_retail', name: 'Retail Ads India Network', plan: 'Starter Network', screens: '85 / 100', mrr: '₹85,000', status: 'ACTIVE' },
          ].map(org => (
            <div key={org.id} className="p-3 rounded-lg bg-[var(--color-level-2)] border border-[var(--color-border)] flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="font-bold text-[var(--color-text-primary)]">{org.name}</div>
                <div className="text-[11px] text-slate-400">{org.plan} · {org.screens} Screens Billed</div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right font-mono font-bold text-emerald-400">{org.mrr}</div>
                <Button variant="secondary" size="sm" className="text-xs" onClick={() => navigate('/dashboard/admin/organization')}>
                  Manage Tenant
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
