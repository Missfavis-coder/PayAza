import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dashboardService } from "@/lib/services";
import { queryKeys } from "@/lib/query/query-keys";
import type {
  DashboardOverviewParams,
  UsageAnalyticsParams,
  UsageLogsParams,
  TransactionsParams,
  ReferralListParams,
  NotificationsParams,
  AddCreditsRequest,
  ConnectIntegrationRequest,
  SubmitSupportRequest,
} from "@/lib/types/api";

export const useDashboardOverview = (params?: DashboardOverviewParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.overview(params),
    queryFn: () => dashboardService.overview.get(params),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useUsageAnalytics = (params?: UsageAnalyticsParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.usage.analytics(params),
    queryFn: () => dashboardService.usage.getAnalytics(params),
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useUsageLogs = (params?: UsageLogsParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.usage.logs(params),
    queryFn: () => dashboardService.usage.getLogs(params),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useBillingOverview = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.billing.overview(),
    queryFn: () => dashboardService.billing.getOverview(),
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useTransactions = (params?: TransactionsParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.billing.transactions(params),
    queryFn: () => dashboardService.billing.getTransactions(params),
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useAddCredits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AddCreditsRequest) =>
      dashboardService.billing.addCredits(data),
    onSuccess: () => {
      toast.success("Credits added successfully");
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.billing.overview(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.billing.transactions(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.overview(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to add credits");
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useReferralOverview = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.referrals.overview(),
    queryFn: () => dashboardService.referrals.getOverview(),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useReferralList = (params?: ReferralListParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.referrals.list(params),
    queryFn: () => dashboardService.referrals.getList(params),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useNotifications = (params?: NotificationsParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.notifications.list(params),
    queryFn: () => dashboardService.notifications.getList(params),
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: (query) => {
      const lastError = query.state.error as { status?: number } | null;
      if (lastError?.status === 428) {
        return 3 * 60 * 1000;
      }
      return 30 * 1000;
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dashboardService.notifications.markAsRead(id),
    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.dashboard.notifications.list(),
      });

      const previousData = queryClient.getQueriesData({
        queryKey: queryKeys.dashboard.notifications.list(),
      });

      queryClient.setQueriesData(
        {
          queryKey: queryKeys.dashboard.notifications.list(),
        },
        (old: any) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((n: any) =>
              n.id === id ? { ...n, read: true, unread: false } : n
            ),
            unreadCount: Math.max(0, (old.unreadCount || 0) - 1),
          };
        }
      );

      return { previousData };
    },
    onError: (error: Error, _id, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.error(error.message || "Failed to mark notification as read");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.notifications.list(),
      });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => dashboardService.notifications.markAllAsRead(),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.dashboard.notifications.list(),
      });

      const previousData = queryClient.getQueriesData({
        queryKey: queryKeys.dashboard.notifications.list(),
      });

      queryClient.setQueriesData(
        {
          queryKey: queryKeys.dashboard.notifications.list(),
        },
        (old: any) => {
          if (!old?.data) return old;
          return {
            ...old,
            data: old.data.map((n: any) => ({ ...n, read: true, unread: false })),
            unreadCount: 0,
          };
        }
      );

      return { previousData };
    },
    onError: (error: Error, _vars, context) => {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      toast.error(error.message || "Failed to mark all notifications as read");
    },
    onSuccess: () => {
      toast.success("All notifications marked as read");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.notifications.list(),
      });
    },
  });
};

export const useSettingsOverview = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.settings.overview(),
    queryFn: () => dashboardService.settings.getOverview(),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useConnectIntegration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      integrationId,
      data,
    }: {
      integrationId: string;
      data?: ConnectIntegrationRequest;
    }) => dashboardService.settings.connectIntegration(integrationId, data),
    onSuccess: () => {
      toast.success("Integration connected successfully");
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.settings.overview(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.overview(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to connect integration");
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useDisconnectIntegration = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (integrationId: string) =>
      dashboardService.settings.disconnectIntegration(integrationId),
    onSuccess: () => {
      toast.success("Integration disconnected successfully");
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.settings.overview(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.dashboard.overview(),
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to disconnect integration");
    },
    retry: 1,
    retryDelay: 1000,
  });
};

export const useHelpArticles = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.help.articles(),
    queryFn: () => dashboardService.help.getArticles(),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

export const useSubmitSupport = () => {
  return useMutation({
    mutationFn: (data: SubmitSupportRequest) =>
      dashboardService.help.submitSupport(data),
    onSuccess: () => {
      toast.success("Support request submitted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit support request");
    },
    retry: 1,
    retryDelay: 1000,
  });
};
