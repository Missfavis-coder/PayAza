import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dashboardService } from "../services/dashboard.service";
import { queryKeys } from "@/lib/query/query-keys";
import type {
  DashboardOverviewParams,
  TransactionsParams,
  NotificationsParams,
  NotificationsResponse,
  TransferRequest,
} from "@/lib/types/api";


export const useDashboardOverview = (params?: DashboardOverviewParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.overview(params),
    queryFn: () => dashboardService.dashboard.getOverview(params),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};


export const useWalletBalance = () => {
  return useQuery({
    queryKey: queryKeys.wallet.balance(),
    queryFn: () => dashboardService.wallet.getBalance(),

    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useTransactions = (params?: TransactionsParams) => {
  return useQuery({
    queryKey: queryKeys.wallet.transactions(params),
    queryFn: () => dashboardService.wallet.getTransactions(params),
    staleTime: 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};



export const useInitiateTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransferRequest) =>
      dashboardService.transfer.initiate(data),

    onSuccess: () => {
      toast.success("Transfer initiated");

      queryClient.invalidateQueries({
        queryKey: queryKeys.wallet.balance(),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.wallet.transactions(),
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Transfer failed");
    },
  });
};

export const useExecuteTransfer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TransferRequest) =>
      dashboardService.transfer.execute(data),

    onSuccess: () => {
      toast.success("Transfer completed");

      queryClient.invalidateQueries({
        queryKey: queryKeys.wallet.balance(),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.wallet.transactions(),
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Execution failed");
    },
  });
};


export const usePayazaTopUp = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) =>
      dashboardService.payaza.handleTopUp(data),

    onSuccess: () => {
      toast.success("Wallet funded successfully");

      queryClient.invalidateQueries({
        queryKey: queryKeys.wallet.balance(),
      });

      queryClient.invalidateQueries({
        queryKey: queryKeys.wallet.transactions(),
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Top-up failed");
    },
  });
};


export const useNotifications = (params?: NotificationsParams) => {
  return useQuery({
    queryKey: queryKeys.notifications.list(params),
    queryFn: () => dashboardService.notifications.getList(params),
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
  });
};

export const useUnreadNotificationsCount = () => {
  return useQuery({
    queryKey: queryKeys.notifications.unreadCount(),
    queryFn: () => dashboardService.notifications.getUnreadCount(),
    staleTime: 10 * 1000,
  });
};

