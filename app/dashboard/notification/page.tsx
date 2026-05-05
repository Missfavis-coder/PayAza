"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  CheckCircle,
  AlertTriangle,
  Tag,
  Search,
} from "lucide-react";

import {
  useNotifications,
  useMarkNotificationRead,
} from "@/lib/hooks/use-dashboard";

/* ---------------- TYPES ---------------- */

type Notification = {
  id: string;
  type: "TRANSACTION" | "ALERT" | "PROMOTION";
  message: string;
  createdAt: string;
  read: boolean;
};

/* ---------------- SKELETON ---------------- */

const NotificationSkeleton = () => {
  return (
    <Card className="border rounded-md bg-neutral-900 border-neutral-800 py-2 animate-pulse">
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-2 w-full">
          <div className="w-5 h-5 bg-neutral-700 rounded-full" />
          <div className="h-3 w-3/4 bg-neutral-700 rounded" />
        </div>
        <div className="h-6 w-16 bg-neutral-700 rounded" />
      </CardHeader>
      <CardContent>
        <div className="h-3 w-20 bg-neutral-800 rounded" />
      </CardContent>
    </Card>
  );
};

/* ---------------- COMPONENT ---------------- */

export default function Page() {
  const [search, setSearch] = React.useState("");

  const { data, isLoading } = useNotifications();
  const { mutate: markAsReadMutation, isPending } = useMarkNotificationRead();

  /* SAFE NORMALIZATION */
  const notifications: Notification[] = React.useMemo(() => {
    return (data?.data ?? []).map((n: any) => ({
      id: n.id,
      type: n.type ?? "ALERT",
      message: n.message,
      createdAt: n.createdAt,
      read: n.read ?? false,
    }));
  }, [data]);

  const markAsRead = (id: string) => {
    markAsReadMutation(id);
  };

  const renderIcon = (type: Notification["type"]) => {
    switch (type) {
      case "TRANSACTION":
        return <CheckCircle className="text-green-500 w-5 h-5" />;
      case "ALERT":
        return <AlertTriangle className="text-red-500 w-5 h-5" />;
      case "PROMOTION":
        return <Tag className="text-blue-500 w-5 h-5" />;
      default:
        return <Bell className="text-gray-400 w-5 h-5" />;
    }
  };

  const filteredNotifications = React.useMemo(() => {
    return notifications.filter((n) =>
      n.message.toLowerCase().includes(search.toLowerCase())
    );
  }, [notifications, search]);

  const formatTime = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "Just now";
    if (mins < 60) return `${mins} mins ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hrs ago`;
    const days = Math.floor(hrs / 24);
    return `${days} days ago`;
  };

  return (
    <div className="md:p-4 p-4 space-y-4">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="md:text-2xl text-xl tracking-wider font-bold">
          Notifications
        </h1>
        <p className="text-neutral-400 text-sm mt-2">
          Stay updated with all your transaction details and others.
        </p>
      </div>

      {/* SEARCH */}
      <div className="relative w-1/2 mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search notifications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#00CF7B]"
        />
      </div>

      {/* CONTENT */}
      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <NotificationSkeleton key={i} />
          ))}
        </div>
      ) : filteredNotifications.length > 0 ? (
        filteredNotifications.map((notif) => (
          <Card
            key={notif.id}
            className={`border rounded-md ${
              notif.read
                ? "bg-neutral-900 border-neutral-800"
                : "border-neutral-700 bg-neutral-900"
            } py-2`}
          >
            <CardHeader className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {renderIcon(notif.type)}
                <CardTitle className="lg:text-sm text-xs font-medium">
                  {notif.message}
                </CardTitle>
              </div>

              {!notif.read && (
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={isPending}
                  onClick={() => markAsRead(notif.id)}
                >
                  {isPending ? "..." : "Mark as read"}
                </Button>
              )}
            </CardHeader>

            <CardContent>
              <CardDescription className="text-xs text-gray-500">
                {formatTime(notif.createdAt)}
              </CardDescription>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center py-10 text-gray-400">
          <p className="text-sm">No notifications yet</p>
          <p className="text-xs mt-1">You're all caught up 🎉</p>
        </div>
      )}
    </div>
  );
}