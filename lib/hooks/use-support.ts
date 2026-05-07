"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { supportService } from "@/lib/services/support.service";
import type {
  ReportFraudPayload,
  SupportContactPayload,
} from "@/lib/types/api";

function readableError(error: any, fallback: string) {
  return (
    error?.response?.data?.message ||
    error?.data?.message ||
    error?.message ||
    fallback
  );
}

export const useContactSupport = () =>
  useMutation({
    mutationFn: (payload: SupportContactPayload) =>
      supportService.contact(payload),
    onError: (error: any) => {
      toast.error(readableError(error, "Failed to send message"));
    },
  });

export const useReportFraud = () =>
  useMutation({
    mutationFn: (payload: ReportFraudPayload) =>
      supportService.reportFraud(payload),
    onError: (error: any) => {
      toast.error(readableError(error, "Failed to submit fraud report"));
    },
  });
