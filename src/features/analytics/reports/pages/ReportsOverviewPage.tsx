import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyticsRepository } from '../../repositories/AnalyticsRepository';
import type { CustomReport } from '../../data/types';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { DataTable, type Column } from '@/shared/components/data-display/DataTable';
import { Plus, FileText, Calendar, Trash2, Play } from 'lucide-react';

export const ReportsOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<CustomReport[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    setLoading(true);
    const data = await analyticsRepository.getReports();
    setReports(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this custom report configuration?')) {
      await analyticsRepository.deleteReport(id);
      fetchReports();
    }
  };

  const columns: Column<CustomReport>[] = [
    {
      header: 'Report Title',
      cell: (report: CustomReport) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[var(--color-surface-hover)] border border-[var(--color-border)]">
            <FileText className="w-4 h-4 text-[var(--color-primary)]" />
          </div>
          <div>
            <div className="font-semibold text-[var(--color-text-primary)]">{report.title}</div>
            <div className="text-xs text-[var(--color-text-muted)] line-clamp-1">
              {report.description}
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      cell: (report: CustomReport) => (
        <span className="capitalize px-2.5 py-1 text-xs font-semibold rounded-full bg-[var(--color-surface-hover)] text-[var(--color-text-primary)] border border-[var(--color-border)]">
          {report.category}
        </span>
      ),
    },
    {
      header: 'Schedule',
      cell: (report: CustomReport) => (
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] capitalize">
          <Calendar className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
          {report.schedule}
        </div>
      ),
    },
    {
      header: 'Created By',
      accessorKey: 'createdBy',
    },
    {
      header: 'Last Run',
      cell: (report: CustomReport) =>
        new Date(report.lastRunAt).toLocaleDateString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
    },
    {
      header: 'Actions',
      cell: (report: CustomReport) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => alert(`Running report: ${report.title}`)}
            className="p-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] text-xs font-medium text-[var(--color-text-primary)] flex items-center gap-1"
            title="Run Report Now"
          >
            <Play className="w-3.5 h-3.5 text-emerald-500" />
            Run
          </button>
          <button
            onClick={(e) => handleDelete(report.id, e)}
            className="p-1.5 rounded-lg border border-[var(--color-border)] hover:bg-rose-500/10 text-rose-500 transition-colors"
            title="Delete Report"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <PermissionGate required={Permission.ANALYTICS.READ}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Custom Reports Builder</h1>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">
              Create, schedule, and run specialized performance and operational analytics reports.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/analytics/reports/new')}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Create Custom Report
          </button>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-[var(--color-text-muted)]">
            Loading custom reports...
          </div>
        ) : (
          <DataTable
            data={reports}
            columns={columns}
            keyExtractor={(r) => r.id}
          />
        )}
      </div>
    </PermissionGate>
  );
};
