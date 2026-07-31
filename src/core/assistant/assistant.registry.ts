import type { AssistantProfileKey } from '../experiences/experience.types';

export interface AssistantProfile {
  statusLine: string;
  suggestedPrompts: string[];
  tools: string[];
  memory: string[];
}

export const ASSISTANT_REGISTRY: Record<AssistantProfileKey, AssistantProfile> = {
  FLEET: {
    statusLine: '3 devices offline · 2 tickets open',
    suggestedPrompts: [
      'Which devices have been offline > 2 hours?',
      'Show me maintenance tickets due today',
      'Which sites have the most alerts this week?',
    ],
    tools: ['device_restart', 'create_ticket', 'assign_technician'],
    memory: ['fleet_health', 'maintenance_queue', 'active_alerts'],
  },
  TECHNICIAN: {
    statusLine: 'Job #901 · Gate 14 · 09:30 AM',
    suggestedPrompts: [
      'What tools do I need for this installation?',
      'Show me the device history for this serial',
      'How do I run the diagnostic check?',
    ],
    tools: ['scan_qr', 'run_diagnostics', 'commission_device'],
    memory: ['assigned_jobs', 'current_job_state'],
  },
  ADVERTISER: {
    statusLine: 'Campaign A: 18,400 impr today',
    suggestedPrompts: [
      'How is Campaign A performing vs last week?',
      'Which screens delivered the most impressions today?',
      'When does my campaign end?',
    ],
    tools: ['view_proof_of_play', 'extend_campaign'],
    memory: ['active_campaigns', 'impression_data'],
  },
  OWNER: {
    statusLine: 'Active & Syncing · 148/150 online',
    suggestedPrompts: [
      'What needs my attention today?',
      'Show me revenue vs last month',
      'Which campaigns are ending this week?',
    ],
    tools: ['full_access'],
    memory: ['fleet_health', 'revenue', 'campaigns', 'maintenance'],
  },
  DRIVER: {
    statusLine: 'Your screen is online',
    suggestedPrompts: ['Report a screen problem', 'Contact support'],
    tools: ['report_problem'],
    memory: ['vehicle_status'],
  },
  SUPPORT: {
    statusLine: '5 open tickets · 2 critical',
    suggestedPrompts: [
      'Show me all critical tickets',
      'Which organizations have the most issues?',
      'Run remote diagnostic for a device',
    ],
    tools: ['device_restart', 'reset_password', 'run_diagnostics'],
    memory: ['open_tickets', 'recent_org_issues'],
  },
  CONTENT: {
    statusLine: 'All schedules live · 12 playlists active',
    suggestedPrompts: [
      'Which playlists are expiring this week?',
      'Show me screens with no active content',
      'What played most this month?',
    ],
    tools: ['schedule_content', 'preview_playlist'],
    memory: ['active_playlists', 'schedules'],
  },
  PLATFORM: {
    statusLine: 'Platform OK · 42 orgs active',
    suggestedPrompts: [
      'Show organizations approaching license limit',
      'Which tenants have unpaid invoices?',
      'Platform health summary',
    ],
    tools: ['suspend_org', 'extend_trial', 'adjust_license'],
    memory: ['org_health', 'billing_status', 'platform_metrics'],
  },
};
