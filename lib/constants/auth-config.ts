/**
 * Authentication and authorization configuration
 *
 * This file contains all auth-related constants including cookie settings,
 * token expiration times, and security configurations.
 */

export const AUTH_CONFIG = {
  // Token expiration times
  ACCESS_TOKEN_EXPIRES_IN: 60 * 60, // 1 hour (in seconds, server-side)
  REFRESH_TOKEN_EXPIRES_IN: 30 * 24 * 60 * 60 * 1000, // 30 days (in milliseconds)

  // Cookie names
  COOKIE_NAMES: {
    ACCESS_TOKEN: "tekcify_access_token",
    REFRESH_TOKEN: "tekcify_refresh_token",
    EXPIRES_AT: "tekcify_expires_at",
    TOKEN_SCOPE: "tekcify_token_scope",
  },

  // Cookie options
  COOKIE_OPTIONS: {
    sameSite: "lax" as const,
    path: "/",
  },

  // Session
  SESSION_CHECK_INTERVAL: 60 * 1000, // Check session validity every minute
  SESSION_REFRESH_THRESHOLD: 5 * 60 * 1000, // Refresh if expiring in 5 minutes
} as const;

export const AUTH_ROUTES = {
  LOGIN: "/login",
  LOGOUT: "/logout",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
} as const;

export const PROTECTED_ROUTES = [
  "/dashboard",
  "/settings",
  "/profile",
  "/billing",
  "/notifications",
  "/usage",
  "/referrals",
  "/help",
] as const;
