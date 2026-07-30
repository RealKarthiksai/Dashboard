import { AlertTriangle, Clock, RefreshCw, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';

export interface AlertItem {
  id: string;
  time: string;
  title: string;
  location: string;
  severity: 'critical' | 'warning';
  actionText: string;
}

const MOCK_ALERTS: AlertItem[] = [
  {
    id: 'alt_1',
    time: '09:42',
    title: 'Screen 104 Offline',
    location: 'London Heathrow Terminal 2',
    severity: 'critical',
    actionText: 'Reboot Device',
  },
  {
    id: 'alt_2',
    time: '09:37',
    title: 'Campaign Expiring',
    location: 'Summer Promo (14 Screens)',
    severity: 'warning',
    actionText: 'Extend Schedule',
  },
  {
    id: 'alt_3',
    time: '09:12',
    title: 'Firmware Update Available',
    location: '24 Regional Fleet Displays',
    severity: 'warning',
    actionText: 'Schedule Update',
  },
];

export function AlertTimeline() {
  return (
    <div className="p-5 rounded-[16px] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-level-1)] space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-[var(--color-danger)]" />
          Attention Needed
        </h2>
        <span className="text-xs text-[var(--color-text-muted)] font-medium">3 Active Incidents</span>
      </div>

      <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--color-border)]">
        {MOCK_ALERTS.map((item) => (
          <div key={item.id} className="relative pl-7 flex items-start justify-between gap-4">
            
            {/* Timeline Dot */}
            <div
              className={`absolute left-1.5 top-1.5 w-3 h-3 rounded-full border-2 border-[var(--color-surface)] ${
                item.severity === 'critical' ? 'bg-[var(--color-danger)]' : 'bg-[var(--color-warning)]'
              }`}
            />

            {/* Event Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[var(--color-text-muted)] font-medium">
                  {item.time}
                </span>
                <h3 className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 truncate">
                {item.location}
              </p>
            </div>

            {/* Action Button */}
            <Button variant="secondary" size="sm" className="flex-shrink-0 text-[11px] h-7 px-2.5">
              {item.actionText.includes('Reboot') && <RefreshCw className="h-3 w-3 mr-1" />}
              {item.actionText.includes('Extend') && <Calendar className="h-3 w-3 mr-1" />}
              {item.actionText.includes('Schedule') && <Clock className="h-3 w-3 mr-1" />}
              {item.actionText}
            </Button>

          </div>
        ))}
      </div>
    </div>
  );
}
