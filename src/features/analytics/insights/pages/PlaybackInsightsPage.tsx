import React, { useEffect, useState } from 'react';
import { analyticsRepository } from '../../repositories/AnalyticsRepository';
import type { PlaybackTimeSeriesPoint } from '../../data/types';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { PlayCircle, CheckCircle2, AlertCircle, Award, RefreshCw } from 'lucide-react';

export const PlaybackInsightsPage: React.FC = () => {
  const [dataPoints, setDataPoints] = useState<PlaybackTimeSeriesPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const fetchPlaybackInsights = async () => {
    setLoading(true);
    const data = await analyticsRepository.getPlaybackInsights(days);
    setDataPoints(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlaybackInsights();
  }, [days]);

  const totalImpressions = dataPoints.reduce((sum, p) => sum + p.totalImpressions, 0);
  const totalCompleted = dataPoints.reduce((sum, p) => sum + p.completedPlays, 0);
  const totalFailed = dataPoints.reduce((sum, p) => sum + p.failedPlays, 0);
  const avgProofOfPlay =
    dataPoints.length > 0
      ? ((totalCompleted / (totalImpressions || 1)) * 100).toFixed(2)
      : '0.00';

  return (
    <PermissionGate required={Permission.ANALYTICS.READ}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Playback & Ad Analytics
            </h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Proof-of-play delivery, impression metrics, and campaign verification tracking.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="bg-[var(--color-surface)] text-[var(--color-text-primary)] border border-[var(--color-border)] rounded-lg px-3 py-1.5 text-sm font-medium outline-none focus:border-[var(--color-primary)]"
            >
              <option value={7}>Last 7 Days</option>
              <option value={30}>Last 30 Days</option>
              <option value={90}>Last 90 Days</option>
            </select>
            <button
              onClick={fetchPlaybackInsights}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-sm font-medium text-[var(--color-text-primary)] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <span>Total Impressions</span>
              <PlayCircle className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">
              {totalImpressions.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">
              Delivered across all playlists
            </div>
          </div>

          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <span>Verified Plays</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">
              {totalCompleted.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Full 100% video playback</div>
          </div>

          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <span>Playback Dropouts</span>
              <AlertCircle className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">
              {totalFailed.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Interrupted or error state</div>
          </div>

          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <span>Proof-of-Play Ratio</span>
              <Award className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">
              {avgProofOfPlay}%
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">
              Audit pass rate threshold
            </div>
          </div>
        </div>

        {/* Charts */}
        {loading ? (
          <div className="h-64 flex items-center justify-center text-[var(--color-text-muted)] border border-dashed border-[var(--color-border)] rounded-xl">
            Loading playback insights...
          </div>
        ) : (
          <div className="bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)]">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
              Daily Impression & Delivery Pacing
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dataPoints}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                  <XAxis dataKey="date" stroke="var(--color-text-muted)" fontSize={12} />
                  <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalImpressions"
                    name="Total Impressions"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="completedPlays"
                    name="Completed Plays"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="failedPlays"
                    name="Failed Plays"
                    stroke="#f43f5e"
                    strokeWidth={1.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </PermissionGate>
  );
};
