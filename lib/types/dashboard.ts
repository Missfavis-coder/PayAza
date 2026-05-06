import type { Period } from "./common";



export interface Wallet {
  id: string;
  balance: string;
  currency: "NGN";
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface WalletBalanceResponse {
    message: string;
    data: {
      wallet: Wallet;
    }
  
}

/* ---------------- TRANSACTIONS ---------------- */

export type TransactionType = "SUCCESS" | "PENDING" | "FAILED";

export interface Transaction {
  id: string;
  description: string | null;
  type: TransactionType;
  amount: number; // NGN
  walletId: string;
  reference: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionsParams {
  page?: number;
  limit?: number;
  type?: TransactionType;
}

export interface TransactionsResponse {
  data:{
    transactions:Transaction[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  };
}

/* ---------------- DASHBOARD ---------------- */

export interface DashboardOverviewParams {
  period?: Period;
}

export interface RecentActivity {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

export interface DashboardOverviewResponse {
  period: Period;

  wallet: {
    balance: number;
    currency: "NGN";
  };

  recentActivity: RecentActivity[];
}

/* ---------------- NOTIFICATIONS ---------------- */

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationsParams {
  page?: number;
  limit?: number;
}

export interface NotificationsResponse {
  data: Notification[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface MarkNotificationReadResponse {
  success: boolean;
}

export interface MarkAllNotificationsReadResponse {
  success: boolean;
}

/* ---------------- TRANSFER ---------------- */

export interface TransferRequest {
  amount: number;
  recipientWalletId: string;
  description?: string;
}

export interface TransferResponse {
  success: boolean;
  reference: string;
}