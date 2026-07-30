import { Calendar, Clock, DownloadCloud, Trash2, Wrench } from 'lucide-react';

export interface UpcomingItem {
  id: string;
  time: string;
  title: string;
  type: 'campaign' | 'firmware' | 'maintenance' | 'cleanup';
}

const MOCK_UPCOMING: UpcomingItem[] = [
  {
    id: 'up_1',
    time: '14:00',
    title: 'Campaign ends: "Spring Clearance"',
    type: 'campaign',
  },
  {
    id: 'up_2',
    time: '18:00',
    title: 'Firmware update window begins (v2.4)',
    type: 'firmware',
  },
  {
    id: 'up_3',
    time: '23:00',
    title: 'Automated storage cleanup',
    type: 'cleanup',
  },
  {
    id: 'up_4',
    time: 'Tomorrow, 02:00',
    title: 'Scheduled maintenance window',
    type: 'maintenance',
  },
];

export function UpcomingSchedule() {
  return (
    <div className="p-5 rounded-[16px] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-level-1)] space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <Calendar className="h-4 w-4 text-[var(--color-info)]" />
          Upcoming / Today
        </h2>
        <span className="text-xs text-[var(--color-text-muted)] font-medium">4 Scheduled</span>
      </div>

      <div className="space-y-3">
        {MOCK_UPCOMING.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)]">
            <div className="flex items-center gap-2.5 min-w-0">
              {item.type === 'campaign' && <Clock className="h-4 w-4 text-[var(--color-warning)] flex-shrink-0" />}
              {item.type === 'firmware' && <DownloadCloud className="h-4 w-4 text-[var(--color-primary)] flex-shrink-0" />}
              {item.type === 'cleanup' && <Trash2 className="h-4 w-4 text-[var(--color-text-muted)] flex-shrink-0" />}
              {item.type === 'maintenance' && <Wrench className="h-4 w-4 text-[var(--color-danger)] flex-shrink-0" />}
              
              <span className="text-xs font-medium text-[var(--color-text-primary)] truncate">
                {item.title}
              </span>
            </div>

            <span className="text-[10px] font-mono font-semibold text-[var(--color-text-muted)] flex-shrink-0">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
