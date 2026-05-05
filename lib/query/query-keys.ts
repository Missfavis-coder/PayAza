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

  /* ---------------- DASHBOARD ---------------- */

  dashboard: {
    overview: (params?: any) =>
      ["dashboard", "overview", params] as const,
  },

  /* ---------------- WALLET ---------------- */

  wallet: {
    balance: () => ["wallet", "balance"] as const,

    transactions: (params?: any) =>
      ["wallet", "transactions", params] as const,
  },

  /* ---------------- NOTIFICATIONS ---------------- */

  notifications: {
    list: (params?: any) =>
      ["notifications", "list", params] as const,

    unreadCount: () =>
      ["notifications", "unread-count"] as const,
  },
};