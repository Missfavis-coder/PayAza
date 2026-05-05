import { apiClient } from "@/lib/api";
import { API_ROUTES } from "@/lib/api/config";
import type {
  DashboardOverviewParams,
  DashboardOverviewResponse,
  UsageAnalyticsParams,
  UsageAnalyticsResponse,
  UsageLogsParams,
  UsageLogsResponse,
  BillingOverviewResponse,
  TransactionsParams,
  TransactionsResponse,
  AddCreditsRequest,
  AddCreditsResponse,
  ReferralOverviewResponse,
  ReferralListParams,
  ReferralListResponse,
  NotificationsParams,
  NotificationsResponse,
  MarkNotificationReadResponse,
  MarkAllNotificationsReadResponse,
  SettingsOverviewResponse,
  ConnectIntegrationRequest,
  ConnectIntegrationResponse,
  DisconnectIntegrationResponse,
  HelpArticlesResponse,
  SubmitSupportRequest,
  SubmitSupportResponse,
} from "@/lib/types/api";

export const dashboardService = {
  overview: {
    async get(
      params?: DashboardOverviewParams
    ): Promise<DashboardOverviewResponse> {
      return apiClient.get<DashboardOverviewResponse>(
        API_ROUTES.dashboard.overview.get,
        { params }
      );
    },
  },

  usage: {
    async getAnalytics(
      params?: UsageAnalyticsParams
    ): Promise<UsageAnalyticsResponse> {
      return apiClient.get<UsageAnalyticsResponse>(
        API_ROUTES.dashboard.usage.analytics,
        { params }
      );
    },

    async getLogs(params?: UsageLogsParams): Promise<UsageLogsResponse> {
      return apiClient.get<UsageLogsResponse>(API_ROUTES.dashboard.usage.logs, {
        params,
      });
    },
  },

  billing: {
    async getOverview(): Promise<BillingOverviewResponse> {
      return apiClient.get<BillingOverviewResponse>(
        API_ROUTES.dashboard.billing.overview
      );
    },

    async getTransactions(
      params?: TransactionsParams
    ): Promise<TransactionsResponse> {
      return apiClient.get<TransactionsResponse>(
        API_ROUTES.dashboard.billing.transactions,
        { params }
      );
    },

    async addCredits(data: AddCreditsRequest): Promise<AddCreditsResponse> {
      return apiClient.post<AddCreditsResponse>(
        API_ROUTES.dashboard.billing.addCredits,
        data
      );
    },
  },

  referrals: {
    async getOverview(): Promise<ReferralOverviewResponse> {
      return apiClient.get<ReferralOverviewResponse>(
        API_ROUTES.dashboard.referrals.overview
      );
    },

    async getList(params?: ReferralListParams): Promise<ReferralListResponse> {
      return apiClient.get<ReferralListResponse>(
        API_ROUTES.dashboard.referrals.list,
        { params }
      );
    },
  },

  notifications: {
    async getList(
      params?: NotificationsParams
    ): Promise<NotificationsResponse> {
      return apiClient.get<NotificationsResponse>(
        API_ROUTES.dashboard.notifications.list,
        { params }
      );
    },

    async markAsRead(id: string): Promise<MarkNotificationReadResponse> {
      return apiClient.patch<MarkNotificationReadResponse>(
        API_ROUTES.dashboard.notifications.markRead(id)
      );
    },

    async markAllAsRead(): Promise<MarkAllNotificationsReadResponse> {
      return apiClient.patch<MarkAllNotificationsReadResponse>(
        API_ROUTES.dashboard.notifications.markAllRead
      );
    },
  },

  settings: {
    async getOverview(): Promise<SettingsOverviewResponse> {
      return apiClient.get<SettingsOverviewResponse>(
        API_ROUTES.dashboard.settings.overview
      );
    },

    async connectIntegration(
      integrationId: string,
      data?: ConnectIntegrationRequest
    ): Promise<ConnectIntegrationResponse> {
      return apiClient.post<ConnectIntegrationResponse>(
        API_ROUTES.dashboard.settings.connectIntegration(integrationId),
        data
      );
    },

    async disconnectIntegration(
      integrationId: string
    ): Promise<DisconnectIntegrationResponse> {
      return apiClient.delete<DisconnectIntegrationResponse>(
        API_ROUTES.dashboard.settings.disconnectIntegration(integrationId)
      );
    },
  },

  help: {
    async getArticles(): Promise<HelpArticlesResponse> {
      return apiClient.get<HelpArticlesResponse>(
        API_ROUTES.dashboard.help.articles
      );
    },

    async submitSupport(
      data: SubmitSupportRequest
    ): Promise<SubmitSupportResponse> {
      return apiClient.post<SubmitSupportResponse>(
        API_ROUTES.dashboard.help.support,
        data
      );
    },
  },
};
