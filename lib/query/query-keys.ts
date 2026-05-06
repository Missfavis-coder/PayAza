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
};