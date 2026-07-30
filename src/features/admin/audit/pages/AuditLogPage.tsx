import React, { useEffect, useState } from 'react';
import { adminRepository } from '../../repositories/AdminRepository';
import type { AuditLogEvent } from '../../data/types';
import { PermissionGate } from '@/shared/components/PermissionGate';
import { Permission } from '@/core/authorization/permissions';
import { DataTable, type Column } from '@/shared/components/data-display/DataTable';
import { ShieldAlert, CheckCircle, AlertTriangle, Terminal } from 'lucide-react';

export const AuditLogPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const data = await adminRepository.getAuditLogs();
      setLogs(data);
      setLoading(false);
    };
    fetchLogs();
  }, []);

  const columns: Column<AuditLogEvent>[] = [
    {
      header: 'Timestamp',
      cell: (log: AuditLogEvent) => (
        <span className="font-mono text-xs text-[var(--color-text-muted)]">
          {new Date(log.timestamp).toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Operator / Actor',
      cell: (log: AuditLogEvent) => (
        <div>
          <div className="font-semibold text-xs text-[var(--color-text-primary)]">
            {log.actorName}
          </div>
          <div className="text-[10px] text-[var(--color-text-muted)]">{log.actorEmail}</div>
        </div>
      ),
    },
    {
      header: 'Action Logged',
      cell: (log: AuditLogEvent) => (
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-[var(--color-surface-hover)] border border-[var(--color-border)] text-[var(--color-primary)]">
            <Terminal className="w-3.5 h-3.5" />
          </div>
          <span className="font-mono font-bold text-xs text-[var(--color-text-primary)]">
            {log.action}
          </span>
        </div>
      ),
    },
    {
      header: 'Target Resource',
      cell: (log: AuditLogEvent) => (
        <span className="text-xs text-[var(--color-text-muted)]">{log.targetResource}</span>
      ),
    },
    {
      header: 'IP Address',
      cell: (log: AuditLogEvent) => (
        <span className="font-mono text-xs text-[var(--color-text-muted)]">{log.ipAddress}</span>
      ),
    },
    {
      header: 'Status',
      cell: (log: AuditLogEvent) => {
        const badges = {
          success: (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <CheckCircle className="w-3 h-3" /> Success
            </span>
          ),
          warning: (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <AlertTriangle className="w-3 h-3" /> Warning
            </span>
          ),
          failed: (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-rose-500/10 text-rose-500 border border-rose-500/20">
              <ShieldAlert className="w-3 h-3" /> Failed
            </span>
          ),
        };
        return badges[log.status];
      },
    },
  ];

  return (
    <PermissionGate required={Permission.USERS.READ}>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">Security Audit Log Viewer</h1>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            Immutable audit record of all administrative operations, role changes, and device commands executed across TrotOS.
          </p>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center text-[var(--color-text-muted)]">
            Loading security logs...
          </div>
        ) : (
          <DataTable data={logs} columns={columns} keyExtractor={(l) => l.id} />
        )}
      </div>
    </PermissionGate>
  );
};
