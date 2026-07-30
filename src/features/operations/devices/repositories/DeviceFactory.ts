import type { Device, DeviceStatus } from '../types';

const CITIES = [
  { city: 'New York', country: 'USA', timezone: 'America/New_York', lat: 40.7128, lng: -74.0060 },
  { city: 'London', country: 'UK', timezone: 'Europe/London', lat: 51.5074, lng: -0.1278 },
  { city: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', lat: 35.6762, lng: 139.6503 },
  { city: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', lat: -33.8688, lng: 151.2093 },
  { city: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', lat: 52.5200, lng: 13.4050 },
  { city: 'Toronto', country: 'Canada', timezone: 'America/Toronto', lat: 43.6510, lng: -79.3470 },
];

const ORGS = [
  { id: 'org_1', name: 'Acme Corp' },
  { id: 'org_2', name: 'Global Retail' },
  { id: 'org_3', name: 'Transit Authority' },
  { id: 'org_4', name: 'MegaMalls Inc' },
];

const GROUPS = [
  { id: 'grp_1', name: 'North Wing Displays' },
  { id: 'grp_2', name: 'Entrance Kiosks' },
  { id: 'grp_3', name: 'Terminal A' },
  { id: 'grp_4', name: 'Food Court' },
  { id: 'grp_5', name: 'Main Concourse' },
];

const FIRMWARES = ['v2.4.1', 'v2.4.2', 'v2.5.0-beta', 'v2.3.9'];
const MODELS = ['Trot-X1', 'Trot-Pro-Display', 'Kiosk-V2', 'Outdoor-Rugged-Display'];
const TAGS = ['high-traffic', 'beta-tester', 'maintenance-due', 'vip-zone', 'outdoor', 'indoor'];

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomSubset<T>(arr: T[], max: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.floor(Math.random() * max) + 1);
}

function randomDate(start: Date, end: Date) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateDevice(id: number): Device {
  const loc = randomChoice(CITIES);
  const org = randomChoice(ORGS);
  const group = Math.random() > 0.2 ? randomChoice(GROUPS) : undefined;
  
  // Weights for status to make realistic (mostly online)
  const statusRoll = Math.random();
  let status: DeviceStatus = 'online';
  if (statusRoll > 0.85) status = 'offline';
  else if (statusRoll > 0.75) status = 'warning';
  else if (statusRoll > 0.98) status = 'unknown';

  return {
    id: `dev_${id.toString().padStart(4, '0')}`,
    name: `${org.name.split(' ')[0]}-${loc.city.substring(0, 3).toUpperCase()}-Display-${id}`,
    status,
    lastSeen: status === 'online' 
      ? new Date().toISOString() 
      : randomDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()).toISOString(),
    organizationId: org.id,
    organizationName: org.name,
    groupId: group?.id,
    groupName: group?.name,
    tags: Math.random() > 0.5 ? randomSubset(TAGS, 3) : [],
    firmwareVersion: randomChoice(FIRMWARES),
    hardwareModel: randomChoice(MODELS),
    resolution: Math.random() > 0.5 ? '1920x1080' : '3840x2160',
    orientation: Math.random() > 0.7 ? 'portrait' : 'landscape',
    location: {
      city: loc.city,
      country: loc.country,
      timezone: loc.timezone,
      coordinates: { lat: loc.lat, lng: loc.lng }
    },
    createdAt: randomDate(new Date(2023, 0, 1), new Date()).toISOString(),
  };
}

export function generateMockDevices(count: number = 150): Device[] {
  return Array.from({ length: count }, (_, i) => generateDevice(i + 1));
}
