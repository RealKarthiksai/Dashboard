import { useState } from 'react';
import { 
  Activity, 
  WifiOff, 
  Wrench, 
  AlertTriangle, 
  RefreshCw, 
  CheckCircle2, 
  Users, 
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export function FleetManagerDashboard() {
  const navigate = useNavigate();
  const [restartingDevId, setRestartingDevId] = useState<string | null>(null);
  const [restartedSuccess, setRestartedSuccess] = useState<string | null>(null);

  const handleQuickRestart = (id: string, name: string) => {
    setRestartingDevId(id);
    setTimeout(() => {
      setRestartingDevId(null);
      setRestartedSuccess(`Successfully sent reboot signal to ${name}`);
      setTimeout(() => setRestartedSuccess(null), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--color-border)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-xl font-bold text-[var(--color-text-primary)]">Fleet Operations Console</h1>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Real-time telemetry, hardware health, and maintenance queues.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate('/dashboard/operations/devices')}>
            View All Devices
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate('/dashboard/operations/maintenance')}>
            + New Work Order
          </Button>
        </div>
      </div>

      {restartedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {restartedSuccess}
        </div>
      )}

      {/* KPI METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
            <span>Fleet Uptime Rate</span>
            <Activity className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-[var(--color-text-primary)]">98.7%</div>
          <div className="text-[11px] text-emerald-400 font-semibold">148 / 150 Devices Online</div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
            <span>Offline Devices</span>
            <WifiOff className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-extrabold text-rose-400">3</div>
          <div className="text-[11px] text-rose-400 font-semibold">Requires Immediate Attention</div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
            <span>Open Work Orders</span>
            <Wrench className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400">2</div>
          <div className="text-[11px] text-slate-400">Avg Resolution: 2.4 hrs</div>
        </div>

        <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-1">
          <div className="flex items-center justify-between text-xs text-[var(--color-text-muted)] font-medium">
            <span>Active Technicians</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-[var(--color-text-primary)]">4</div>
          <div className="text-[11px] text-emerald-400 font-semibold">1 On Site · 3 Available</div>
        </div>
      </div>

      {/* 2-COLUMN OPERATIONS WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: OFFLINE SCREENS & QUICK RESTART */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                Offline & High Alert Screens (3)
              </h2>
              <span className="text-xs text-slate-400 font-mono">Live Telemetry Queue</span>
            </div>

            <div className="space-y-2">
              {[
                { id: 'dev-1', name: 'TS-04-KM-9921 (Cab #432)', location: 'ORR Gachibowli Corridor', lastPing: '2h ago', issue: 'Heartbeat Timeout (No Signal)' },
                { id: 'dev-2', name: 'Airport Gate 14 Screen', location: 'RGIA Airport Terminal 1', lastPing: '45m ago', issue: 'Video Decoding Stall' },
                { id: 'dev-3', name: 'TS-09-UB-8821 (Cab #812)', location: 'Hi-Tech City Corridor', lastPing: '6h ago', issue: 'Battery Voltage Low (<9%)' },
              ].map(dev => (
                <div key={dev.id} className="p-3 rounded-lg bg-[var(--color-level-2)] border border-[var(--color-border)] flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5 min-w-0">
                    <div className="font-bold text-[var(--color-text-primary)] truncate">{dev.name}</div>
                    <div className="text-[11px] text-[var(--color-text-muted)] truncate">{dev.location} · {dev.lastPing}</div>
                    <div className="text-[11px] text-rose-400 font-semibold">{dev.issue}</div>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="text-xs shrink-0 gap-1"
                    disabled={restartingDevId === dev.id}
                    onClick={() => handleQuickRestart(dev.id, dev.name)}
                  >
                    {restartingDevId === dev.id ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      'Quick Reboot'
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: MAINTENANCE QUEUE & TECHNICIAN STATUS */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-[var(--color-text-primary)]">Maintenance & Field Queue</h2>
              <button 
                onClick={() => navigate('/dashboard/operations/maintenance')}
                className="text-xs text-[var(--color-primary)] font-semibold hover:underline flex items-center gap-1"
              >
                Full Queue <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-lg bg-[var(--color-level-2)] border border-[var(--color-border)] space-y-1.5">
                <div className="flex items-center justify-between font-mono font-bold text-amber-400">
                  <span>WO-2026-0881</span>
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">ON SITE</span>
                </div>
                <div className="font-semibold text-[var(--color-text-primary)]">RGIA Airport — Gate 14 Screen Replacement</div>
                <div className="text-slate-400 text-[11px]">Assigned Tech: Rajesh Kumar (Tech-04)</div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--color-level-2)] border border-[var(--color-border)] space-y-1.5">
                <div className="flex items-center justify-between font-mono font-bold text-indigo-400">
                  <span>JOB-2026-902</span>
                  <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px]">ASSIGNED</span>
                </div>
                <div className="font-semibold text-[var(--color-text-primary)]">Cab #432 Trot-Tab Security Cradle Pairing</div>
                <div className="text-slate-400 text-[11px]">Assigned Tech: Tech-04 · ETA: 2:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
