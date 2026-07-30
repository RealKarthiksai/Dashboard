import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Signal, Battery, Radio, RefreshCw, Zap, PlayCircle, Cpu } from 'lucide-react';

interface RoamingTab {
  id: string;
  code: string;
  name: string;
  vehicle: string;
  district: string;
  x: number; // SVG percentage x coordinate (Telangana bounds)
  y: number; // SVG percentage y coordinate
  status: 'active' | 'syncing' | 'idle' | 'warning';
  battery: number;
  signal: number;
  speed: number; // km/h
  currentMedia: string;
  lastPing: string;
  lat: number;
  lng: number;
}

const TELANGANA_DISTRICTS = [
  'All Telangana',
  'Hyderabad Urban',
  'Warangal Metro',
  'Karimnagar Zone',
  'Nizamabad Belt',
  'Khammam Highway',
  'Mahbubnagar'
];

const INITIAL_TABS: RoamingTab[] = [
  {
    id: 'tab-1',
    code: 'TS-09-UB-8821',
    name: 'Cyberabad Electric Shuttle #14',
    vehicle: 'Electric Shuttle (T-Hub Route)',
    district: 'Hyderabad Urban',
    x: 44,
    y: 52,
    status: 'active',
    battery: 94,
    signal: 98,
    speed: 38,
    currentMedia: 'HDFC Sky Campaign — 15s 4K Video',
    lastPing: 'Just now',
    lat: 17.4435,
    lng: 78.3772,
  },
  {
    id: 'tab-2',
    code: 'TS-07-EX-4490',
    name: 'ORR Express Transit Tab #08',
    vehicle: 'Outer Ring Road Airport Express',
    district: 'Hyderabad Urban',
    x: 46,
    y: 58,
    status: 'active',
    battery: 88,
    signal: 92,
    speed: 72,
    currentMedia: 'GMR Hyderabad Airport Promo',
    lastPing: '2s ago',
    lat: 17.2403,
    lng: 78.4294,
  },
  {
    id: 'tab-3',
    code: 'TS-03-WR-1092',
    name: 'Warangal Smart Bus Display #03',
    vehicle: 'TSRTC City Bus (Hanamkonda Route)',
    district: 'Warangal Metro',
    x: 68,
    y: 42,
    status: 'active',
    battery: 79,
    signal: 85,
    speed: 24,
    currentMedia: 'Telangana Tourism — Kakatiya Heritage',
    lastPing: '1s ago',
    lat: 17.9689,
    lng: 79.5941,
  },
  {
    id: 'tab-4',
    code: 'TS-02-KR-3310',
    name: 'Karimnagar Express Display #01',
    vehicle: 'Karimnagar Smart Corridor Transit',
    district: 'Karimnagar Zone',
    x: 58,
    y: 28,
    status: 'syncing',
    battery: 65,
    signal: 70,
    speed: 45,
    currentMedia: 'Updating Playlist: Summer Campaign v3',
    lastPing: '5s ago',
    lat: 18.4386,
    lng: 79.1288,
  },
  {
    id: 'tab-5',
    code: 'TS-16-NZ-7723',
    name: 'Nizamabad Rural Transit Display',
    vehicle: 'North Telangana Intercity Express',
    district: 'Nizamabad Belt',
    x: 32,
    y: 22,
    status: 'active',
    battery: 91,
    signal: 88,
    speed: 58,
    currentMedia: 'Airtel 5G Plus Local Geo-Targeted Ad',
    lastPing: 'Just now',
    lat: 18.6725,
    lng: 78.0941,
  },
  {
    id: 'tab-6',
    code: 'TS-04-KM-9921',
    name: 'Khammam Highway Transit #05',
    vehicle: 'Khammam-Suryapet Highway Liner',
    district: 'Khammam Highway',
    x: 74,
    y: 64,
    status: 'warning',
    battery: 18,
    signal: 42,
    speed: 64,
    currentMedia: 'T-Fiber Digital Campaign (Degraded Connection)',
    lastPing: '12s ago',
    lat: 17.2473,
    lng: 80.1514,
  },
  {
    id: 'tab-7',
    code: 'TS-06-MB-5512',
    name: 'Mahbubnagar Express Display #02',
    vehicle: 'South Telangana Regional Transit',
    district: 'Mahbubnagar',
    x: 38,
    y: 72,
    status: 'active',
    battery: 82,
    signal: 90,
    speed: 51,
    currentMedia: 'SBI Green Energy Loan Spot',
    lastPing: '3s ago',
    lat: 16.7488,
    lng: 77.9854,
  },
];

