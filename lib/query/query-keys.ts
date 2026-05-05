import type {
  DashboardOverviewParams,
  UsageAnalyticsParams,
  UsageLogsParams,
  TransactionsParams,
  ReferralListParams,
  NotificationsParams,
} from "@/lib/types/api";

export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
    session: () => ["auth", "session"] as const,
    refresh: () => ["auth", "refresh"] as const,
  },
  profile: {
    current: () => ["profile", "current"] as const,
  },
  health: {
    check: () => ["health"] as const,
  },
  whatsapp: {
    status: () => ["whatsapp", "status"] as const,
  },
  dashboard: {
    overview: (params?: DashboardOverviewParams) => ["dashboard", "overview", params] as const,
    usage: {
      analytics: (params?: UsageAnalyticsParams) => ["dashboard", "usage", "analytics", params] as const,
      logs: (params?: UsageLogsParams) => ["dashboard", "usage", "logs", params] as const,
    },
    billing: {
      overview: () => ["dashboard", "billing", "overview"] as const,
      transactions: (params?: TransactionsParams) => ["dashboard", "billing", "transactions", params] as const,
    },
    referrals: {
      overview: () => ["dashboard", "referrals", "overview"] as const,
      list: (params?: ReferralListParams) => ["dashboard", "referrals", "list", params] as const,
    },
    notifications: {
      list: (params?: NotificationsParams) => ["dashboard", "notifications", params] as const,
    },
    settings: {
      overview: () => ["dashboard", "settings", "overview"] as const,
    },
    help: {
      articles: () => ["dashboard", "help", "articles"] as const,
    },
  },
} as const;