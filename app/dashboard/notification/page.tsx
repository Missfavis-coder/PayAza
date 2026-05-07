"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownLeft,
  ArrowUpRight,
  Bell,
  BellOff,
  RefreshCw,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import {
  useDeleteNotification,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
  useUnreadNotificationsCount,
} from "@/lib/hooks/use-dashboard";
import { cn, formatRelativeTime } from "@/lib/utils";
import type { Notification, NotificationType } from "@/lib/types/api";

const PAGE_SIZE = 20;

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const [accumulated, setAccumulated] = useState<Notification[]>([]);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useNotifications({ page, limit: PAGE_SIZE });

  const { data: unreadData } = useUnreadNotificationsCount();
  const { mutate: markAsRead } = useMarkNotificationRead();
  const { mutate: markAll, isPending: isMarkingAll } =
    useMarkAllNotificationsRead();
  const { mutate: deleteNotif } = useDeleteNotification();

  const pageNotifications = useMemo(
    () => data?.data?.notifications ?? [],
    [data],
  );
  const meta = data?.data?.meta;
  const unreadCount = unreadData?.count ?? meta?.unreadCount ?? 0;

  // Reset accumulated when the first page is replaced (e.g. via socket prepend
  // or after a mutation invalidation). Otherwise append additional pages.
  useEffect(() => {
    if (page === 1) {
      setAccumulated(pageNotifications);
      return;
    }
    setAccumulated((prev) => {
      const seen = new Set(prev.map((n) => n.id));
      return [...prev, ...pageNotifications.filter((n) => !seen.has(n.id))];
    });
  }, [pageNotifications, page]);

  const hasMore = Boolean(
    meta && meta.total > accumulated.length && pageNotifications.length > 0,
  );
  const showInitialSkeleton = isLoading && accumulated.length === 0;

  return (
    <div className="md:p-4 p-4 space-y-4">
      {/* HEADER */}
      <div className="mb-4 flex justify-between items-start gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="md:text-2xl text-xl tracking-wider font-bold">
              Notifications
            </h1>
            {unreadCount > 0 ? (
              <Badge className="h-5 bg-red-500/15 text-red-300 border border-red-500/30">
                {unreadCount} unread
              </Badge>
            ) : null}
          </div>
          <p className="text-neutral-400 text-sm mt-2">
            Stay updated with all your activity.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setPage(1);
              refetch();
            }}
            disabled={isFetching}
            className="text-neutral-300"
          >
            <RefreshCw
              size={14}
              className={isFetching ? "animate-spin" : ""}
            />
            Refresh
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => markAll()}
            disabled={isMarkingAll || unreadCount === 0}
          >
            {isMarkingAll ? "Marking…" : "Mark all read"}
          </Button>
        </div>
      </div>

      {isError ? (
        <Card className="rounded-xl border border-rose-500/30 bg-rose-500/5">
          <CardHeader className="p-4 flex flex-row items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-rose-300">
                Couldn’t load notifications
              </p>
              <p className="text-xs text-rose-200/80 mt-1">
                {(error as Error)?.message || "Request failed"}
              </p>
            </div>
            <Button size="sm" variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </CardHeader>
        </Card>
      ) : null}

      {/* LIST */}
      {showInitialSkeleton ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full bg-neutral-800/40" />
          ))}
        </div>
      ) : accumulated.length > 0 ? (
        <div className="space-y-2">
          {accumulated.map((n) => (
            <NotificationRow
              key={n.id}
              notification={n}
              onMarkRead={() => markAsRead(n.id)}
              onDelete={() => deleteNotif(n.id)}
            />
          ))}

          {hasMore ? (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                size="sm"
                disabled={isFetching}
                onClick={() => setPage((p) => p + 1)}
              >
                {isFetching ? "Loading…" : "Load more"}
              </Button>
            </div>
          ) : null}
        </div>
      ) : (
        <EmptyState />
      )}
    </div>
  );
}

const accentByType: Record<
  NotificationType,
  { icon: typeof Bell; color: string; bg: string; border: string }
> = {
  CREDIT: {
    icon: ArrowDownLeft,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-l-emerald-500",
  },
  DEBIT: {
    icon: ArrowUpRight,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-l-rose-500",
  },
  ALERT: {
    icon: AlertTriangle,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-l-amber-500",
  },
};

function NotificationRow({
  notification,
  onMarkRead,
  onDelete,
}: {
  notification: Notification;
  onMarkRead: () => void;
  onDelete: () => void;
}) {
  const accent = accentByType[notification.type] ?? accentByType.ALERT;
  const Icon = accent.icon;
  const isUnread = !notification.isRead;

  const handleClick = () => {
    if (isUnread) onMarkRead();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (confirm("Delete this notification?")) onDelete();
      }}
      className={cn(
        "group flex items-start justify-between gap-3 p-3 rounded-lg cursor-pointer",
        "border border-white/5 border-l-4 transition-colors",
        isUnread
          ? `${accent.border} bg-white/4 hover:bg-white/6`
          : "border-l-transparent bg-white/2 hover:bg-white/4",
      )}
    >
      <div className="flex items-start gap-3 min-w-0 flex-1">
        <div className={cn("p-2 rounded-lg shrink-0", accent.bg, accent.color)}>
          <Icon size={16} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p
              className={cn(
                "text-sm truncate",
                isUnread ? "font-semibold text-white" : "text-neutral-200",
              )}
            >
              {notification.title}
            </p>
            {isUnread ? (
              <span className="h-2 w-2 rounded-full bg-[#00CF7B] shrink-0" />
            ) : null}
          </div>
          {notification.body ? (
            <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
              {notification.body}
            </p>
          ) : null}
          <p className="text-[11px] text-neutral-500 mt-1">
            {formatRelativeTime(notification.createdAt)}
          </p>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Delete notification"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="opacity-0 group-hover:opacity-100 focus-visible:opacity-100 text-neutral-400 hover:text-rose-400 shrink-0"
      >
        <Trash2 size={14} />
      </Button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 border border-dashed border-white/10 rounded-lg">
      <div className="p-4 rounded-full bg-white/3 text-neutral-500 mb-3">
        <BellOff size={28} />
      </div>
      <p className="text-sm text-neutral-300 font-medium">
        No notifications yet
      </p>
      <p className="text-xs text-neutral-500 mt-1">You're all up to date 👌</p>
    </div>
  );
}
