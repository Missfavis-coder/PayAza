/**
 * Pagination configuration
 *
 * This file contains all pagination-related constants to ensure consistency
 * across the application.
 */

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,

  // Common limits for different use cases
  LIMITS: {
    SMALL: 5,
    MEDIUM: 10,
    LARGE: 25,
    XLARGE: 50,
  },

  // Preset pagination params
  PRESETS: {
    SMALL: { page: 1, limit: 5 },
    MEDIUM: { page: 1, limit: 10 },
    LARGE: { page: 1, limit: 25 },
    XLARGE: { page: 1, limit: 50 },
  },
} as const;
