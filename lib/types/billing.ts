import type { PaginatedResponse } from "./common";
type TransactionStatus = "Successful" | "Pending" | "Failed";
type UserTier = "free" | "paid";

export interface UserBalance {
  credits: number;
  freeTokensUsed: number;
  freeTokensRemaining: number;
  maxDailyFreeTokens: number;
  willUseCreditsNext: boolean;
  hasCredits: boolean;
}

export interface BillingOverviewResponse {
  currentBalance: number;
  subscriptionTier: string;
  userTier: UserTier;
  billingCycle: string;
  nextBillingDate: string;
  credits: {
    available: number;
    usedThisMonth: number;
    currency: string;
  };
  freeTokens: {
    used: number;
    remaining: number;
    maxDaily: number;
    resetTime: string;
  };
  upcomingCharges: {
    amount: number;
    description: string;
    date: string;
  }[];
}

export interface TransactionsParams {
  page?: number;
  limit?: number;
}

export interface Transaction {
  id: string;
  amount: number;
  invoiceUrl: string;
  type: string;
  credits: string;
  status: TransactionStatus;
  date: string;
}

export type TransactionsResponse = PaginatedResponse<Transaction>;

export interface AddCreditsRequest {
  amount: number;
  paymentMethodId?: string;
}

export interface AddCreditsResponse {
  success: boolean;
  transactionId: string;
  newBalance: number;
  message: string;
}

export interface CreateCheckoutSessionRequest {
  productId: string;
  quantity?: number;
  currency?: string;
  allowedPaymentMethods?: string[];
  metadata?: Record<string, string | number | boolean>;
  customer?: {
    email: string;
    name?: string;
    customer_id?: string;
  };
}

export interface CreateCheckoutSessionResponse {
  checkoutUrl: string;
  sessionId: string;
}
