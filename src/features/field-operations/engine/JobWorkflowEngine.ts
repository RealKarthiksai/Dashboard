import type { JobState } from '../types';

export type JobAction = 
  | 'ACCEPT'
  | 'NAVIGATE'
  | 'ARRIVE'
  | 'START_PAIRING'
  | 'PAIR_SUCCESS'
  | 'COMPLETE_CHECKLIST'
  | 'RUN_DIAGNOSTICS'
  | 'DIAGNOSTIC_PASS'
  | 'DIAGNOSTIC_FAIL'
  | 'RETRY_DIAGNOSTIC'
  | 'SWAP_HARDWARE'
  | 'SUBMIT_SIGNATURE'
  | 'COMMISSION'
  | 'QUEUE_OFFLINE'
  | 'FLUSH_OFFLINE';

export interface StateTransitionRule {
  from: JobState;
  action: JobAction;
  to: JobState;
}

export const JOB_WORKFLOW_RULES: StateTransitionRule[] = [
  { from: 'JOB_ASSIGNED', action: 'ACCEPT', to: 'TECHNICIAN_ACCEPTED' },
  { from: 'TECHNICIAN_ACCEPTED', action: 'NAVIGATE', to: 'EN_ROUTE' },
  { from: 'EN_ROUTE', action: 'ARRIVE', to: 'ARRIVED' },
  { from: 'ARRIVED', action: 'START_PAIRING', to: 'PAIRING' },
  { from: 'PAIRING', action: 'PAIR_SUCCESS', to: 'INSTALLING' },
  { from: 'INSTALLING', action: 'COMPLETE_CHECKLIST', to: 'VERIFYING' },
  { from: 'VERIFYING', action: 'DIAGNOSTIC_PASS', to: 'WAITING_SIGNATURE' },
  { from: 'VERIFYING', action: 'DIAGNOSTIC_FAIL', to: 'FAILED' },
  { from: 'FAILED', action: 'RETRY_DIAGNOSTIC', to: 'VERIFYING' },
  { from: 'FAILED', action: 'SWAP_HARDWARE', to: 'PAIRING' },
  { from: 'WAITING_SIGNATURE', action: 'SUBMIT_SIGNATURE', to: 'COMMISSIONING' },
  { from: 'COMMISSIONING', action: 'COMMISSION', to: 'COMPLETED' },
  { from: 'COMMISSIONING', action: 'QUEUE_OFFLINE', to: 'OFFLINE_QUEUED' },
  { from: 'OFFLINE_QUEUED', action: 'FLUSH_OFFLINE', to: 'COMPLETED' },
];

export class JobWorkflowEngine {
  static getNextState(currentState: JobState, action: JobAction): JobState {
    const rule = JOB_WORKFLOW_RULES.find(r => r.from === currentState && r.action === action);
    if (!rule) {
      console.warn(`[JobWorkflowEngine] Invalid transition: ${currentState} -> Action: ${action}`);
      return currentState;
    }
    return rule.to;
  }

  static isActionAllowed(currentState: JobState, action: JobAction): boolean {
    return JOB_WORKFLOW_RULES.some(r => r.from === currentState && r.action === action);
  }
}
