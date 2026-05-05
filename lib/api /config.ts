export const getBaseUrl = (): string => {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL;
  const normalized = fromEnv ? fromEnv.replace(/\/$/, "") : undefined;
  return normalized || "http://localhost:5500/api/v1";
};

export const API_ROUTES = {
  auth: {
    register: "/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },

  wallet: {
    get: "/wallet",
    transactions: "/wallet/transactions",
  },

  funding: {
    initiate: "/funding/initiate",
    get: (id: string) => `/funding/${id}`,
  },

  transfers: {
    create: "/transfers",
    get: (id: string) => `/transfers/${id}`,
    list: "/transfers",
    release: (id: string) => `/transfers/${id}/release`,
    receipt: (id: string) => `/transfers/${id}/receipt`,
    dispute: (id: string) => `/transfers/${id}/dispute`,
  },

  disputes: {
    get: (id: string) => `/disputes/${id}`,
    evidence: (id: string) => `/disputes/${id}/evidence`,
  },

  exchange: {
    convert: "/exchange",
  },

  withdrawals: {
    create: "/withdrawals",
  },

  apiKeys: {
    create: "/api-keys",
    list: "/api-keys",
    revoke: (id: string) => `/api-keys/${id}`,
    exchange: "/api-keys/exchange",
  },

  system: {
    health: "/health",
  },
} as const;