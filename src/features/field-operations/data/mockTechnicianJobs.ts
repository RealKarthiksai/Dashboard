import type { TechnicianJob } from '../types';

export const MOCK_TECHNICIAN_JOBS: TechnicianJob[] = [
  {
    id: 'job-901',
    jobCode: 'JOB-2026-901',
    title: 'Install 55" Commercial Display — Gate 14 Airport',
    state: 'JOB_ASSIGNED',
    siteNodeId: 'node-gate14',
    siteNodeName: 'RGIA Airport → Terminal 1 → Gate 14',
    siteAddress: 'Shamshabad, Hyderabad, TS 500108',
    targetCoordinates: { lat: 17.2403, lng: 78.4294 },
    deviceType: 'display',
    requiredHardwareSku: 'DISP-55-4K-COMM',
    checklist: [
      { id: 'c1', label: 'Inspect VESA Heavy Duty Mount Bracket', completed: false },
      { id: 'c2', label: 'Connect Industrial AC Power Supply Cable', completed: false },
      { id: 'c3', label: 'Plug HDMI 2.1 Video Input Cable', completed: false },
      { id: 'c4', label: 'Verify Screen Orientation (Landscape Mode)', completed: false }
    ],
    photos: [],
    assignedTechId: 'tech-04',
    assignedTechName: 'Rajesh Kumar',
    slaDueDate: '2026-07-31T12:00:00Z'
  },
  {
    id: 'job-902',
    jobCode: 'JOB-2026-902',
    title: 'Commission Trot-Tab Passenger Screen — Cab #432',
    state: 'JOB_ASSIGNED',
    siteNodeId: 'node-cab-hub',
    siteNodeName: 'TrotOS Transit Fleet Hub (ORR Corridor)',
    siteAddress: 'Gachibowli Outer Ring Road, Hyderabad',
    targetCoordinates: { lat: 17.4401, lng: 78.3489 },
    deviceType: 'player_tablet',
    requiredHardwareSku: 'TROT-TAB-10X',
    checklist: [
      { id: 'c1', label: 'Attach Headrest Security Cradle Mount', completed: false },
      { id: 'c2', label: 'Connect 12V Vehicle Power Converter Harness', completed: false },
      { id: 'c3', label: 'Insert 5G Quectel LTE SIM Card', completed: false },
      { id: 'c4', label: 'Power On Trot-Tab & Verify Splash Screen', completed: false }
    ],
    photos: [],
    assignedTechId: 'tech-04',
    assignedTechName: 'Rajesh Kumar',
    slaDueDate: '2026-07-31T15:30:00Z'
  }
];
