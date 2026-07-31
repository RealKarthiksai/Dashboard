import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export interface TenantOrgItem {
  id: string;
  name: string;
  plan: string;
  screens: string;
  mrr: string;
  status: 'ACTIVE' | 'WARNING' | 'SUSPENDED';
}

const DEFAULT_TENANTS: TenantOrgItem[] = [
  { id: 'org_acme', name: 'Acme Enterprise Corp', plan: 'Enterprise Pro', screens: '150 / 200', mrr: '₹1,50,000', status: 'ACTIVE' },
  { id: 'org_transit', name: 'Telangana Transit Fleet', plan: 'Growth Tier', screens: '430 / 500', mrr: '₹4,20,000', status: 'ACTIVE' },
  { id: 'org_retail', name: 'Retail Ads India Network', plan: 'Starter Network', screens: '85 / 100', mrr: '₹85,000', status: 'ACTIVE' },
];

export function TenantHealthWidget({ tenants = DEFAULT_TENANTS }: { tenants?: TenantOrgItem[] }) {
  const navigate = useNavigate();

  return (
    <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)]">Active Customer Organizations</h2>
        <button onClick={() => navigate('/dashboard/admin/organization')} className="text-xs text-[var(--color-primary)] font-semibold hover:underline flex items-center gap-1">
          Manage All <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      <div className="space-y-2 text-xs">
        {tenants.map(org => (
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
  );
}
