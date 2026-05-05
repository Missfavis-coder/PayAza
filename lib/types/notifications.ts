import type { PaginatedResponse } from "./common";

export interface NotificationsParams {
  page?: number;
  limit?: number;
  search?: string;
  unread?: boolean;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  author: string;
  category: string;
  type: string;
  read: boolean;
  times: string;
  unread: boolean;
}

export type NotificationsResponse = PaginatedResponse<Notification>;

export interface MarkNotificationReadResponse {
  success: boolean;
  message: string;
}

export interface MarkAllNotificationsReadResponse {
  success: boolean;
  message: string;
  count: number;
}
