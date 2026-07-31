import { useState } from 'react';
import { 
  MonitorSmartphone, 
  AlertTriangle, 
  MessageSquare, 
  PhoneCall, 
  CheckCircle2, 
  Wifi, 
  Battery
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function DriverDashboard() {
  const [problemReported, setProblemReported] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const handleSubmitProblem = (issue: string) => {
    setSelectedIssue(issue);
    setProblemReported(true);
  };

  return (
    <div className="max-w-md mx-auto space-y-4 font-sans text-slate-100">
      {/* VEHICLE STATUS HEADER CARD */}
      <div className="p-4 rounded-xl bg-[#141E2F] border border-slate-700/80 space-y-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MonitorSmartphone className="w-5 h-5 text-indigo-400" />
            <span className="font-bold text-white text-base">Vehicle Cab #432</span>
          </div>
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            ONLINE
          </span>
        </div>

        <div className="p-3 rounded-lg bg-[#0F172A] border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-300">
            <span>Current Playlist Loop:</span>
            <span className="font-semibold text-cyan-300">Route 7 Passenger Ads</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>5G Connectivity:</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <Wifi className="w-3.5 h-3.5 text-emerald-400" /> 5G LTE (−78 dBm)
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Hardware Power:</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <Battery className="w-3.5 h-3.5 text-emerald-400" /> 84% Battery
            </span>
          </div>
        </div>
      </div>

      {/* REPORT A PROBLEM CARD */}
      {!problemReported ? (
        <div className="p-4 rounded-xl bg-[#141E2F] border border-slate-700 space-y-3">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            Report a Screen Issue
          </h2>
          <p className="text-xs text-slate-300">Select what is wrong with the passenger display tablet:</p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              '🖥️ Screen is Black',
              '🔇 No Audio / Sound',
              '📵 5G Offline',
              '🧊 Screen Frozen',
              '🔨 Mount Broken',
              '✏️ Other Problem',
            ].map(issue => (
              <button
                key={issue}
                onClick={() => handleSubmitProblem(issue)}
                className="p-3 rounded-lg bg-[#0F172A] border border-slate-700/70 hover:border-indigo-500 font-medium text-left text-slate-200 transition-all"
              >
                {issue}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 text-xs">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
          <h3 className="font-bold text-white text-sm">Ticket Sent to Fleet Manager</h3>
          <p className="text-slate-300">Issue reported: <span className="font-bold text-cyan-300">{selectedIssue}</span></p>
          <p className="text-[11px] text-slate-400">Our operations team will remotely inspect your device shortly.</p>
          <Button variant="secondary" size="sm" onClick={() => setProblemReported(false)} className="text-xs">
            Report Another Issue
          </Button>
        </div>
      )}

      {/* MESSAGES & SUPPORT */}
      <div className="p-4 rounded-xl bg-[#141E2F] border border-slate-700 space-y-3 text-xs">
        <div className="flex items-center justify-between font-bold text-white">
          <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4 text-indigo-400" /> Dispatch Messages</span>
          <span className="text-[10px] text-slate-400 font-normal">0 Unread</span>
        </div>
        <div className="p-3 rounded-lg bg-[#0F172A] text-slate-400 italic text-center">
          No new messages from fleet manager.
        </div>

        <Button variant="secondary" className="w-full text-xs font-bold gap-2 py-2">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" /> Call 24/7 Driver Support Hotline
        </Button>
      </div>
    </div>
  );
}
