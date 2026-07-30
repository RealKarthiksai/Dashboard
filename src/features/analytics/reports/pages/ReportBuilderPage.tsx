import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyticsRepository } from '../../repositories/AnalyticsRepository';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { ArrowLeft, Save } from 'lucide-react';

export const ReportBuilderPage: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'fleet' | 'playback' | 'user' | 'custom'>('fleet');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'custom'>('30d');
  const [schedule, setSchedule] = useState<'none' | 'daily' | 'weekly' | 'monthly'>('none');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(['uptime']);
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>(['deviceGroup']);

  const availableMetrics = [
    { id: 'uptime', label: 'Fleet Uptime Percentage' },
    { id: 'offlineEvents', label: 'Offline Connection Events' },
    { id: 'bandwidthUsageGb', label: 'Bandwidth Consumed (GB)' },
    { id: 'totalImpressions', label: 'Ad & Content Impressions' },
    { id: 'completedPlays', label: 'Verified Proof-of-Play Counts' },
    { id: 'proofOfPlayRatio', label: 'Proof of Play Delivery %' },
    { id: 'actionsPerformed', label: 'User Admin Actions' },
  ];

  const availableDimensions = [
    { id: 'deviceGroup', label: 'Operations Device Group' },
    { id: 'location', label: 'Geographic Location / Region' },
    { id: 'advertiserId', label: 'Sponsor / Advertiser' },
    { id: 'campaignId', label: 'Marketing Campaign' },
    { id: 'role', label: 'User Permission Role' },
  ];

  const toggleMetric = (id: string) => {
    setSelectedMetrics((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const toggleDimension = (id: string) => {
    setSelectedDimensions((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await analyticsRepository.createReport({
      title,
      description,
      category,
      metrics: selectedMetrics,
      dimensions: selectedDimensions,
      dateRange,
      schedule,
      createdBy: 'Current User',
    });

    navigate('/dashboard/analytics/reports');
  };

  return (
    <PermissionGate required={Permission.ANALYTICS.READ}>
      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <button
          onClick={() => navigate('/dashboard/analytics/reports')}
          className="flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Reports
        </button>

        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Custom Report Configurator</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Define custom aggregation metrics, grouping dimensions, and automated schedules.
          </p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* General Details */}
          <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] space-y-4">
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">General Setup</h2>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                Report Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Q3 Regional Playback & Bandwidth Summary"
                className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of what insight this report provides..."
                className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                >
                  <option value="fleet">Fleet Performance</option>
                  <option value="playback">Playback & Ads</option>
                  <option value="user">User Metrics</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value as any)}
                  className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                >
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase mb-1">
                  Schedule
                </label>
                <select
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value as any)}
                  className="w-full bg-[var(--color-background)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-primary)]"
                >
                  <option value="none">Manual Only</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>
          </div>

          {/* Metrics & Dimensions Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] space-y-3">
              <h2 className="text-base font-semibold text-[var(--color-text-primary)]">Select Metrics</h2>
              <div className="space-y-2">
                {availableMetrics.map((m) => (
                  <label
                    key={m.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] cursor-pointer text-sm font-medium text-[var(--color-text-primary)] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedMetrics.includes(m.id)}
                      onChange={() => toggleMetric(m.id)}
                      className="rounded accent-[var(--color-primary)]"
                    />
                    {m.label}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-[var(--color-surface)] p-6 rounded-xl border border-[var(--color-border)] space-y-3">
              <h2 className="text-base font-semibold text-[var(--color-text-primary)]">Grouping Dimensions</h2>
              <div className="space-y-2">
                {availableDimensions.map((d) => (
                  <label
                    key={d.id}
                    className="flex items-center gap-3 p-2.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] cursor-pointer text-sm font-medium text-[var(--color-text-primary)] transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedDimensions.includes(d.id)}
                      onChange={() => toggleDimension(d.id)}
                      className="rounded accent-[var(--color-primary)]"
                    />
                    {d.label}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Save Action */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard/analytics/reports')}
              className="px-4 py-2 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
            >
              <Save className="w-4 h-4" />
              Save Report Configuration
            </button>
          </div>
        </form>
      </div>
    </PermissionGate>
  );
};
