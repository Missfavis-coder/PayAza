/**
 * Centralized user-facing messages
 *
 * This file contains all toast messages, error messages, and user feedback text
 * to ensure consistency across the application.
 */

export const TOAST_MESSAGES = {
  // Credits
  CREDITS_ADDED: "Credits added successfully",
  CREDITS_FAILED: "Failed to add credits",

  // Notifications
  NOTIFICATION_READ: "Notification marked as read",
  NOTIFICATION_READ_FAILED: "Failed to mark notification as read",
  ALL_NOTIFICATIONS_READ: "All notifications marked as read",
  ALL_NOTIFICATIONS_READ_FAILED: "Failed to mark all notifications as read",

  // Integrations
  INTEGRATION_CONNECTED: "Integration connected successfully",
  INTEGRATION_CONNECT_FAILED: "Failed to connect integration",
  INTEGRATION_DISCONNECTED: "Integration disconnected successfully",
  INTEGRATION_DISCONNECT_FAILED: "Failed to disconnect integration",

  // WhatsApp
  OTP_SENT: "OTP sent successfully",
  OTP_SEND_FAILED: "Failed to send OTP",
  WHATSAPP_CONNECTED: "WhatsApp connected successfully",
  OTP_VERIFY_FAILED: "Failed to verify OTP",
  WHATSAPP_DISCONNECTED: "WhatsApp disconnected successfully",
  WHATSAPP_DISCONNECT_FAILED: "Failed to disconnect WhatsApp",

  // Support
  SUPPORT_SUBMITTED: "Support request submitted successfully",
  SUPPORT_SUBMIT_FAILED: "Failed to submit support request",

  // Generic
  OPERATION_SUCCESS: "Operation completed successfully",
  OPERATION_FAILED: "Operation failed. Please try again",
  NETWORK_ERROR: "Network error. Please check your connection",
  SESSION_EXPIRED: "Your session has expired. Please log in again",
} as const;

export const ERROR_MESSAGES = {
  // Auth
  TOKEN_EXPIRED: "Your session has expired",
  TOKEN_INVALID: "Invalid authentication token",
  TOKEN_REFRESH_FAILED: "Failed to refresh authentication token",

  // API
  REQUEST_TIMEOUT: "Request timeout",
  NETWORK_ERROR: "Network error occurred",
  SERVER_ERROR: "Server error occurred",
  NOT_FOUND: "Resource not found",
  FORBIDDEN: "You don't have permission to access this resource",

  // Generic
  UNKNOWN_ERROR: "An unknown error occurred",
  VALIDATION_ERROR: "Please check your input and try again",
} as const;

export const LOADING_MESSAGES = {
  LOADING: "Loading...",
  PROCESSING: "Processing...",
  SAVING: "Saving...",
  CONNECTING: "Connecting...",
  DISCONNECTING: "Disconnecting...",
  VERIFYING: "Verifying...",
} as const;
