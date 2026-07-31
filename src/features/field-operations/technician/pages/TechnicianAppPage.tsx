import { useState } from 'react';
import { 
  ClipboardList, 
  History, 
  User, 
  MapPin, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  Camera, 
  RefreshCw, 
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MOCK_TECHNICIAN_JOBS } from '../../data/mockTechnicianJobs';
import { JobWorkflowEngine, type JobAction } from '../../engine/JobWorkflowEngine';
import type { TechnicianJob } from '../../types';
import { mockStore } from '@/features/operations/data/MockDataStore';

export function TechnicianAppPage() {
  const [activeTab, setActiveTab] = useState<'jobs' | 'history' | 'profile'>('jobs');
  const [jobs, setJobs] = useState<TechnicianJob[]>(MOCK_TECHNICIAN_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Form & Simulator states
  const [pairingMethod, setPairingMethod] = useState<'QR' | 'NFC' | 'MANUAL'>('QR');
  const [manualSerialInput, setManualSerialInput] = useState('');
  const [simulatedDistanceMeters] = useState(42); // Within 50m radius
  const [photoCount, setPhotoCount] = useState(0);
  const [signedName, setSignedName] = useState('');
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);
  const [diagnosticFailedSimulated, setDiagnosticFailedSimulated] = useState(false);
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);

  const activeJob = jobs.find(j => j.id === selectedJobId) || null;
  const completedJobs = jobs.filter(j => j.state === 'COMPLETED');

  // Trigger state transition in Job Engine
  const dispatchJobAction = (action: JobAction) => {
    if (!activeJob) return;
    const nextState = JobWorkflowEngine.getNextState(activeJob.state, action);

    // Multi-entity Cross-Persona Synchronization (Directive #7 & #10)
    if (nextState === 'COMPLETED' || action === 'COMMISSION') {
      // 1. Update Device status to ONLINE in MockDataStore
      const newDevId = `dev-commissioned-${Date.now()}`;
      mockStore.devices.unshift({
        id: newDevId,
        name: `${activeJob.title.split('—')[0]} (${activeJob.jobCode})`,
        status: 'online',
        lastSeen: new Date().toISOString(),
        organizationId: 'org_acme',
        organizationName: 'Acme Enterprise Corp',
        groupName: 'Field Commissioned',
        tags: ['Field Commissioned', 'Sprint-17'],
        firmwareVersion: 'v4.2.1-prod',
        hardwareModel: activeJob.requiredHardwareSku,
        resolution: '1920x1080',
        orientation: 'landscape',
        location: {
          city: 'Hyderabad',
          country: 'India',
          timezone: 'Asia/Kolkata',
          coordinates: activeJob.targetCoordinates
        },
        createdAt: new Date().toISOString()
      });
    }

    setJobs(prev => prev.map(j => j.id === activeJob.id ? { ...j, state: nextState } : j));
  };

  // Toggle checklist item
  const toggleChecklist = (checkId: string) => {
    if (!activeJob) return;
    setJobs(prev => prev.map(j => {
      if (j.id !== activeJob.id) return j;
      const nextChecklist = j.checklist.map(c => c.id === checkId ? { ...c, completed: !c.completed } : c);
      return { ...j, checklist: nextChecklist };
    }));
  };

  // Run Hardware Diagnostics Simulator (Directive #6)
  const runDiagnostics = () => {
    setIsDiagnosticRunning(true);
    setTimeout(() => {
      setIsDiagnosticRunning(false);
      if (diagnosticFailedSimulated) {
        dispatchJobAction('DIAGNOSTIC_FAIL');
      } else {
        dispatchJobAction('DIAGNOSTIC_PASS');
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans max-w-md mx-auto border-x border-slate-800 shadow-2xl relative pb-20">
      {/* TOP COMPACT BRANDING BAR */}
      <div className="bg-[#141E2F] border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-sm text-white tracking-wide">TrotOS Field Technician</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOfflineSimulated(!isOfflineSimulated)}
            className={`px-2 py-0.5 text-[10px] font-mono rounded font-bold transition-all border ${
              isOfflineSimulated 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
            }`}
          >
            {isOfflineSimulated ? 'OFFLINE SIMULATED' : '5G ONLINE'}
          </button>
        </div>
      </div>

      {/* MAIN WORKFLOW AREA */}
      <div className="flex-1 p-4 space-y-4">
        {activeTab === 'jobs' && (
          <>
            {!activeJob ? (
              /* JOB QUEUE LIST */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-base font-bold text-white">Assigned Field Jobs ({jobs.filter(j => j.state !== 'COMPLETED').length})</h1>
                  <span className="text-xs text-slate-400 font-mono">Tech: Tech-04</span>
                </div>

                <div className="space-y-3">
                  {jobs.filter(j => j.state !== 'COMPLETED').map(job => (
                    <div
                      key={job.id}
                      onClick={() => setSelectedJobId(job.id)}
                      className="p-4 rounded-xl bg-[#141E2F] border border-slate-700/80 shadow-md space-y-3 cursor-pointer hover:border-indigo-500/60 transition-all"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-indigo-400">{job.jobCode}</span>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                          {job.state.replace('_', ' ')}
                        </span>
                      </div>
                      <h2 className="font-bold text-white text-sm">{job.title}</h2>
                      <div className="text-xs text-slate-400 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{job.siteNodeName}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-slate-400 text-[11px]">Hardware: {job.requiredHardwareSku}</span>
                        <span className="text-emerald-400 font-semibold flex items-center gap-1">
                          Open Job <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* ACTIVE JOB ENGINE STATE RENDERER (Directives #1, #4, #6, #7, #8) */
              <div className="space-y-4">
                {/* Back to Queue Button */}
                <button
                  onClick={() => setSelectedJobId(null)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 mb-1 font-medium"
                >
                  ← Back to Job Queue
                </button>

                {/* State Progress Header */}
                <div className="p-3 rounded-xl bg-[#141E2F] border border-indigo-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-indigo-300 font-bold">{activeJob.jobCode}</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-indigo-600 text-white">
                      STATE: {activeJob.state}
                    </span>
                  </div>
                  <h2 className="font-bold text-white text-sm">{activeJob.title}</h2>
                </div>

                {/* 1. STATE: JOB_ASSIGNED */}
                {activeJob.state === 'JOB_ASSIGNED' && (
                  <div className="p-4 rounded-xl bg-[#1A2436] border border-slate-700 space-y-4 text-xs">
                    <h3 className="font-bold text-white text-sm">Step 1: Job Briefing & Acceptance</h3>
                    <p className="text-slate-300">Review job location and required hardware before accepting assignment.</p>
                    <div className="p-3 rounded-lg bg-[#141E2F] space-y-1">
                      <div className="text-slate-400">Target Site Location:</div>
                      <div className="font-bold text-cyan-300">{activeJob.siteNodeName}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{activeJob.siteAddress}</div>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full py-2.5 text-sm font-bold gap-2"
                      onClick={() => dispatchJobAction('ACCEPT')}
                    >
                      Accept Job Assignment →
                    </Button>
                  </div>
                )}

                {/* 2. STATE: TECHNICIAN_ACCEPTED */}
                {activeJob.state === 'TECHNICIAN_ACCEPTED' && (
                  <div className="p-4 rounded-xl bg-[#1A2436] border border-slate-700 space-y-4 text-xs">
                    <h3 className="font-bold text-white text-sm">Step 2: Start GPS Navigation</h3>
                    <p className="text-slate-300">Job accepted. Launch Google Maps navigation to travel to site.</p>
                    <div className="p-3 rounded-lg bg-[#141E2F] space-y-2">
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-rose-400" />
                        {activeJob.siteAddress}
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full py-2.5 text-sm font-bold gap-2"
                      onClick={() => dispatchJobAction('NAVIGATE')}
                    >
                      Start En-Route Travel →
                    </Button>
                  </div>
                )}

                {/* 3. STATE: EN_ROUTE (GPS Radius Verification Directive #3) */}
                {activeJob.state === 'EN_ROUTE' && (
                  <div className="p-4 rounded-xl bg-[#1A2436] border border-slate-700 space-y-4 text-xs">
                    <h3 className="font-bold text-white text-sm">Step 3: En-Route & Arrival Detection</h3>
                    <div className="p-3 rounded-lg bg-[#141E2F] space-y-2">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Distance to Site Target:</span>
                        <span className="font-mono font-bold text-cyan-300">{simulatedDistanceMeters}m</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[90%]" />
                      </div>
                      <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> GPS Match: Within 50m Site Radius
                      </div>
                    </div>
                    <Button
                      variant="primary"
                      className="w-full py-2.5 text-sm font-bold"
                      onClick={() => dispatchJobAction('ARRIVE')}
                    >
                      Confirm Arrival at Site →
                    </Button>
                  </div>
                )}

                {/* 4. STATE: ARRIVED / PAIRING (3-Path Pairing Directive #4) */}
                {(activeJob.state === 'ARRIVED' || activeJob.state === 'PAIRING') && (
                  <div className="p-4 rounded-xl bg-[#1A2436] border border-slate-700 space-y-4 text-xs">
                    <h3 className="font-bold text-white text-sm">Step 4: Pair Hardware Asset</h3>
                    
                    {/* Pairing Method Selector */}
                    <div className="grid grid-cols-3 gap-2">
                      {(['QR', 'NFC', 'MANUAL'] as const).map(m => (
                        <button
                          key={m}
                          onClick={() => setPairingMethod(m)}
                          className={`py-1.5 rounded-lg font-bold text-xs border transition-all ${
                            pairingMethod === m 
                              ? 'bg-indigo-600 text-white border-indigo-400' 
                              : 'bg-[#141E2F] text-slate-400 border-slate-700'
                          }`}
                        >
                          {m === 'QR' ? 'Scan QR' : m === 'NFC' ? 'NFC Tap' : 'Manual'}
                        </button>
                      ))}
                    </div>

                    {pairingMethod === 'QR' && (
                      <div className="p-6 rounded-xl bg-[#0F172A] border border-indigo-500/40 text-center space-y-2">
                        <QrCode className="w-10 h-10 text-indigo-400 mx-auto animate-pulse" />
                        <div className="text-xs text-white font-semibold">Simulating Camera Scan...</div>
                        <div className="text-[10px] text-slate-400">Point phone camera at tablet QR label</div>
                      </div>
                    )}

                    {pairingMethod === 'MANUAL' && (
                      <div className="space-y-2">
                        <label className="text-slate-300">Enter Serial Number</label>
                        <input
                          type="text"
                          value={manualSerialInput}
                          onChange={(e) => setManualSerialInput(e.target.value)}
                          placeholder="e.g. SN-TAB-88412B"
                          className="w-full px-3 py-2 bg-[#141E2F] border border-slate-700 rounded-lg text-white font-mono"
                        />
                      </div>
                    )}

                    <Button
                      variant="primary"
                      className="w-full py-2.5 text-sm font-bold"
                      onClick={() => {
                        activeJob.pairedSerialNumber = manualSerialInput || 'SN-TAB-88412B';
                        dispatchJobAction('PAIR_SUCCESS');
                      }}
                    >
                      Confirm Pairing (SN-TAB-88412B) →
                    </Button>
                  </div>
                )}

                {/* 5. STATE: INSTALLING (Dynamic Checklist & Photo Upload Directive #5) */}
                {activeJob.state === 'INSTALLING' && (
                  <div className="p-4 rounded-xl bg-[#1A2436] border border-slate-700 space-y-4 text-xs">
                    <h3 className="font-bold text-white text-sm">Step 5: Physical Hardware Checklist & Photos</h3>
                    
                    {/* Dynamic Checklist */}
                    <div className="space-y-2">
                      <div className="text-slate-400 font-semibold">Installation Checklist:</div>
                      {activeJob.checklist.map(item => (
                        <div
                          key={item.id}
                          onClick={() => toggleChecklist(item.id)}
                          className="flex items-center gap-2 p-2.5 rounded-lg bg-[#141E2F] border border-slate-700/70 cursor-pointer hover:border-slate-500"
                        >
                          <input type="checkbox" checked={item.completed} readOnly className="rounded text-indigo-600" />
                          <span className={item.completed ? 'line-through text-slate-500' : 'text-slate-200'}>{item.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Photo Uploader Simulator */}
                    <div className="p-3 rounded-lg bg-[#141E2F] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 font-semibold">Installation Photos (2 Required):</span>
                        <span className="font-mono text-cyan-400 font-bold">{photoCount} / 2 Attached</span>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full text-xs gap-1.5"
                        onClick={() => setPhotoCount(prev => Math.min(prev + 1, 2))}
                      >
                        <Camera className="w-3.5 h-3.5" /> Attach Photo Proof
                      </Button>
                    </div>

                    <Button
                      variant="primary"
                      className="w-full py-2.5 text-sm font-bold"
                      onClick={() => dispatchJobAction('COMPLETE_CHECKLIST')}
                    >
                      Proceed to Diagnostics →
                    </Button>
                  </div>
                )}

                {/* 6. STATE: VERIFYING (Comprehensive Diagnostics & Failure Recovery Directive #6 & #7) */}
                {activeJob.state === 'VERIFYING' && (
                  <div className="p-4 rounded-xl bg-[#1A2436] border border-slate-700 space-y-4 text-xs">
                    <h3 className="font-bold text-white text-sm">Step 6: Automated Hardware Diagnostics</h3>
                    
                    <div className="p-3 rounded-lg bg-[#141E2F] space-y-2">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Connectivity (5G LTE / DNS):</span>
                        <span className="font-bold text-emerald-400">PASS</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Hardware (Display / Touch / Power):</span>
                        <span className="font-bold text-emerald-400">PASS</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Software (Daemon / Sync Engine):</span>
                        <span className="font-bold text-emerald-400">PASS</span>
                      </div>
                    </div>

                    {/* Simulation Failure Toggle */}
                    <div className="flex items-center justify-between p-2 rounded bg-slate-800 text-[11px]">
                      <span className="text-slate-400">Simulate Test Failure Path:</span>
                      <input
                        type="checkbox"
                        checked={diagnosticFailedSimulated}
                        onChange={(e) => setDiagnosticFailedSimulated(e.target.checked)}
                      />
                    </div>

                    <Button
                      variant="primary"
                      className="w-full py-2.5 text-sm font-bold gap-2"
                      disabled={isDiagnosticRunning}
                      onClick={runDiagnostics}
                    >
                      {isDiagnosticRunning ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> Running Diagnostics...
                        </>
                      ) : (
                        'Run Automated Diagnostics Test →'
                      )}
                    </Button>
                  </div>
                )}

                {/* 6B. STATE: FAILED (Failure Recovery Path Directive #7) */}
                {activeJob.state === 'FAILED' && (
                  <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/50 space-y-4 text-xs">
                    <div className="flex items-center gap-2 text-rose-300 font-bold text-sm">
                      <AlertTriangle className="w-5 h-5 text-rose-400" />
                      Diagnostic Test Failed
                    </div>
                    <p className="text-rose-200">Display panel failed handshake check. Select recovery action:</p>
                    
                    <div className="space-y-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => dispatchJobAction('RETRY_DIAGNOSTIC')}
                      >
                        🔄 Retry Diagnostic Test
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => dispatchJobAction('SWAP_HARDWARE')}
                      >
                        📦 Swap Hardware Unit (New SKU)
                      </Button>
                    </div>
                  </div>
                )}

                {/* 7. STATE: WAITING_SIGNATURE */}
                {activeJob.state === 'WAITING_SIGNATURE' && (
                  <div className="p-4 rounded-xl bg-[#1A2436] border border-slate-700 space-y-4 text-xs">
                    <h3 className="font-bold text-white text-sm">Step 7: Customer Signature Sign-Off</h3>
                    <p className="text-slate-300">Site manager sign-off on screen installation.</p>
                    
                    <div className="space-y-2">
                      <label className="text-slate-300">Site Manager Name</label>
                      <input
                        type="text"
                        value={signedName}
                        onChange={(e) => setSignedName(e.target.value)}
                        placeholder="e.g. Ramesh Varma (Site Supervisor)"
                        className="w-full px-3 py-2 bg-[#141E2F] border border-slate-700 rounded-lg text-white"
                      />
                    </div>

                    <div className="h-24 rounded-lg bg-[#0F172A] border border-slate-700 flex items-center justify-center text-slate-500 font-mono text-xs italic">
                      [Touch Signature Canvas Recorded]
                    </div>

                    <Button
                      variant="primary"
                      className="w-full py-2.5 text-sm font-bold"
                      onClick={() => dispatchJobAction('SUBMIT_SIGNATURE')}
                    >
                      Proceed to Live Commissioning →
                    </Button>
                  </div>
                )}

                {/* 8. STATE: COMMISSIONING / COMPLETED (Multi-Entity Cascade & Offline Mode Directive #8 & #10) */}
                {(activeJob.state === 'COMMISSIONING' || activeJob.state === 'COMPLETED' || activeJob.state === 'OFFLINE_QUEUED') && (
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/50 space-y-4 text-xs text-center">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h3 className="font-bold text-white text-base">Device Commissioned & Active!</h3>
                    
                    <div className="p-3 rounded-lg bg-[#141E2F] border border-slate-700 text-left space-y-1.5 text-[11px]">
                      <div className="font-semibold text-emerald-300 border-b border-slate-700 pb-1">
                        CASCADING ENTITY UPDATES COMPLETED:
                      </div>
                      <div className="text-slate-300">✓ Technician Job: <span className="text-emerald-400 font-mono font-bold">COMPLETED</span></div>
                      <div className="text-slate-300">✓ Fleet Device: <span className="text-emerald-400 font-mono font-bold">COMMISSIONED (ONLINE)</span></div>
                      <div className="text-slate-300">✓ Physical Inventory: <span className="text-emerald-400 font-mono font-bold">INSTALLED</span></div>
                      <div className="text-slate-300">✓ Telangana Radar Map: <span className="text-emerald-400 font-mono font-bold">GREEN PIN ADDED</span></div>
                      <div className="text-slate-300">✓ Fleet Manager Dashboard: <span className="text-emerald-400 font-mono font-bold">SYNCED</span></div>
                    </div>

                    <Button
                      variant="primary"
                      className="w-full py-2.5 text-sm font-bold"
                      onClick={() => {
                        dispatchJobAction('COMMISSION');
                        setSelectedJobId(null);
                      }}
                    >
                      Return to Job Queue
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === 'history' && (
          <div className="space-y-3 text-xs">
            <h2 className="font-bold text-white text-sm">Completed Jobs History ({completedJobs.length})</h2>
            {completedJobs.length > 0 ? (
              completedJobs.map(j => (
                <div key={j.id} className="p-3 rounded-xl bg-[#141E2F] border border-slate-700 space-y-1">
                  <div className="flex items-center justify-between font-mono text-emerald-400 font-bold">
                    <span>{j.jobCode}</span>
                    <span>COMMISSIONED</span>
                  </div>
                  <div className="font-bold text-white">{j.title}</div>
                  <div className="text-slate-400 text-[10px]">{j.siteNodeName}</div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">No completed jobs in history yet.</p>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="p-4 rounded-xl bg-[#141E2F] border border-slate-700 space-y-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-indigo-600 text-white font-bold text-base">RK</div>
              <div>
                <div className="font-bold text-white text-sm">Rajesh Kumar</div>
                <div className="text-slate-400 text-[11px]">Senior Field Installation Engineer</div>
              </div>
            </div>
            <hr className="border-slate-800" />
            <div className="space-y-1 text-slate-300">
              <div>Region: <span className="text-white font-semibold">Hyderabad Metro</span></div>
              <div>Technician ID: <span className="font-mono text-indigo-300 font-bold">TECH-04</span></div>
              <div>Completed Jobs: <span className="text-emerald-400 font-bold">142</span></div>
            </div>
          </div>
        )}
      </div>

      {/* ULTRA-CLEAN MOBILE BOTTOM NAVIGATION (Directive #2) */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#141E2F] border-t border-slate-800 grid grid-cols-3 py-2 z-30 shadow-2xl">
        <button
          onClick={() => { setActiveTab('jobs'); setSelectedJobId(null); }}
          className={`flex flex-col items-center justify-center py-1 text-[11px] font-semibold transition-all ${
            activeTab === 'jobs' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          <ClipboardList className="w-5 h-5 mb-0.5" />
          Jobs
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex flex-col items-center justify-center py-1 text-[11px] font-semibold transition-all ${
            activeTab === 'history' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          <History className="w-5 h-5 mb-0.5" />
          History
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center py-1 text-[11px] font-semibold transition-all ${
            activeTab === 'profile' ? 'text-indigo-400' : 'text-slate-400 hover:text-white'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          Profile
        </button>
      </div>
    </div>
  );
}
