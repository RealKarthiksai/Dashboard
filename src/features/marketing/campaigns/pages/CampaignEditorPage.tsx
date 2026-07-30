import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/shared/icons/Icon';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { campaignRepository } from '../repositories/MockCampaignRepository';
import { advertiserRepository } from '../../advertisers/repositories/MockAdvertiserRepository';
import type { Campaign, Advertiser } from '../../data/types';

export function CampaignEditorPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [advertisers, setAdvertisers] = useState<Advertiser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const [cmp, advs] = await Promise.all([
        id === 'new'
          ? Promise.resolve({
              id: `cmp_new_${Date.now()}`,
              name: 'New Ad Campaign',
              advertiserId: '',
              advertiserName: '',
              budget: 10000,
              spent: 0,
              targetImpressions: 500000,
              deliveredImpressions: 0,
              startDate: new Date().toISOString().split('T')[0],
              endDate: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
              status: 'draft' as const,
              priority: 'medium' as const,
              targetDeviceGroupIds: [],
              playlistIds: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            })
          : campaignRepository.getCampaign(id!),
        advertiserRepository.getAdvertisers(),
      ]);

      setCampaign(cmp as Campaign);
      setAdvertisers(advs);
      setLoading(false);
    }
    load();
  }, [id]);

  const handleSave = async () => {
    if (!campaign) return;
    setSaving(true);
    await campaignRepository.saveCampaign(campaign);
    setSaving(false);
    navigate('/dashboard/marketing/campaigns');
  };

  if (loading) return <div className="h-full flex items-center justify-center">Loading campaign configurator...</div>;
  if (!campaign) return <div className="h-full flex items-center justify-center text-[var(--color-danger)]">Campaign not found</div>;

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)] bg-[var(--color-surface)]">
        <div className="flex items-center gap-4">
          <button className="text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]" onClick={() => navigate('/dashboard/marketing/campaigns')}>
            <Icon icon={ArrowLeft} />
          </button>
          <div>
            <input
              type="text"
              className="text-xl font-bold bg-transparent focus:outline-none focus:border-b border-[var(--color-primary)] text-[var(--color-text-primary)]"
              value={campaign.name}
              onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
            />
            <p className="text-sm text-[var(--color-text-secondary)]">Campaign Configurator & Flight Planner</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/dashboard/marketing/campaigns')}>Cancel</Button>
          <PermissionGate required={Permission.CAMPAIGNS.UPDATE}>
            <Button onClick={handleSave} disabled={saving}>
              <Icon icon={Save} size="sm" className="mr-2" />
              {saving ? 'Saving...' : 'Save Campaign'}
            </Button>
          </PermissionGate>
        </div>
      </div>

      <div className="flex-1 max-w-4xl mx-auto w-full p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-sm space-y-6 overflow-y-auto custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Advertiser Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Brand / Advertiser</label>
            <select
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              value={campaign.advertiserId}
              onChange={(e) => {
                const adv = advertisers.find((a) => a.id === e.target.value);
                setCampaign({ ...campaign, advertiserId: e.target.value, advertiserName: adv?.companyName || '' });
              }}
            >
              <option value="">Select Advertiser Account</option>
              {advertisers.map((a) => (
                <option key={a.id} value={a.id}>{a.companyName}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">Priority Tier</label>
            <select
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              value={campaign.priority}
              onChange={(e) => setCampaign({ ...campaign, priority: e.target.value as any })}
            >
              <option value="low">Low (Filler Ad)</option>
              <option value="medium">Medium (Standard Sponsorship)</option>
              <option value="high">High (Guaranteed Placement)</option>
              <option value="exclusive">Exclusive Takeover</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium mb-1">Total Budget ($ USD)</label>
            <input
              type="number"
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              value={campaign.budget}
              onChange={(e) => setCampaign({ ...campaign, budget: parseInt(e.target.value) || 0 })}
            />
          </div>

          {/* Target Impressions */}
          <div>
            <label className="block text-sm font-medium mb-1">Target Impressions</label>
            <input
              type="number"
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              value={campaign.targetImpressions}
              onChange={(e) => setCampaign({ ...campaign, targetImpressions: parseInt(e.target.value) || 0 })}
            />
          </div>

          {/* Flight Dates */}
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              value={campaign.startDate.split('T')[0]}
              onChange={(e) => setCampaign({ ...campaign, startDate: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              className="w-full bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              value={campaign.endDate.split('T')[0]}
              onChange={(e) => setCampaign({ ...campaign, endDate: e.target.value })}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
