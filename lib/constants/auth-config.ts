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

  
} as const;

export const AUTH_ROUTES = {
  LOGIN: "/login",
  LOGOUT: "/logout"
} as const;

export const PROTECTED_ROUTES = [
  "/dashboard",
  "/settings",
  "/notifications",
  "/help",
] as const;
