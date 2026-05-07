"use client";

import { useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/lib/hooks/use-auth";
import { useNotificationSocket } from "@/lib/hooks/use-notification-socket";
import { queryKeys } from "@/lib/query/query-keys";
import { formatNaira } from "@/lib/utils";
import type { Notification, NotificationsResponse } from "@/lib/types/api";

const TOAST_CLASSES: Record<Notification["type"], string> = {
  CREDIT:
    "border border-emerald-500/30 bg-emerald-500/15 text-emerald-100 ring-1 ring-emerald-500/20",
  DEBIT:
    "border border-rose-500/30 bg-rose-500/15 text-rose-100 ring-1 ring-rose-500/20",
  ALERT:
    "border border-amber-500/30 bg-amber-500/15 text-amber-100 ring-1 ring-amber-500/20",
};

function toastTitle(n: Notification): string {
  const amount = n.metaData?.amount;
  if (n.type === "CREDIT" && typeof amount === "number") {
    return `Payment Received — ${formatNaira(amount)}`;
  }
  if (n.type === "DEBIT" && typeof amount === "number") {
    return `Payment Sent — ${formatNaira(amount)}`;
  }
  return n.title;
}

export function NotificationRealtimeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  const handleNew = useCallback(
    (n: Notification) => {
      // 1. Bump unread count cache
      queryClient.setQueryData<{ count: number }>(
        queryKeys.notifications.unreadCount(),
        (prev) => ({ count: (prev?.count ?? 0) + 1 }),
      );

      // 2. Prepend to every cached notifications list page
      const lists = queryClient.getQueriesData<NotificationsResponse>({
        queryKey: queryKeys.notifications.list(),
      });
      for (const [key, value] of lists) {
        if (!value?.data) continue;
        if (value.data.notifications.some((existing) => existing.id === n.id)) {
          continue;
        }
        queryClient.setQueryData<NotificationsResponse>(key, {
          ...value,
          data: {
            ...value.data,
            notifications: [n, ...value.data.notifications],
            meta: {
              ...value.data.meta,
              total: (value.data.meta.total ?? 0) + 1,
              unreadCount: (value.data.meta.unreadCount ?? 0) + 1,
            },
          },
        });
      }

      // 3. Refresh wallet balance + recent transactions / analytics so the
      //    home dashboard reflects the new transfer immediately.
      if (n.type === "CREDIT" || n.type === "DEBIT") {
        queryClient.invalidateQueries({
          queryKey: queryKeys.wallet.balance(),
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.wallet.transactions(),
        });
        queryClient.invalidateQueries({
          queryKey: queryKeys.analytics.me(),
        });
      }

      // 4. In-app toast banner — color by type, navigates on tap
      const className = TOAST_CLASSES[n.type] ?? TOAST_CLASSES.ALERT;
      toast.custom(
        (id) => (
          <button
            type="button"
            onClick={() => {
              router.push("/dashboard/transactions");
              toast.dismiss(id);
            }}
            className={`w-full text-left rounded-md px-3 py-2 backdrop-blur ${className}`}
          >
            <p className="text-sm font-semibold">{toastTitle(n)}</p>
            {n.body ? (
              <p className="text-xs opacity-80 mt-0.5">{n.body}</p>
            ) : null}
          </button>
        ),
        { duration: 4000 },
      );
    },
    [queryClient, router],
  );

  useNotificationSocket(handleNew, { enabled: isAuthenticated });

  return <>{children}</>;
}
