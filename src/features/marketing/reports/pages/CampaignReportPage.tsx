import { useState } from 'react';
import { DataTable } from '@/shared/components/data-display/DataTable';
import { Badge } from '@/shared/components/indicators/Badge';
import { mockMarketingStore } from '../../data/MockMarketingStore';
import type { CampaignReport } from '../../data/types';

function formatNumber(num: number) {
  return new Intl.NumberFormat('en-US').format(num);
}

export function CampaignReportPage() {
  const [reports] = useState<CampaignReport[]>(mockMarketingStore.reports);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = reports.filter(r =>
    r.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.advertiserName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Campaign Performance Reports</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Playback analytics, flight completion metrics, and impression pacing</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-level-1)] p-4">
        <div className="mb-4 max-w-md">
          <input
            type="text"
            placeholder="Search report by campaign or advertiser..."
            className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-shadow"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-auto">
          <DataTable
            data={filteredData}
            keyExtractor={r => r.campaignId}
            columns={[
              {
                header: 'Campaign',
                accessorKey: 'campaignName',
                cell: (r) => (
                  <div className="flex flex-col">
                    <span className="font-semibold text-[var(--color-text-primary)]">{r.campaignName}</span>
                    <span className="text-xs text-[var(--color-text-muted)]">Sponsor: {r.advertiserName}</span>
                  </div>
                )
              },
              {
                header: 'Completion %',
                cell: (r) => (
                  <div className="flex items-center gap-2">
                    <Badge variant={r.flightCompletionPercent >= 90 ? 'success' : r.flightCompletionPercent >= 50 ? 'info' : 'warning'}>
                      {r.flightCompletionPercent}%
                    </Badge>
                  </div>
                )
              },
              {
                header: 'Delivered vs Target Impressions',
                cell: (r) => (
                  <div className="flex items-center gap-1.5 font-mono text-sm">
                    <span className="font-bold text-[var(--color-primary)]">{formatNumber(r.totalImpressions)}</span>
                    <span className="text-[var(--color-text-muted)]">/ {formatNumber(r.targetImpressions)}</span>
                  </div>
                )
              },
              {
                header: 'Top Fleet Distribution',
                cell: (r) => (
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]">
                    {r.deviceGroupBreakdown.map((g: { groupName: string; impressions: number; share: number }) => (
                      <span key={g.groupName} className="bg-gray-100 px-2 py-0.5 rounded font-mono">
                        {g.groupName}: {g.share}%
                      </span>
                    ))}
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
