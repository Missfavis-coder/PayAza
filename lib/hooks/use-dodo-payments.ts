"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { DodoPayments } from "dodopayments-checkout";
import type { CurrencyCode, CheckoutSessionOptions } from "@/lib/types/currency";
import { suppressDodoPaymentsWarnings } from "@/lib/utils/console-filter";

interface CheckoutResult {
  success: boolean;
  checkoutUrl?: string;
  sessionId?: string;
  error?: string;
}


interface BuyCreditsOptions {
  currency?: CurrencyCode;
  quantity?: number;
  source?: string;
  customer?: {
    id?: string;
    customer_id?: string;
    email?: string;
    name?: string;
  };
  whatsappId?: string | null;
  metadata?: Record<string, string | number | boolean>;
  onSuccess?: (sessionId: string) => void;
  onError?: (error: string) => void;
}

interface DodoPaymentsState {
  isInitialized: boolean;
  isCheckoutOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const PRODUCT_ID = process.env.NEXT_PUBLIC_DODO_PRODUCT_ID;
const SESSION_STORAGE_KEY = "dodo_last_session_id";

export const useDodoPayments = () => {
  const [state, setState] = useState<DodoPaymentsState>({
    isInitialized: false,
    isCheckoutOpen: false,
    isLoading: false,
    error: null,
  });

  const initializationRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || initializationRef.current) return;

    suppressDodoPaymentsWarnings();

    try {
      const mode = (process.env.NEXT_PUBLIC_DODO_PAYMENTS_MODE as "test" | "live") ||
        (process.env.NODE_ENV === "production" ? "live" : "test");

      DodoPayments.Initialize({
        mode,
        displayType: "overlay",
        onEvent: (event) => {
          if (event.event_type === "checkout.opened") {
            setState((prev) => ({ ...prev, isCheckoutOpen: true }));
          } else if (event.event_type === "checkout.closed") {
            setState((prev) => ({ ...prev, isCheckoutOpen: false }));
          }

          if (event.event_type === "checkout.status" && event.data?.status === "succeeded") {
            window.location.reload();
          }
        },
      });

      initializationRef.current = true;
      setState((prev) => ({ ...prev, isInitialized: true }));
    } catch (error) {
    }
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, isLoading: loading, error: loading ? null : prev.error }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const openCheckoutOverlay = useCallback(
    (checkoutUrl: string, options?: { showTimer?: boolean; showSecurityBadge?: boolean }) => {
      if (!state.isInitialized) {
        return;
      }

      DodoPayments.Checkout.open({
        checkoutUrl,
        options: {
          showTimer: options?.showTimer ?? true,
          showSecurityBadge: options?.showSecurityBadge ?? true,
          manualRedirect: false,
        },
      });
    },
    [state.isInitialized]
  );

  const closeCheckout = useCallback(() => {
    if (!state.isInitialized) return;
    DodoPayments.Checkout.close();
  }, [state.isInitialized]);

  const createCheckoutSession = useCallback(
    async (options: CheckoutSessionOptions): Promise<CheckoutResult> => {
      if (!state.isInitialized) {
        return { success: false, error: "Payment system not ready" };
      }

      setLoading(true);

      try {
        const response = await fetch("/api/checkout/create-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: options.productId,
            quantity: options.quantity || 1,
            currency: options.currency,
            allowedPaymentMethods: options.allowedPaymentMethods || [
              "credit",
              "debit",
              "apple_pay",
              "google_pay",
            ],
            metadata: options.metadata || {},
            customer: options.customer,
            whatsappId: options.whatsappId,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to create checkout session");
        }

        const data = await response.json();
        openCheckoutOverlay(data.checkoutUrl);

        setLoading(false);
        return {
          success: true,
          checkoutUrl: data.checkoutUrl,
          sessionId: data.sessionId,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to create session";
        setError(errorMessage);
        setLoading(false);
        return { success: false, error: errorMessage };
      }
    },
    [state.isInitialized, openCheckoutOverlay, setLoading, setError]
  );

  const buyCredits = useCallback(
    async (options: BuyCreditsOptions = {}): Promise<CheckoutResult> => {
      if (!state.isInitialized) {
        const error = "Payment system not ready";
        options.onError?.(error);
        return { success: false, error };
      }

      if (!PRODUCT_ID) {
        const error = "Product ID not configured";
        options.onError?.(error);
        return { success: false, error };
      }

      setLoading(true);

      try {
        const response = await fetch("/api/checkout/create-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: PRODUCT_ID,
            quantity: options.quantity || 1,
            currency: options.currency,
            metadata: {
              ...options.metadata,
              source: options.source || "app",
            },
            customer: options.customer,
            whatsappId: options.whatsappId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create checkout session");
        }

        const { checkoutUrl, sessionId } = await response.json();

        localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
        openCheckoutOverlay(checkoutUrl);
        options.onSuccess?.(sessionId);

        setLoading(false);
        return { success: true, checkoutUrl, sessionId };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to buy credits";
        setError(errorMessage);
        options.onError?.(errorMessage);
        setLoading(false);
        return { success: false, error: errorMessage };
      }
    },
    [state.isInitialized, openCheckoutOverlay, setLoading, setError]
  );


  const getLastSessionId = useCallback(() => {
    return localStorage.getItem(SESSION_STORAGE_KEY);
  }, []);

  const clearSession = useCallback(() => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }, []);

  return {
    ...state,
    buyCredits,
    createCheckoutSession,
    openCheckoutOverlay,
    closeCheckout,
    getLastSessionId,
    clearSession,
  };
};
