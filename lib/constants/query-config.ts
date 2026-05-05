/**
 * Centralized React Query configuration
 *
 * This file contains all query and mutation configuration presets
 * to ensure consistency across the application.
 */

// Time constants (in milliseconds)
export const TIME = {
  TEN_SECONDS: 10 * 1000,
  THIRTY_SECONDS: 30 * 1000,
  ONE_MINUTE: 60 * 1000,
  FIVE_MINUTES: 5 * 60 * 1000,
  TEN_MINUTES: 10 * 60 * 1000,
  FIFTEEN_MINUTES: 15 * 60 * 1000,
  THIRTY_MINUTES: 30 * 60 * 1000,
} as const;

// Query configuration presets based on data freshness requirements
export const QUERY_PRESETS = {
  /**
   * For real-time or near real-time data (notifications, live status)
   * - Stale after 10 seconds
   * - Garbage collected after 5 minutes
   * - Automatically refetches every 30 seconds
   */
  REALTIME: {
    staleTime: TIME.TEN_SECONDS,
    gcTime: TIME.FIVE_MINUTES,
    refetchInterval: TIME.THIRTY_SECONDS,
    retry: 2,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },

  /**
   * For frequently changing data (dashboard stats, usage metrics)
   * - Stale after 30 seconds
   * - Garbage collected after 5 minutes
   */
  FREQUENT: {
    staleTime: TIME.THIRTY_SECONDS,
    gcTime: TIME.FIVE_MINUTES,
    retry: 2,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },

  /**
   * For moderately changing data (billing, transactions)
   * - Stale after 1 minute
   * - Garbage collected after 10 minutes
   */
  NORMAL: {
    staleTime: TIME.ONE_MINUTE,
    gcTime: TIME.TEN_MINUTES,
    retry: 2,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },

  /**
   * For infrequently changing data (profile, settings, referrals)
   * - Stale after 5 minutes
   * - Garbage collected after 15 minutes
   */
  INFREQUENT: {
    staleTime: TIME.FIVE_MINUTES,
    gcTime: TIME.FIFTEEN_MINUTES,
    retry: 2,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },

  /**
   * For static or rarely changing data (help articles)
   * - Stale after 10 minutes
   * - Garbage collected after 30 minutes
   */
  STATIC: {
    staleTime: TIME.TEN_MINUTES,
    gcTime: TIME.THIRTY_MINUTES,
    retry: 2,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },

  /**
   * For health checks and system status
   * - Stale after 5 minutes
   * - Garbage collected after 10 minutes
   * - Don't refetch on window focus
   */
  HEALTH: {
    staleTime: TIME.FIVE_MINUTES,
    gcTime: TIME.TEN_MINUTES,
    retry: 3,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
  },

  /**
   * For monitoring connections (WhatsApp status)
   * - Stale after 30 seconds
   * - Garbage collected after 5 minutes
   * - Automatically refetches every minute
   */
  MONITOR: {
    staleTime: TIME.THIRTY_SECONDS,
    gcTime: TIME.FIVE_MINUTES,
    refetchInterval: TIME.ONE_MINUTE,
    retry: 2,
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  },
} as const;

// Mutation configuration
export const MUTATION_CONFIG = {
  /**
   * Standard mutation retry configuration
   * - Retry once after 1 second
   */
  DEFAULT: {
    retry: 1,
    retryDelay: 1000,
  },

  /**
   * No retry for critical operations
   */
  NO_RETRY: {
    retry: 0,
  },
} as const;

// Retry delay function for exponential backoff
export const exponentialBackoff = (attemptIndex: number, maxDelay: number = 30000): number => {
  return Math.min(1000 * 2 ** attemptIndex, maxDelay);
};
