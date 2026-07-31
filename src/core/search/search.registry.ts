import type { SearchProfileKey } from '../experiences/experience.types';

export interface SearchProfile {
  placeholder: string;
  scopes: string[];
  priorityScope: string;
}

export const SEARCH_REGISTRY: Record<SearchProfileKey, SearchProfile> = {
  OWNER: {
    placeholder: 'Search devices, campaigns, content, users, sites...',
    scopes: ['devices', 'campaigns', 'content', 'users', 'sites'],
    priorityScope: 'devices',
  },
  FLEET: {
    placeholder: 'Search devices, tickets, sites, alerts...',
    scopes: ['devices', 'maintenance', 'sites', 'alerts'],
    priorityScope: 'devices',
  },
  TECHNICIAN: {
    placeholder: 'Search jobs, devices, sites...',
    scopes: ['jobs', 'devices', 'sites'],
    priorityScope: 'jobs',
  },
  CONTENT: {
    placeholder: 'Search media, playlists, schedules...',
    scopes: ['media', 'playlists', 'schedules'],
    priorityScope: 'media',
  },
  ADVERTISER: {
    placeholder: 'Search campaigns, creative, reports...',
    scopes: ['campaigns', 'advertisers', 'reports'],
    priorityScope: 'campaigns',
  },
  DRIVER: {
    placeholder: 'Search support FAQs...',
    scopes: ['support'],
    priorityScope: 'support',
  },
  SUPPORT: {
    placeholder: 'Search organizations, tickets, devices...',
    scopes: ['orgs', 'tickets', 'devices', 'users'],
    priorityScope: 'tickets',
  },
  PLATFORM: {
    placeholder: 'Search organizations, licenses, global billing...',
    scopes: ['orgs', 'licenses', 'billing', 'tickets'],
    priorityScope: 'orgs',
  },
};
