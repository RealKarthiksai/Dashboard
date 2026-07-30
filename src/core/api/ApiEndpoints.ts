export const ApiEndpoints = {
  DEVICES: {
    LIST: '/devices',
    DETAIL: (id: string) => `/devices/${id}`,
    REBOOT: (id: string) => `/devices/${id}/reboot`,
    COMMAND: (id: string) => `/devices/${id}/command`,
  },
  CONTENT: {
    MEDIA: '/content/media',
    PLAYLISTS: '/content/playlists',
    PLAYLIST_DETAIL: (id: string) => `/content/playlists/${id}`,
    SCHEDULES: '/content/schedules',
  },
  MARKETING: {
    CAMPAIGNS: '/marketing/campaigns',
    CAMPAIGN_DETAIL: (id: string) => `/marketing/campaigns/${id}`,
    ADVERTISERS: '/marketing/advertisers',
    ASSIGNMENTS: '/marketing/assignments',
    REPORTS: '/marketing/reports',
  },
  ANALYTICS: {
    REPORTS: '/analytics/reports',
    FLEET_INSIGHTS: '/analytics/insights/fleet',
    PLAYBACK_INSIGHTS: '/analytics/insights/playback',
    USER_METRICS: '/analytics/metrics/users',
  },
  ADMIN: {
    USERS: '/admin/users',
    USER_ROLE: (id: string) => `/admin/users/${id}/role`,
    ROLES: '/admin/roles',
    ROLE_DETAIL: (id: string) => `/admin/roles/${id}`,
    ORGANIZATION: '/admin/organization',
    BILLING: '/admin/billing',
    AUDIT_LOGS: '/admin/audit-logs',
  },
} as const;
