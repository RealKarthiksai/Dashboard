import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Megaphone, Calendar, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/shared/icons/Icon';
import { DataTable } from '@/shared/components/data-display/DataTable';
import { Badge } from '@/shared/components/indicators/Badge';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { useCampaigns } from '../hooks/useCampaigns';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num);
}

export function CampaignListPage() {
  const navigate = useNavigate();
  const { data, deleteCampaign } = useCampaigns();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.advertiserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'draft': return 'warning';
      case 'paused': return 'info';
      case 'completed': return 'default';
      default: return 'default';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'exclusive': return 'danger';
      case 'high': return 'warning';
      case 'medium': return 'info';
      default: return 'default';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Campaigns</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Orchestrate advertising flights, budgets, and impression goals</p>
        </div>
        <div className="flex items-center gap-3">
          <PermissionGate required={Permission.CAMPAIGNS.CREATE}>
            <Button onClick={() => navigate('/dashboard/marketing/campaigns/new')}>
              <Icon icon={Plus} size="sm" className="mr-2" />
              Create Campaign
            </Button>
          </PermissionGate>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-level-1)] p-4">
        <div className="mb-4 max-w-md">
          <input
            type="text"
            placeholder="Search campaigns by title or advertiser..."
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex-1 overflow-auto">
          <DataTable
            data={filteredData}
            keyExtractor={c => c.id}
            columns={[
              { 
                header: 'Campaign Name', 
                accessorKey: 'name',
                cell: (c) => (
                  <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate(`/dashboard/marketing/campaigns/${c.id}`)}>
                    <div className="bg-[var(--color-surface-hover)] p-2 rounded-lg text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors">
                      <Icon icon={Megaphone} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold group-hover:text-[var(--color-primary)] transition-colors">{c.name}</span>
                      <span className="text-xs text-[var(--color-text-muted)]">Sponsor: {c.advertiserName}</span>
                    </div>
                  </div>
                )
              },
              { 
                header: 'Priority', 
                cell: (c) => (
                  <Badge variant={getPriorityVariant(c.priority)}>
                    {c.priority.toUpperCase()}
                  </Badge>
                )
              },
              { 
                header: 'Status', 
                accessorKey: 'status',
                cell: (c) => (
                  <Badge variant={getStatusVariant(c.status)}>
                    {c.status.toUpperCase()}
                  </Badge>
                )
              },
              { 
                header: 'Impression Pacing', 
                cell: (c) => {
                  const percent = Math.min(100, Math.floor((c.deliveredImpressions / c.targetImpressions) * 100));
                  return (
                    <div className="flex flex-col w-36">
                      <div className="flex justify-between text-xs mb-1 font-mono">
                        <span>{percent}%</span>
                        <span className="text-[var(--color-text-muted)]">{formatNumber(c.deliveredImpressions)} / {formatNumber(c.targetImpressions)}</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[var(--color-primary)] h-full transition-all" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                  );
                }
              },
              { 
                header: 'Budget & Spend', 
                cell: (c) => (
                  <div className="flex flex-col text-xs font-mono">
                    <span className="font-semibold text-[var(--color-text-primary)]">{formatCurrency(c.spent)}</span>
                    <span className="text-[var(--color-text-muted)]">of {formatCurrency(c.budget)}</span>
                  </div>
                )
              },
              { 
                header: 'Flight Dates', 
                cell: (c) => (
                  <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)]">
                    <Icon icon={Calendar} size="sm" className="text-[var(--color-text-muted)]" />
                    <span>{new Date(c.startDate).toLocaleDateString()} - {new Date(c.endDate).toLocaleDateString()}</span>
                  </div>
                )
              },
              { 
                header: '', 
                cell: (c) => (
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PermissionGate required={Permission.CAMPAIGNS.UPDATE}>
                      <button 
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] rounded"
                        onClick={(e) => { e.stopPropagation(); navigate(`/dashboard/marketing/campaigns/${c.id}`); }}
                      >
                        <Icon icon={Edit} size="sm" />
                      </button>
                    </PermissionGate>
                    <PermissionGate required={Permission.CAMPAIGNS.DELETE}>
                      <button 
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-surface-hover)] rounded"
                        onClick={(e) => { e.stopPropagation(); deleteCampaign(c.id); }}
                      >
                        <Icon icon={Trash} size="sm" />
                      </button>
                    </PermissionGate>
                  </div>
                )
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
