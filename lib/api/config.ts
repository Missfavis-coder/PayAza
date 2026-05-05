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
  dashboard: {
    wallet: {
      get: "/wallet/balance",
      
    },

  },
} as const;
