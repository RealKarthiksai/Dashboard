import { useState } from 'react';
import { AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export interface OfflineDeviceItem {
  id: string;
  name: string;
  location: string;
  lastPing: string;
  issue: string;
}

const DEFAULT_OFFLINE_DEVICES: OfflineDeviceItem[] = [
  { id: 'dev-1', name: 'TS-04-KM-9921 (Cab #432)', location: 'ORR Gachibowli Corridor', lastPing: '2h ago', issue: 'Heartbeat Timeout (No Signal)' },
  { id: 'dev-2', name: 'Airport Gate 14 Screen', location: 'RGIA Airport Terminal 1', lastPing: '45m ago', issue: 'Video Decoding Stall' },
  { id: 'dev-3', name: 'TS-09-UB-8821 (Cab #812)', location: 'Hi-Tech City Corridor', lastPing: '6h ago', issue: 'Battery Voltage Low (<9%)' },
];

export function OfflineDevicesQueueWidget({ devices = DEFAULT_OFFLINE_DEVICES }: { devices?: OfflineDeviceItem[] }) {
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
    <div className="p-4 rounded-xl bg-[var(--color-level-1)] border border-[var(--color-border)] space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          Offline & High Alert Screens ({devices.length})
        </h2>
        <span className="text-xs text-slate-400 font-mono">Live Telemetry Queue</span>
      </div>

      {restartedSuccess && (
        <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {restartedSuccess}
        </div>
      )}

      <div className="space-y-2">
        {devices.map(dev => (
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
  );
}
