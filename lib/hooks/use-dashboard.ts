import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { dashboardService } from "../services/dashboard.service";
import { queryKeys } from "@/lib/query/query-keys";
import type {
  DashboardOverviewParams,
  TransactionsParams,
  NotificationsParams,
  TransferRequest,
} from "@/lib/types/api";

/* ---------------- DASHBOARD OVERVIEW ---------------- */

export const useDashboardOverview = (params?: DashboardOverviewParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.overview(params),
    queryFn: () => dashboardService.dashboard.getOverview(params),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

/* ---------------- WALLET ---------------- */

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

/* ---------------- TRANSFER ---------------- */

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

    onError: (error: Error) => {
      toast.error(error.message || "Transfer failed");
    },
  });
};

/* ---------------- NOTIFICATIONS ---------------- */

export const useNotifications = (params?: NotificationsParams) => {
  return useQuery({
    queryKey: queryKeys.notifications.list(params),
    queryFn: () => dashboardService.notifications.getList(params),
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchInterval: 30 * 1000,
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      dashboardService.notifications.markAsRead(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({
        queryKey: queryKeys.notifications.list(),
      });

      const previous = queryClient.getQueryData(
        queryKeys.notifications.list()
      );

      queryClient.setQueryData(queryKeys.notifications.list(), (old: any) => {
        if (!old?.data) return old;

        return {
          ...old,
          data: old.data.map((n: any) =>
            n.id === id ? { ...n, read: true } : n
          ),
        };
      });

      return { previous };
    },

    onError: (error: Error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          queryKeys.notifications.list(),
          context.previous
        );
      }
      toast.error(error.message || "Failed to mark as read");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.list(),
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

      const previous = queryClient.getQueryData(
        queryKeys.notifications.list()
      );

      queryClient.setQueryData(queryKeys.notifications.list(), (old: any) => {
        if (!old?.data) return old;

        return {
          ...old,
          data: old.data.map((n: any) => ({
            ...n,
            read: true,
          })),
        };
      });

      return { previous };
    },

    onError: (error: Error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          queryKeys.notifications.list(),
          context.previous
        );
      }
      toast.error(error.message || "Failed to mark all as read");
    },

    onSuccess: () => {
      toast.success("All notifications marked as read");
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.list(),
      });
    },
  });
};