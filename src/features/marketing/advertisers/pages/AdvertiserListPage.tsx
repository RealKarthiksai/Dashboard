import { useState } from 'react';
import { Plus, Mail, Phone, DollarSign, Megaphone, Trash, Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/shared/icons/Icon';
import { DataTable } from '@/shared/components/data-display/DataTable';
import { Badge } from '@/shared/components/indicators/Badge';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { useAdvertisers } from '../hooks/useAdvertisers';

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
}

export function AdvertiserListPage() {
  const { data, deleteAdvertiser } = useAdvertisers();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(a => 
    a.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Advertisers & Sponsors</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Manage brand advertiser accounts, contacts, and historical spend</p>
        </div>
        <div className="flex items-center gap-3">
          <PermissionGate required={Permission.CAMPAIGNS.CREATE}>
            <Button>
              <Icon icon={Plus} size="sm" className="mr-2" />
              Add Advertiser
            </Button>
          </PermissionGate>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-level-1)] p-4">
        <div className="mb-4 max-w-md">
          <input
            type="text"
            placeholder="Search advertisers by company or email..."
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex-1 overflow-auto">
          <DataTable
            data={filteredData}
            keyExtractor={a => a.id}
            columns={[
              { 
                header: 'Company / Brand', 
                accessorKey: 'companyName',
                cell: (a) => (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--color-surface-hover)] flex items-center justify-center font-bold text-[var(--color-primary)]">
                      {a.companyName.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-[var(--color-text-primary)]">{a.companyName}</span>
                      <span className="text-xs text-[var(--color-text-muted)]">{a.name}</span>
                    </div>
                  </div>
                )
              },
              { 
                header: 'Contact Info', 
                cell: (a) => (
                  <div className="flex flex-col text-xs text-[var(--color-text-secondary)] space-y-0.5">
                    <div className="flex items-center gap-1">
                      <Icon icon={Mail} size="sm" className="text-[var(--color-text-muted)]" />
                      <span>{a.contactEmail}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon icon={Phone} size="sm" className="text-[var(--color-text-muted)]" />
                      <span>{a.contactPhone}</span>
                    </div>
                  </div>
                )
              },
              { 
                header: 'Total Spend', 
                cell: (a) => (
                  <div className="flex items-center gap-1 font-mono font-medium text-[var(--color-text-primary)]">
                    <Icon icon={DollarSign} size="sm" className="text-[var(--color-success)]" />
                    <span>{formatCurrency(a.totalSpend)}</span>
                  </div>
                )
              },
              { 
                header: 'Active Campaigns', 
                cell: (a) => (
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <Icon icon={Megaphone} size="sm" className="text-[var(--color-primary)]" />
                    <span>{a.activeCampaignsCount} campaigns</span>
                  </div>
                )
              },
              { 
                header: 'Status', 
                accessorKey: 'status',
                cell: (a) => (
                  <Badge variant={a.status === 'active' ? 'success' : 'default'}>
                    {a.status.toUpperCase()}
                  </Badge>
                )
              },
              { 
                header: '', 
                cell: (a) => (
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PermissionGate required={Permission.CAMPAIGNS.UPDATE}>
                      <button className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-hover)] rounded">
                        <Icon icon={Edit} size="sm" />
                      </button>
                    </PermissionGate>
                    <PermissionGate required={Permission.CAMPAIGNS.DELETE}>
                      <button 
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-danger)] hover:bg-[var(--color-surface-hover)] rounded"
                        onClick={() => deleteAdvertiser(a.id)}
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
