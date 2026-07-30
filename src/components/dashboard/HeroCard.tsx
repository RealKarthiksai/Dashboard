import { Sparkles, CheckCircle2, AlertTriangle, Send, Bell } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

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
    <div className="relative overflow-hidden rounded-[16px] bg-[var(--color-surface)] border border-[var(--color-border)] border-l-4 border-l-[var(--color-primary)] shadow-[var(--shadow-level-1)] p-6 md:p-8">
      
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: Greeting & Health Statement */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] tracking-tight">
              Good Morning, {userName}.
            </h1>
            {isHealthy ? (
              <Badge variant="success" className="gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Healthy
              </Badge>
            ) : (
              <Badge variant="warning" className="gap-1">
                <AlertTriangle className="h-3.5 w-3.5" /> Attention Needed
              </Badge>
            )}
          </div>

          <p className="text-sm text-[var(--color-text-secondary)] font-medium">
            {isHealthy
              ? 'All major clusters and displays are operating normally.'
              : `${attentionScreens} displays or campaigns require operational intervention.`}
          </p>

          {/* Fleet Numbers summary */}
          <div className="flex items-center gap-4 text-xs font-semibold text-[var(--color-text-primary)] pt-1">
            <div className="flex items-center gap-1.5 bg-[var(--color-background)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>{onlineScreens} / {totalScreens} Screens Online</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[var(--color-background)] px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text-secondary)]">
              <span className="h-2 w-2 rounded-full bg-amber-500"></span>
              <span>{attentionScreens} Need Attention</span>
            </div>
          </div>
        </div>

        {/* Right: Primary Call-to-Action Buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button variant="secondary" onClick={onViewAlerts} className="gap-2 text-xs">
            <Bell className="h-4 w-4" /> View Alerts
          </Button>
          <Button variant="primary" onClick={onDeployContent} className="gap-2 text-xs font-semibold">
            <Send className="h-4 w-4" /> Deploy Content
          </Button>
        </div>

      </div>

      {/* TrotOS Insights Recommendation (Powered by Needle AI) */}
      <div className="mt-6 pt-5 border-t border-[var(--color-border)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs">
          <div className="w-6 h-6 rounded-md bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="font-bold text-[var(--color-text-primary)]">TrotOS Insights: </span>
            <span className="text-[var(--color-text-secondary)]">
              Firmware update v2.4 is available for 24 displays in London Terminal 2.
            </span>
          </div>
        </div>
        <button
          onClick={onDeployContent}
          className="text-xs font-semibold text-[var(--color-primary)] hover:underline flex-shrink-0"
        >
          Review & Apply &rarr;
        </button>
      </div>

    </div>
  );
}