export const TelanganaFleetMap: React.FC = () => {
  const [tabs, setTabs] = useState<RoamingTab[]>(INITIAL_TABS);
  const [selectedTab, setSelectedTab] = useState<RoamingTab>(INITIAL_TABS[0]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All Telangana');
  const [isLiveSimulating, setIsLiveSimulating] = useState<boolean>(true);

  // Micro-simulation of live GPS roaming movement across Telangana
  useEffect(() => {
    if (!isLiveSimulating) return;

    const interval = setInterval(() => {
      setTabs((prevTabs) =>
        prevTabs.map((tab) => {
          // Slight jitter to simulate real movement
          const dx = (Math.random() - 0.5) * 0.4;
          const dy = (Math.random() - 0.5) * 0.4;
          const speedJitter = Math.floor((Math.random() - 0.5) * 4);
          
          const newX = Math.min(Math.max(tab.x + dx, 15), 85);
          const newY = Math.min(Math.max(tab.y + dy, 15), 85);
          const newSpeed = Math.max(0, Math.min(tab.speed + speedJitter, 90));

          return {
            ...tab,
            x: newX,
            y: newY,
            speed: newSpeed,
            lastPing: 'Just now',
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [isLiveSimulating]);

  const filteredTabs = selectedDistrict === 'All Telangana'
    ? tabs
    : tabs.filter((t) => t.district === selectedDistrict);

  const activeCount = tabs.filter((t) => t.status === 'active').length;
  const syncingCount = tabs.filter((t) => t.status === 'syncing').length;
  const alertCount = tabs.filter((t) => t.status === 'warning').length;

  return (
    <div className="rounded-2xl bg-[var(--color-level-3)] border border-[var(--color-border)] p-6 shadow-sm overflow-hidden space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Navigation className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
                  Telangana Live Fleet Roaming Radar
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Live GPS Track
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                Real-time telemetry & roaming digital signage tablets across Telangana transit corridors
              </p>
            </div>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="bg-[var(--color-level-2)] border border-[var(--color-border)] rounded-xl px-3 py-1.5 text-xs font-semibold text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
          >
            {TELANGANA_DISTRICTS.map((district) => (
              <option key={district} value={district} className="bg-[#1A2436] text-white">
                {district}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsLiveSimulating(!isLiveSimulating)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
              isLiveSimulating
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-[var(--color-level-2)] border-[var(--color-border)] text-[var(--color-text-muted)]'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLiveSimulating ? 'animate-spin' : ''}`} />
            {isLiveSimulating ? 'Pause Stream' : 'Resume Telemetry'}
          </button>
        </div>
      </div>

      {/* Main Radar Layout: Map Canvas (8 Cols) & Live Telemetry Inspector (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* SVG Vector Map Container */}
        <div className="lg:col-span-8 relative min-h-[380px] bg-[#0B1220] rounded-2xl border border-[var(--color-border)] overflow-hidden flex items-center justify-center p-4">
          
          {/* Subtle Grid Lines Background */}
          <div 
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* SVG Map of Telangana Outline & District Hub Nodes */}
          <svg className="w-full h-full max-h-[420px] select-none" viewBox="0 0 800 600" fill="none">
            {/* Telangana Stylized Perimeter Boundary Path */}
            <path
              d="M 240 100 Q 380 70 520 120 Q 660 180 720 320 Q 740 450 620 540 Q 460 580 320 520 Q 180 440 140 300 Q 160 160 240 100 Z"
              fill="url(#telangana-gradient)"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="opacity-40"
            />
            
            {/* Gradients */}
            <defs>
              <linearGradient id="telangana-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#0F172A" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#064E3B" stopOpacity="0.4" />
              </linearGradient>
              <radialGradient id="hyderabad-glow">
                <stop offset="0%" stopColor="#818CF8" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Major Highways / Transit Corridors */}
            {/* ORR Hyderabad Ring */}
            <circle cx="360" cy="320" r="45" stroke="#6366F1" strokeWidth="1.5" strokeDasharray="3 3" fill="none" className="opacity-60" />
            {/* NH-44 North-South Highway */}
            <line x1="260" y1="120" x2="360" y2="320" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-40" />
            <line x1="360" y1="320" x2="320" y2="460" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-40" />
            {/* NH-163 Warangal Highway */}
            <line x1="360" y1="320" x2="540" y2="250" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 4" className="opacity-40" />

            {/* Major Telangana City Hub Markers */}
            <g className="text-[10px] font-mono fill-slate-400 font-bold">
              {/* Hyderabad */}
              <circle cx="360" cy="320" r="9" fill="url(#hyderabad-glow)" />
              <circle cx="360" cy="320" r="4" fill="#818CF8" />
              <text x="372" y="324" className="fill-indigo-300 font-bold text-xs tracking-wider">HYDERABAD (HQ)</text>

              {/* Warangal */}
              <circle cx="540" cy="250" r="3" fill="#38BDF8" />
              <text x="548" y="254">Warangal</text>

              {/* Karimnagar */}
              <circle cx="460" cy="170" r="3" fill="#38BDF8" />
              <text x="468" y="174">Karimnagar</text>

              {/* Nizamabad */}
              <circle cx="260" cy="140" r="3" fill="#38BDF8" />
              <text x="268" y="144">Nizamabad</text>

              {/* Khammam */}
              <circle cx="590" cy="380" r="3" fill="#38BDF8" />
              <text x="598" y="384">Khammam</text>

              {/* Mahbubnagar */}
              <circle cx="310" cy="430" r="3" fill="#38BDF8" />
              <text x="318" y="434">Mahbubnagar</text>
            </g>
          </svg>

          {/* Interactive Roaming Pins Overlay */}
          {filteredTabs.map((tab) => {
            const isSelected = selectedTab.id === tab.id;
            const isRed = tab.status === 'warning';
            const isYellow = tab.status === 'syncing';
            const isActive = tab.status === 'active';

            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab)}
                style={{ left: `${tab.x}%`, top: `${tab.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 focus:outline-none flex items-center gap-1.5 ${
                  isRed ? 'z-30' : isSelected ? 'z-20' : 'z-10'
                }`}
              >
                {/* 🔴 RED DANGER PIN (Prominent, ALWAYS shows error info & alert status) */}
                {isRed && (
                  <div className="relative flex items-center gap-1">
                    <span className="absolute -inset-1 rounded-full bg-rose-500/50 animate-pulse" />
                    <div
                      className={`relative flex items-center justify-center rounded-full bg-rose-600 text-white shadow-lg border border-rose-200 transition-transform ${
                        isSelected ? 'scale-125 ring-2 ring-rose-400' : 'hover:scale-110'
                      }`}
                      style={{ width: '22px', height: '22px' }}
                    >
                      <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                    {/* Always Visible Red Warning Tag */}
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-rose-950/95 border border-rose-500/60 shadow-md text-xs font-mono font-bold text-rose-200">
                      <span>{tab.code}</span>
                      <span className="px-1 py-0.2 rounded bg-rose-600 text-white text-[9px] uppercase font-sans tracking-wide">
                        Alert: Low Bat ({tab.battery}%)
                      </span>
                    </div>
                  </div>
                )}

                {/* 🟡 YELLOW SYNCING/IDLE PIN (Really small 7px dot, tag on hover/select) */}
                {isYellow && (
                  <div className="relative flex items-center">
                    <div
                      className={`rounded-full bg-amber-400 border border-amber-200 shadow-xs transition-transform ${
                        isSelected ? 'scale-150 ring-2 ring-amber-300' : 'hover:scale-125'
                      }`}
                      style={{ width: '7px', height: '7px' }}
                    />
                    <span className={`ml-1.5 text-[9px] font-mono font-semibold px-1 py-0.2 rounded bg-amber-950/90 text-amber-200 border border-amber-500/30 ${isSelected ? 'block' : 'hidden group-hover:block'}`}>
                      {tab.code}
                    </span>
                  </div>
                )}

                {/* 🟢 GREEN ACTIVE PIN (Clean & compact, info on hover/select to avoid clutter) */}
                {isActive && (
                  <div className="relative flex items-center gap-1">
                    <div
                      className={`rounded-full bg-emerald-400 border border-emerald-200 shadow-sm transition-transform ${
                        isSelected ? 'scale-125 ring-2 ring-emerald-300 bg-emerald-300' : 'hover:scale-110'
                      }`}
                      style={{ width: '8px', height: '8px' }}
                    />
                    <div
                      className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-medium shadow-xs border transition-all ${
                        isSelected
                          ? 'bg-indigo-950 text-white border-indigo-400 ring-1 ring-indigo-400'
                          : 'bg-[#141E2F]/90 text-emerald-300 border-emerald-500/30 hover:border-emerald-400'
                      }`}
                    >
                      <span className="truncate max-w-[70px]">{tab.code}</span>
                    </div>
                  </div>
                )}

                {/* Hover Tooltip */}
                <div className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 hidden group-hover:flex flex-col gap-1 w-48 p-2.5 rounded-xl bg-[#141E2F] border border-[var(--color-border)] shadow-xl text-[11px] pointer-events-none z-40">
                  <div className="font-bold text-white truncate">{tab.name}</div>
                  <div className="text-[var(--color-text-muted)] text-[10px]">{tab.vehicle}</div>
                  <div className="flex items-center justify-between text-emerald-400 font-mono text-[10px] mt-1 border-t border-slate-700/50 pt-1">
                    <span>{tab.speed} km/h</span>
                    <span>Bat: {tab.battery}%</span>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Map Overlay Summary Pill */}
          <div className="absolute bottom-3 left-3 flex items-center gap-3 bg-[#141E2F]/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[var(--color-border)] text-xs">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{activeCount} Active Roaming</span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>{syncingCount} Syncing</span>
            </div>
            {alertCount > 0 && (
              <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                <span>{alertCount} Alert</span>
              </div>
            )}
          </div>
        </div>

        {/* Selected Roaming Tab Telemetry Inspector */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-[#141E2F] rounded-2xl border border-[var(--color-border)] p-5 space-y-4">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] font-mono font-bold uppercase">
                Device Telemetry Inspector
              </span>
              <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                Ping: {selectedTab.lastPing}
              </span>
            </div>

            <h3 className="text-base font-bold text-white mt-2">
              {selectedTab.name}
            </h3>
            <p className="text-xs text-[var(--color-text-muted)]">
              Reg: <span className="font-mono text-indigo-300 font-bold">{selectedTab.code}</span> ({selectedTab.vehicle})
            </p>
          </div>

          {/* Real-time Telemetry Metrics Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#1A2436] border border-[var(--color-border)] space-y-1">
              <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] text-[11px]">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                <span>Speed & Velocity</span>
              </div>
              <div className="text-lg font-mono font-bold text-white">
                {selectedTab.speed} <span className="text-xs text-[var(--color-text-muted)] font-normal">km/h</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1A2436] border border-[var(--color-border)] space-y-1">
              <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] text-[11px]">
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
                <span>Battery Level</span>
              </div>
              <div className="text-lg font-mono font-bold text-white">
                {selectedTab.battery}%
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1A2436] border border-[var(--color-border)] space-y-1">
              <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] text-[11px]">
                <Signal className="w-3.5 h-3.5 text-indigo-400" />
                <span>5G Network Signal</span>
              </div>
              <div className="text-lg font-mono font-bold text-white">
                {selectedTab.signal}%
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#1A2436] border border-[var(--color-border)] space-y-1">
              <div className="flex items-center gap-1.5 text-[var(--color-text-muted)] text-[11px]">
                <Radio className="w-3.5 h-3.5 text-amber-400" />
                <span>GPS Location</span>
              </div>
              <div className="text-[11px] font-mono font-semibold text-white truncate">
                {selectedTab.lat.toFixed(2)}, {selectedTab.lng.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Currently Playing Media Loop */}
          <div className="p-3.5 rounded-xl bg-[#1A2436] border border-[var(--color-border)] space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-muted)] flex items-center gap-1.5 font-medium">
                <PlayCircle className="w-3.5 h-3.5 text-emerald-400" /> Currently Broadcast Content
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase bg-emerald-500/10 px-1.5 py-0.5 rounded">
                Loop Active
              </span>
            </div>
            <p className="text-xs font-semibold text-white truncate">
              {selectedTab.currentMedia}
            </p>
          </div>

          {/* Action Triggers */}
          <div className="pt-2 border-t border-[var(--color-border)] flex items-center gap-2">
            <button className="flex-1 py-2 px-3 rounded-xl bg-[var(--color-primary)] text-white text-xs font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              Sync Media
            </button>
            <button className="py-2 px-3 rounded-xl bg-[#1A2436] border border-[var(--color-border)] text-xs font-bold text-[var(--color-text-primary)] hover:bg-[#222D41] transition-colors flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              Reboot Tab
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
