import { CheckCircle2, RefreshCw, Megaphone, UserPlus, History } from 'lucide-react';

export interface ActivityItem {
  id: string;
  time: string;
  action: string;
  user: string;
  type: 'deploy' | 'system' | 'campaign' | 'user';
}

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act_1',
    time: '09:44',
    action: 'Playlist "Morning News" deployed to 12 screens',
    user: 'John Doe',
    type: 'deploy',
  },
  {
    id: 'act_2',
    time: '09:32',
    action: 'Device "LDN-102" restarted automatically',
    user: 'System Bot',
    type: 'system',
  },
  {
    id: 'act_3',
    time: '09:25',
    action: 'Campaign "Summer Sale" published',
    user: 'Sarah M.',
    type: 'campaign',
  },
  {
    id: 'act_4',
    time: '09:10',
    action: 'User "marketing@acme.com" invited to Organization',
    user: 'Jane Doe',
    type: 'user',
  },
];

export function ActivityFeed() {
  return (
    <div className="p-5 rounded-[16px] bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-level-1)] space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <History className="h-4 w-4 text-[var(--color-primary)]" />
          Recent Activity
        </h2>
        <span className="text-xs text-[var(--color-text-muted)] font-medium">Last 2 Hours</span>
      </div>

      <div className="space-y-3.5">
        {MOCK_ACTIVITIES.map((item) => (
          <div key={item.id} className="flex items-start gap-3">
            
            {/* Icon representation */}
            <div className="w-6 h-6 rounded-full bg-[var(--color-background)] border border-[var(--color-border)] flex items-center justify-center flex-shrink-0 mt-0.5">
              {item.type === 'deploy' && <CheckCircle2 className="h-3.5 w-3.5 text-[var(--color-success)]" />}
              {item.type === 'system' && <RefreshCw className="h-3.5 w-3.5 text-[var(--color-info)]" />}
              {item.type === 'campaign' && <Megaphone className="h-3.5 w-3.5 text-[var(--color-warning)]" />}
              {item.type === 'user' && <UserPlus className="h-3.5 w-3.5 text-[var(--color-primary)]" />}
            </div>

            {/* Action Content */}
            <div className="min-w-0 flex-1">
              <p className="text-xs text-[var(--color-text-primary)] font-medium leading-snug">
                {item.action}
              </p>
              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[var(--color-text-muted)]">
                <span>{item.user}</span>
                <span>•</span>
                <span>{item.time}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