function patchNotificationsLists(
  queryClient: ReturnType<typeof useQueryClient>,
  patch: (n: NotificationsResponse["data"]["notifications"][number]) =>
    NotificationsResponse["data"]["notifications"][number],
  metaPatch?: (
    meta: NotificationsResponse["data"]["meta"],
  ) => NotificationsResponse["data"]["meta"],
) {
  const queries = queryClient.getQueriesData<NotificationsResponse>({
    queryKey: queryKeys.notifications.list(),
  });
  for (const [key, value] of queries) {
    if (!value?.data) continue;
    queryClient.setQueryData<NotificationsResponse>(key, {
      ...value,
      data: {
        ...value.data,
        notifications: value.data.notifications.map(patch),
        meta: metaPatch ? metaPatch(value.data.meta) : value.data.meta,
      },
    });
  }
}

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      dashboardService.notifications.markAsRead(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.notifications.list(),
      });
      await queryClient.cancelQueries({
        queryKey: queryKeys.notifications.unreadCount(),
      });

      const previousLists = queryClient.getQueriesData<NotificationsResponse>({
        queryKey: queryKeys.notifications.list(),
      });
      const previousUnread = queryClient.getQueryData<{ count: number }>(
        queryKeys.notifications.unreadCount(),
      );

      const nowIso = new Date().toISOString();
      let wasUnread = false;

      patchNotificationsLists(
        queryClient,
        (n) => {
          if (n.id === id && !n.isRead) {
            wasUnread = true;
            return { ...n, isRead: true, readAt: nowIso };
          }
          return n;
        },
        (meta) =>
          wasUnread
            ? {
                ...meta,
                unreadCount: Math.max(0, (meta.unreadCount ?? 0) - 1),
              }
            : meta,
      );

      if (previousUnread && wasUnread) {
        queryClient.setQueryData(queryKeys.notifications.unreadCount(), {
          count: Math.max(0, previousUnread.count - 1),
        });
      }

      return { previousLists, previousUnread };
    },

    onError: (error: any, _id, context) => {
      if (context?.previousLists) {
        for (const [key, value] of context.previousLists) {
          queryClient.setQueryData(key, value);
        }
      }
      if (context?.previousUnread) {
        queryClient.setQueryData(
          queryKeys.notifications.unreadCount(),
          context.previousUnread,
        );
      }
      toast.error(error?.message || "Failed to mark as read");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.list(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.unreadCount(),
      });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      dashboardService.notifications.markAllAsRead(),

    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.notifications.list(),
      });
      await queryClient.cancelQueries({
        queryKey: queryKeys.notifications.unreadCount(),
      });

      const previousLists = queryClient.getQueriesData<NotificationsResponse>({
        queryKey: queryKeys.notifications.list(),
      });
      const previousUnread = queryClient.getQueryData<{ count: number }>(
        queryKeys.notifications.unreadCount(),
      );

      const nowIso = new Date().toISOString();
      patchNotificationsLists(
        queryClient,
        (n) => (n.isRead ? n : { ...n, isRead: true, readAt: nowIso }),
        (meta) => ({ ...meta, unreadCount: 0 }),
      );
      queryClient.setQueryData(queryKeys.notifications.unreadCount(), {
        count: 0,
      });

      return { previousLists, previousUnread };
    },

    onError: (error: any, _vars, context) => {
      if (context?.previousLists) {
        for (const [key, value] of context.previousLists) {
          queryClient.setQueryData(key, value);
        }
      }
      if (context?.previousUnread) {
        queryClient.setQueryData(
          queryKeys.notifications.unreadCount(),
          context.previousUnread,
        );
      }
      toast.error(error?.message || "Failed to mark all as read");
    },

    onSuccess: () => {
      toast.success("All notifications marked as read");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.list(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.unreadCount(),
      });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      dashboardService.notifications.deleteNotification(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.notifications.list(),
      });
      await queryClient.cancelQueries({
        queryKey: queryKeys.notifications.unreadCount(),
      });

      const previousLists = queryClient.getQueriesData<NotificationsResponse>({
        queryKey: queryKeys.notifications.list(),
      });
      const previousUnread = queryClient.getQueryData<{ count: number }>(
        queryKeys.notifications.unreadCount(),
      );

      let removedUnread = 0;
      for (const [key, value] of previousLists) {
        if (!value?.data) continue;
        const removed = value.data.notifications.find((n) => n.id === id);
        if (removed && !removed.isRead) removedUnread = 1;
        queryClient.setQueryData<NotificationsResponse>(key, {
          ...value,
          data: {
            ...value.data,
            notifications: value.data.notifications.filter(
              (n) => n.id !== id,
            ),
            meta: {
              ...value.data.meta,
              total: Math.max(0, (value.data.meta.total ?? 0) - 1),
              unreadCount: Math.max(
                0,
                (value.data.meta.unreadCount ?? 0) - removedUnread,
              ),
            },
          },
        });
      }

      if (previousUnread && removedUnread) {
        queryClient.setQueryData(queryKeys.notifications.unreadCount(), {
          count: Math.max(0, previousUnread.count - removedUnread),
        });
      }

      return { previousLists, previousUnread };
    },

    onError: (error: any, _id, context) => {
      if (context?.previousLists) {
        for (const [key, value] of context.previousLists) {
          queryClient.setQueryData(key, value);
        }
      }
      if (context?.previousUnread) {
        queryClient.setQueryData(
          queryKeys.notifications.unreadCount(),
          context.previousUnread,
        );
      }
      toast.error(error?.message || "Delete failed");
    },

    onSuccess: () => {
      toast.success("Notification deleted");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.list(),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.unreadCount(),
      });
    },
  });
};
