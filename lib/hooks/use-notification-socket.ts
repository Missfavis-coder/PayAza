"use client";

import { useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";

import { tokenStorage } from "@/lib/api/client";
import { getNotificationSocketUrl } from "@/lib/api/config";
import type { Notification } from "@/lib/types/api";

type NotificationHandler = (notification: Notification) => void;

interface Options {
  enabled?: boolean;
}

export function useNotificationSocket(
  onNotification: NotificationHandler,
  { enabled = true }: Options = {},
) {
  // Keep the latest handler in a ref so we don't reconnect when callers
  // pass an inline arrow function on every render.
  const handlerRef = useRef(onNotification);
  useEffect(() => {
    handlerRef.current = onNotification;
  }, [onNotification]);

  useEffect(() => {
    if (!enabled) return;
    const token = tokenStorage.getAccessToken();
    if (!token) return;

    const socket: Socket = io(getNotificationSocketUrl(), {
      query: { token },
      auth: { token },
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    const onNotif = (notification: Notification) => {
      handlerRef.current(notification);
    };

    socket.on("notification", onNotif);

    socket.on("connect_error", (err) => {
      console.error("Notification socket error:", err.message);
    });

    return () => {
      socket.off("notification", onNotif);
      socket.disconnect();
    };
  }, [enabled]);
}
