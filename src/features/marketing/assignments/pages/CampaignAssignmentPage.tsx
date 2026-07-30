import { useState } from 'react';
import { MonitorSmartphone, Megaphone } from 'lucide-react';
import { Icon } from '@/shared/icons/Icon';
import { DataTable } from '@/shared/components/data-display/DataTable';
import { Badge } from '@/shared/components/indicators/Badge';
import { mockMarketingStore } from '../../data/MockMarketingStore';
import type { CampaignAssignment } from '../../data/types';

export function CampaignAssignmentPage() {
  const [assignments, setAssignments] = useState<CampaignAssignment[]>(mockMarketingStore.assignments);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = assignments.filter(a =>
    a.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.targetGroupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Campaign Fleet Assignments</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Allocate campaigns to target device fleets and configure share of voice (SOV)</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-level-1)] p-4">
        <div className="mb-4 max-w-md">
          <input
            type="text"
            placeholder="Search assignments by campaign or fleet group..."
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
                header: 'Campaign',
                accessorKey: 'campaignName',
                cell: (a) => (
                  <div className="flex items-center gap-2 font-medium text-[var(--color-primary)]">
                    <Icon icon={Megaphone} size="sm" />
                    <span>{a.campaignName}</span>
                  </div>
                )
              },
              {
                header: 'Target Device Fleet',
                cell: (a) => (
                  <div className="flex items-center gap-2 text-[var(--color-text-primary)]">
                    <Icon icon={MonitorSmartphone} size="sm" className="text-[var(--color-text-muted)]" />
                    <span>{a.targetGroupName}</span>
                  </div>
                )
              },
              {
                header: 'Share of Voice (SOV)',
                cell: (a) => (
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      className="w-28"
                      value={a.shareOfVoicePercent}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setAssignments(prev => prev.map(item => item.id === a.id ? { ...item, shareOfVoicePercent: val } : item));
                      }}
                    />
                    <span className="font-mono text-xs font-bold w-12">{a.shareOfVoicePercent}%</span>
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
            ]}
          />
        </div>
      </div>
    </div>
  );
}
