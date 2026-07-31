import { useState } from 'react';
import { 
  Shield, 
  Search, 
  Terminal, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Building2,
  MonitorSmartphone
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function SupportDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [runningDiagId, setRunningDiagId] = useState<string | null>(null);
  const [diagResult, setDiagResult] = useState<string | null>(null);

  const handleRunDiag = (ticketId: string, devName: string) => {
    setRunningDiagId(ticketId);
    setTimeout(() => {
      setRunningDiagId(null);
      setDiagResult(`Diagnostic Pass for ${devName}: 5G Signal OK (−76 dBm), TrotOS Player Daemon Running v4.2.1`);
      setTimeout(() => setDiagResult(null), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-400" />
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Customer Support Console</h1>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Cross-tenant diagnostics, ticket resolution, and remote device commands.</p>
        </div>
      </div>

      {diagResult && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {diagResult}
        </div>
      )}

      {/* SEARCH ORGS / DEVICES BAR */}
      <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-2">
        <label className="text-xs font-bold text-[var(--color-text-primary)]">Search Customer Organization or Device ID</label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Org Name (e.g. Acme Enterprise), Device SN, or Ticket #"
            className="w-full pl-9 pr-3 py-2 bg-[var(--color-level-2)] border border-[var(--color-border)] rounded-lg text-xs text-[var(--color-text-primary)]"
          />
        </div>
      </div>

      {/* 2-COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: OPEN SUPPORT TICKETS */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Active Customer Support Tickets (3)
              </h2>
              <span className="text-xs text-slate-400 font-mono">Agent: Support-02</span>
            </div>

            <div className="space-y-3">
              {[
                { id: 'TCK-2048', org: 'Acme Enterprise Corp', dev: 'TS-04-KM-9921', issue: 'Display blank screen after power cycle', severity: 'Critical', time: '12m ago' },
                { id: 'TCK-2049', org: 'Telangana Transit Hub', dev: 'Airport Gate 14 Screen', issue: 'Campaign schedule lag', severity: 'Medium', time: '45m ago' },
                { id: 'TCK-2050', org: 'Retail Ads India', dev: 'TS-09-UB-8821', issue: 'Unable to sync video asset', severity: 'Low', time: '2h ago' },
              ].map(tck => (
                <div key={tck.id} className="p-3.5 rounded-lg bg-[var(--color-level-2)] border border-[var(--color-border)] space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-indigo-400">{tck.id}</span>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {tck.severity}
                      </span>
                    </div>
                    <span className="text-slate-400 text-[11px]">{tck.time}</span>
                  </div>

                  <div className="font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                    {tck.org}
                  </div>

                  <div className="text-slate-300 flex items-center gap-1.5">
                    <MonitorSmartphone className="w-3.5 h-3.5 text-slate-400" />
                    <span>Device: {tck.dev} — {tck.issue}</span>
                  </div>

                  <div className="pt-2 border-t border-[var(--color-border)]/60 flex items-center justify-end gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-xs"
                      disabled={runningDiagId === tck.id}
                      onClick={() => handleRunDiag(tck.id, tck.dev)}
                    >
                      {runningDiagId === tck.id ? <RefreshCw className="w-3 h-3 animate-spin" /> : 'Run Remote Diagnostic'}
                    </Button>
                    <Button variant="primary" size="sm" className="text-xs" onClick={() => navigate('/dashboard/operations/devices')}>
                      Open Device Console →
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: SUPPORT AUDIT TRAIL */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                Support Audit Log
              </h2>
              <button onClick={() => navigate('/dashboard/admin/audit')} className="text-xs text-[var(--color-primary)] font-semibold hover:underline">
                View All
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-[var(--color-level-2)] space-y-1">
                <div className="font-bold text-[var(--color-text-primary)]">Remote Reboot Command</div>
                <div className="text-[11px] text-slate-400">Device TS-04-KM-9921 · Agent Support-02</div>
                <div className="text-[10px] text-slate-500 font-mono">Today 08:45 AM</div>
              </div>
              <div className="p-2.5 rounded-lg bg-[var(--color-level-2)] space-y-1">
                <div className="font-bold text-[var(--color-text-primary)]">Password Reset Issued</div>
                <div className="text-[11px] text-slate-400">User fleet@acme.com · Agent Support-02</div>
                <div className="text-[10px] text-slate-500 font-mono">Yesterday 04:12 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
