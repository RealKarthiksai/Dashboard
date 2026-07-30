import React, { useEffect, useState } from 'react';
import { analyticsRepository } from '../../repositories/AnalyticsRepository';
import type { UserMetricSummary, SystemUsageTimeSeriesPoint } from '../../data/types';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { DataTable, type Column } from '@/shared/components/data-display/DataTable';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Users, Activity, ShieldCheck, Clock } from 'lucide-react';

export const UserMetricsPage: React.FC = () => {
  const [users, setUsers] = useState<UserMetricSummary[]>([]);
  const [systemUsage, setSystemUsage] = useState<SystemUsageTimeSeriesPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [uData, sData] = await Promise.all([
        analyticsRepository.getUserMetrics(),
        analyticsRepository.getSystemUsage(30),
      ]);
      setUsers(uData);
      setSystemUsage(sData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const totalLogins = users.reduce((sum, u) => sum + u.loginCount, 0);
  const totalActions = users.reduce((sum, u) => sum + u.actionsPerformed, 0);

  const columns: Column<UserMetricSummary>[] = [
    {
      header: 'Operator Name',
      cell: (user: UserMetricSummary) => (
        <div>
          <div className="font-semibold text-[var(--color-text-primary)]">{user.userName}</div>
          <div className="text-xs text-[var(--color-text-muted)]">{user.userEmail}</div>
        </div>
      ),
    },
    {
      header: 'Role',
      accessorKey: 'role',
    },
    {
      header: 'Status',
      cell: (user: UserMetricSummary) => {
        const colors = {
          active: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
          idle: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
          offline: 'bg-slate-500/10 text-slate-500 border-slate-500/20',
        };
        return (
          <span
            className={`capitalize px-2.5 py-1 text-xs font-semibold rounded-full border ${colors[user.status]}`}
          >
            {user.status}
          </span>
        );
      },
    },
    {
      header: 'Total Logins',
      accessorKey: 'loginCount',
    },
    {
      header: 'Actions Logged',
      accessorKey: 'actionsPerformed',
    },
    {
      header: 'Last Active',
      cell: (user: UserMetricSummary) =>
        new Date(user.lastActiveAt).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
  ];

  return (
    <PermissionGate required={Permission.ANALYTICS.READ}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">User & Team Metrics</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Track operator usage trends, login volume, system interaction frequency, and API demand.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <span>Active Operators</span>
              <Users className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">
              {users.filter((u) => u.status === 'active').length} / {users.length}
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Currently active sessions</div>
          </div>

          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <span>Total Session Logins</span>
              <Clock className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">
              {totalLogins.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Across all team roles</div>
          </div>

          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <span>Audit Logged Actions</span>
              <Activity className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">
              {totalActions.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Mutations & command executions</div>
          </div>

          <div className="bg-[var(--color-surface)] p-4 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-[var(--color-text-muted)] text-sm">
              <span>API Gateway Health</span>
              <ShieldCheck className="w-4 h-4 text-teal-500" />
            </div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">99.94%</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Sub-100ms avg latency</div>
          </div>
        </div>

        {/* API Usage Chart */}
        {!loading && (
          <div className="bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)]">
            <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
              Daily Operator API Traffic Volume
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={systemUsage}>
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
                  <Bar dataKey="apiRequests" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Operator Directory Table */}
        <div className="bg-[var(--color-surface)] p-5 rounded-xl border border-[var(--color-border)]">
          <h3 className="text-base font-semibold text-[var(--color-text-primary)] mb-4">
            Operator Activity Breakdown
          </h3>
          {loading ? (
            <div className="h-48 flex items-center justify-center text-[var(--color-text-muted)]">
              Loading operator metrics...
            </div>
          ) : (
            <DataTable
              data={users}
              columns={columns}
              keyExtractor={(u) => u.id}
            />
          )}
        </div>
      </div>
    </PermissionGate>
  );
};
