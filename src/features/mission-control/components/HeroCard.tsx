import { Sparkles, Send, Bell } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/shared/components/indicators/StatusBadge';

interface HeroCardProps {
  userName: string;
  totalScreens: number;
  onlineScreens: number;
  attentionScreens: number;
  onDeployContent?: () => void;
  onViewAlerts?: () => void;
}

export function HeroCard({
  userName,
  totalScreens,
  onlineScreens,
  attentionScreens,
  onDeployContent,
  onViewAlerts,
}: HeroCardProps) {
  const isHealthy = attentionScreens === 0;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[var(--color-level-3)] border border-[var(--color-border)] shadow-xl p-6 md:p-8 telemetry-grid">
      
      {/* Subtle Gradient Glow background overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-primary-glow)] blur-3xl rounded-full pointer-events-none -mr-20 -mt-20 opacity-40" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: Greeting & Health Statement */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
              Good Morning, {userName}.
            </h1>
            <StatusBadge status={isHealthy ? 'healthy' : 'warning'} label={isHealthy ? 'Fleet Optimal' : 'Attention Needed'} />
          </div>

          <p className="text-sm text-[var(--color-text-secondary)] font-medium leading-relaxed">
            {isHealthy
              ? 'All 150 enterprise screen clusters and media channels are operating at peak efficiency.'
              : `${attentionScreens} displays require active operational intervention.`}
          </p>

          {/* Fleet Numbers summary */}
          <div className="flex items-center gap-3 text-xs font-semibold text-[var(--color-text-primary)] pt-1">
            <div className="flex items-center gap-2 bg-[var(--color-level-2)] px-3 py-1.5 rounded-xl border border-[var(--color-border)] shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-emerald-400 font-bold">{onlineScreens} / {totalScreens}</span>
              <span className="text-[var(--color-text-secondary)]">Screens Online</span>
            </div>
            <div className="flex items-center gap-2 bg-[var(--color-level-2)] px-3 py-1.5 rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] shadow-xs">
              <span className="h-2 w-2 rounded-full bg-amber-400"></span>
              <span className="font-mono text-amber-400 font-bold">{attentionScreens}</span>
              <span>Pending Alerts</span>
            </div>
          </div>
        </div>

        {/* Right: Trot Assistant Callout & Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
          
          {/* Trot Assistant Proactive Insight Badge */}
          <div className="p-3.5 rounded-2xl bg-[var(--color-level-2)] border border-[var(--color-border)] max-w-xs space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--color-primary)]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Trot Assistant Insight</span>
            </div>
            <p className="text-[11px] text-[var(--color-text-secondary)] font-medium">
              Bandwidth utilization down 14% following automatic H.265 transcoding.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="primary"
              size="md"
              onClick={onDeployContent}
              className="shadow-[var(--shadow-glow)] font-bold text-xs flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              Deploy Schedule
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick={onViewAlerts}
              className="text-xs font-semibold flex items-center gap-2"
            >
              <Bell className="w-3.5 h-3.5" />
              View Alerts
            </Button>
          </div>

        </div>

      </div>

    </div>
  );
}
