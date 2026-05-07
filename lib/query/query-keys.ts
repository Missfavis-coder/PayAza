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


  dashboard: {
    overview: (params?: any) =>
      ["dashboard", "overview", params] as const,
  },



  wallet: {
    balance: () => ["wallet", "balance"] as const,

    transactions: (params?: any) =>
      ["wallet", "transactions", params] as const,
  },

  notifications: {
    list: (params?: any) =>
      ["notifications", "list", params] as const,

    unreadCount: () =>
      ["notifications", "unread-count"] as const,
  },

  analytics: {
    me: () => ["analytics", "me"] as const,
    admin: () => ["analytics", "admin"] as const,
    adminUsers: (params?: any) =>
      ["analytics", "admin", "users", params] as const,
    adminUser: (id: string) =>
      ["analytics", "admin", "users", id] as const,
  },

  charts: {
    spending: (period: string) => ["charts", "spending", period] as const,
    transfers: (period: string) => ["charts", "transfers", period] as const,
    topups: (period: string) => ["charts", "topups", period] as const,
  },
};