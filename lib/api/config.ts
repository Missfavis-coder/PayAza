export const getBaseUrl = (): string => {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL;
  const normalized = fromEnv ? fromEnv.replace(/\/$/, "") : undefined;
  return normalized || "http://localhost:8000/api/v1";
};

export const API_ROUTES = {
  health: "/health",
  auth: {
    callback: "/auth/callback",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  users: {
    profile: "/users/profile",
  },
  whatsapp: {
    status: "/whatsapp/status",
    connect: "/whatsapp/connect",
    verify: "/whatsapp/verify",
    disconnect: "/whatsapp/disconnect",
  },
  googleCalendar: {
    exchangeToken: "/google-calendar/oauth/exchange",
  },
  googleMeet: {
    exchangeToken: "/google-meet/oauth/exchange",
    refreshToken: "/google-meet/oauth/refresh",
    meetings: "/google-meet/meetings",
    meetingsWithDetails: "/google-meet/meetings/details",
    recordings: "/google-meet/recordings",
    transcripts: "/google-meet/transcripts",
  },
  dashboard: {
    overview: {
      get: "/dashboard/overview",
    },
    usage: {
      analytics: "/dashboard/usage/analytics",
      logs: "/dashboard/usage/logs",
    },
    billing: {
      overview: "/dashboard/billing/overview",
      transactions: "/dashboard/billing/transactions",
      addCredits: "/dashboard/billing/add-credits",
    },
    referrals: {
      overview: "/referrals/overview",
      list: "/referrals/list",
    },
    notifications: {
      list: "/dashboard/notifications",
      markRead: (id: string) => `/dashboard/notifications/${id}/read`,
      markAllRead: "/dashboard/notifications/mark-all-read",
    },
    settings: {
      overview: "/dashboard/settings/overview",
      connectIntegration: (integrationId: string) =>
        `/dashboard/settings/integrations/${integrationId}/connect`,
      disconnectIntegration: (integrationId: string) =>
        `/dashboard/settings/integrations/${integrationId}`,
    },
    help: {
      articles: "/dashboard/help/articles",
      support: "/dashboard/help/support",                                                                                                                                                                                                                                                                                                                                            
    },
  },
} as const;
