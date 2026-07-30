import React, { useEffect, useState } from 'react';
import { analyticsRepository } from '../../repositories/AnalyticsRepository';
import type { FleetTimeSeriesPoint } from '../../data/types';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Activity, WifiOff, HardDrive, Cpu, RefreshCw } from 'lucide-react';

export const FleetInsightsPage: React.FC = () => {
  const [timeSeries, setTimeSeries] = useState<FleetTimeSeriesPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  const fetchInsights = async () => {
    setLoading(true);
    const data = await analyticsRepository.getFleetInsights(days);
    setTimeSeries(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, [days]);

  const latestUptime = timeSeries.length > 0 ? timeSeries[timeSeries.length - 1].uptime : 0;
  const avgUptime =
    timeSeries.length > 0
      ? (timeSeries.reduce((acc, p) => acc + p.uptime, 0) / timeSeries.length).toFixed(2)
      : '0.00';
  const totalOfflineEvents = timeSeries.reduce((acc, p) => acc + p.offlineEvents, 0);
  const totalBandwidth = timeSeries.reduce((acc, p) => acc + p.bandwidthUsageGb, 0).toFixed(1);

  return (
    <PermissionGate required={Permission.ANALYTICS.READ}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Fleet Analytics & Insights</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Real-time fleet health metrics, uptime performance, and operational bottlenecks.
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
              onClick={fetchInsights}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-sm font-medium text-[var(--color-text-primary)] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {/* Summary KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <span>Current Uptime</span>
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">{latestUptime}%</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Avg {avgUptime}% over {days}d</div>
          </div>

          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <span>Offline Incidents</span>
              <WifiOff className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">{totalOfflineEvents}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Across all registered devices</div>
          </div>

          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <span>Total Bandwidth</span>
              <HardDrive className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">{totalBandwidth} GB</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Content & sync payload</div>
          </div>

          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <span>Active Fleet Size</span>
              <Cpu className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">150 Screens</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">98.6% active connection</div>
          </div>
        </div>

        {/* Charts Section */}
        {loading ? (
          <div className="h-64 flex items-center justify-center text-[var(--color-text-muted)] border border-dashed border-[var(--color-border)] rounded-xl">
            Loading analytics...
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Uptime Trend Chart */}
            <div className="bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)]">
              <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
                Fleet Uptime Trend (%)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={timeSeries}>
                    <defs>
                      <linearGradient id="uptimeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="date" stroke="var(--color-text-muted)" fontSize={12} />
                    <YAxis domain={[90, 100]} stroke="var(--color-text-muted)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="uptime"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#uptimeGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bandwidth Consumption Chart */}
            <div className="bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)]">
              <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
                Bandwidth Usage (GB / Day)
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={timeSeries}>
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
                    <Bar dataKey="bandwidthUsageGb" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </PermissionGate>
  );
};
