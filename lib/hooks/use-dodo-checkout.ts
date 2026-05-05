"use client";

import { useEffect, useCallback, useState } from "react";
import { DodoPayments } from "dodopayments-checkout";
import type { CheckoutSessionOptions } from "@/lib/types/currency";
import type { CreateCheckoutSessionResponse } from "@/lib/types/billing";
import { suppressDodoPaymentsWarnings } from "@/lib/utils/console-filter";

/**
 * Hook for integrating Dodo Payments overlay checkout
 * Handles initialization and provides methods to open checkout
 */
export const useDodoCheckout = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    suppressDodoPaymentsWarnings();

    try {
      const mode =
        (process.env.NEXT_PUBLIC_DODO_PAYMENTS_MODE as "test" | "live") ||
        (process.env.NODE_ENV === "production" ? "live" : "test");

      DodoPayments.Initialize({
        mode,
        displayType: "overlay",
        onEvent: (event) => {
          if (event.event_type === "checkout.opened") {
            setIsCheckoutOpen(true);
          } else if (event.event_type === "checkout.closed") {
            setIsCheckoutOpen(false);
          }

          if (event.event_type === "checkout.status") {
            if (event.data?.status === "succeeded") {
              window.location.reload();
            }
          }

          if (event.event_type === "checkout.error") {
          }

          if (event.event_type === "checkout.link_expired") {
          }
        },
      });
      setIsInitialized(true);
    } catch (error) {
    }
  }, []);

  /**
   * Opens the Dodo Payments checkout overlay
   * @param checkoutUrl - The checkout session URL from your backend
   * @param options - Optional checkout configuration
   */
  const openCheckout = useCallback(
    (
      checkoutUrl: string,
      options?: {
        showTimer?: boolean;
        showSecurityBadge?: boolean;
        manualRedirect?: boolean;
      }
    ) => {
      if (!isInitialized) {
        return;
      }

      try {
        DodoPayments.Checkout.open({
          checkoutUrl,
          options: {
            showTimer: options?.showTimer ?? true,
            showSecurityBadge: options?.showSecurityBadge ?? true,
            manualRedirect: options?.manualRedirect ?? false,
          },
        });
      } catch (error) {
      }
    },
    [isInitialized]
  );

  /**
   * Closes the checkout overlay programmatically
   */
  const closeCheckout = useCallback(() => {
    if (!isInitialized) return;
    try {
      DodoPayments.Checkout.close();
    } catch (error) {
    }
  }, [isInitialized]);

  /**
   * Checks if checkout is currently open
   */
  const checkIsOpen = useCallback(() => {
    if (!isInitialized) return false;
    try {
      return DodoPayments.Checkout.isOpen();
    } catch (error) {
      return false;
    }
  }, [isInitialized]);

  /**
   * Creates a checkout session and opens the checkout overlay
   * @param options - Checkout session configuration including currency and payment methods
   */
  const createCheckoutSession = useCallback(
    async (options: CheckoutSessionOptions) => {
      if (!isInitialized) {
        return { success: false, error: "Payment system not ready" };
      }

      setIsCreatingSession(true);
      setSessionError(null);

      try {
        const response = await fetch("/api/checkout/create-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

        const data: CreateCheckoutSessionResponse = await response.json();

        openCheckout(data.checkoutUrl);

        setIsCreatingSession(false);
        return {
          success: true,
          checkoutUrl: data.checkoutUrl,
          sessionId: data.sessionId,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to create session";
        setSessionError(errorMessage);
        setIsCreatingSession(false);
        return { success: false, error: errorMessage };
      }
    },
    [isInitialized, openCheckout]
  );

  return {
    isInitialized,
    isCheckoutOpen,
    isCreatingSession,
    sessionError,
    openCheckout,
    closeCheckout,
    checkIsOpen,
    createCheckoutSession,
  };
};
