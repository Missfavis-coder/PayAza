import { apiClient } from "@/lib/api";
import { API_ROUTES } from "@/lib/api/config";
import type {
  DashboardOverviewParams,
  DashboardOverviewResponse,
  TransactionsParams,
  TransactionsResponse,
  NotificationsParams,
  NotificationsResponse,
  MarkNotificationReadResponse,
  MarkAllNotificationsReadResponse,
  WalletBalanceResponse,
} from "@/lib/types/api";

export const dashboardService = {
  dashboard: {
    async getOverview(
      params?: DashboardOverviewParams
    ): Promise<DashboardOverviewResponse> {
      return apiClient.get(API_ROUTES.health, { params }); // replace if backend has /dashboard/overview
    },
  },

  wallet: {
    async getBalance(): Promise<WalletBalanceResponse> {
      return apiClient.get(API_ROUTES.wallet.balance);
    },

    async getTransactions(
      params?: TransactionsParams
    ): Promise<TransactionsResponse> {
      return apiClient.get(API_ROUTES.wallet.transactions, { params });
    },
  },

  transfer: {
    async initiate(data: any) {
      return apiClient.post(API_ROUTES.transfer.initiate, data);
    },

    async execute(data: any) {
      return apiClient.post(API_ROUTES.transfer.execute, data);
    },
  },

  notifications: {
    async getList(
      params?: NotificationsParams
    ): Promise<NotificationsResponse> {
      return apiClient.get(API_ROUTES.notifications.list, { params });
    },

    async markAsRead(id: string): Promise<MarkNotificationReadResponse> {
      return apiClient.patch(API_ROUTES.notifications.markRead(id));
    },

    async markAllAsRead(): Promise<MarkAllNotificationsReadResponse> {
      return apiClient.patch(API_ROUTES.notifications.markAllRead);
    },
  },
};