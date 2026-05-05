/**
 * Hook return type definitions
 *
 * This file contains explicit type definitions for all React Query hooks
 * to improve type safety and developer experience.
 */

import type {
  UseQueryResult,
  UseMutationResult,
  UseInfiniteQueryResult,
} from "@tanstack/react-query";
import type { ApiError } from "@/lib/api";
import type {
  // Dashboard
  DashboardOverviewParams,
  DashboardOverviewResponse,

  // Usage
  UsageAnalyticsParams,
  UsageAnalyticsResponse,
  UsageLogsParams,
  UsageLogsResponse,

  // Billing
  BillingOverviewResponse,
  TransactionsParams,
  TransactionsResponse,
  AddCreditsRequest,
  AddCreditsResponse,

  // Referrals
  ReferralOverviewResponse,
  ReferralListParams,
  ReferralListResponse,

  // Notifications
  NotificationsParams,
  NotificationsResponse,

  // Settings
  SettingsOverviewResponse,
  ConnectIntegrationRequest,
  ConnectIntegrationResponse,

  // Help
  HelpArticlesResponse,
  SubmitSupportRequest,
  SubmitSupportResponse,

  // WhatsApp
  WhatsAppStatusResponse,
  WhatsAppConnectRequest,
  WhatsAppConnectResponse,
  WhatsAppVerifyRequest,
  WhatsAppVerifyResponse,
  WhatsAppDisconnectResponse,

  // Profile
  ProfileResponse,

  // Health
  HealthCheckResponse,
} from "./api";

// ============================================================================
// Dashboard Hooks
// ============================================================================

export type UseDashboardOverviewResult = UseQueryResult<
  DashboardOverviewResponse,
  ApiError
>;

export type UseUsageAnalyticsResult = UseQueryResult<
  UsageAnalyticsResponse,
  ApiError
>;

export type UseUsageLogsResult = UseQueryResult<
  UsageLogsResponse,
  ApiError
>;

// ============================================================================
// Billing Hooks
// ============================================================================

export type UseBillingOverviewResult = UseQueryResult<
  BillingOverviewResponse,
  ApiError
>;

export type UseTransactionsResult = UseQueryResult<
  TransactionsResponse,
  ApiError
>;

export type UseAddCreditsMutationResult = UseMutationResult<
  AddCreditsResponse,
  ApiError,
  AddCreditsRequest,
  unknown
>;

// ============================================================================
// Referrals Hooks
// ============================================================================

export type UseReferralOverviewResult = UseQueryResult<
  ReferralOverviewResponse,
  ApiError
>;

export type UseReferralListResult = UseQueryResult<
  ReferralListResponse,
  ApiError
>;

// ============================================================================
// Notifications Hooks
// ============================================================================

export type UseNotificationsResult = UseQueryResult<
  NotificationsResponse,
  ApiError
>;

export type UseMarkNotificationReadMutationResult = UseMutationResult<
  void,
  ApiError,
  string,
  { previousData: [any, any][] }
>;

export type UseMarkAllNotificationsReadMutationResult = UseMutationResult<
  void,
  ApiError,
  void,
  { previousData: [any, any][] }
>;

// ============================================================================
// Settings Hooks
// ============================================================================

export type UseSettingsOverviewResult = UseQueryResult<
  SettingsOverviewResponse,
  ApiError
>;

export type UseConnectIntegrationMutationResult = UseMutationResult<
  ConnectIntegrationResponse,
  ApiError,
  { integrationId: string; data?: ConnectIntegrationRequest },
  unknown
>;

export type UseDisconnectIntegrationMutationResult = UseMutationResult<
  void,
  ApiError,
  string,
  unknown
>;

// ============================================================================
// Help Hooks
// ============================================================================

export type UseHelpArticlesResult = UseQueryResult<
  HelpArticlesResponse,
  ApiError
>;

export type UseSubmitSupportMutationResult = UseMutationResult<
  SubmitSupportResponse,
  ApiError,
  SubmitSupportRequest,
  unknown
>;

// ============================================================================
// WhatsApp Hooks
// ============================================================================

export type UseWhatsAppStatusResult = UseQueryResult<
  WhatsAppStatusResponse,
  ApiError
>;

export type UseRequestOTPMutationResult = UseMutationResult<
  WhatsAppConnectResponse,
  ApiError,
  WhatsAppConnectRequest,
  unknown
>;

export type UseVerifyOTPMutationResult = UseMutationResult<
  WhatsAppVerifyResponse,
  ApiError,
  WhatsAppVerifyRequest,
  unknown
>;

export type UseDisconnectWhatsAppMutationResult = UseMutationResult<
  WhatsAppDisconnectResponse,
  ApiError,
  void,
  unknown
>;

// ============================================================================
// Profile Hooks
// ============================================================================

export type UseProfileResult = UseQueryResult<ProfileResponse, ApiError>;

// ============================================================================
// Health Hooks
// ============================================================================

export type UseHealthCheckResult = UseQueryResult<HealthCheckResponse, ApiError>;
