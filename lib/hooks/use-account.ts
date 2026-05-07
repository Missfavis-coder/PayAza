"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { accountService } from "@/lib/services/account.service";
import { clearAuthTokens } from "@/lib/api/client";
import type { ChangePasswordPayload } from "@/lib/types/api";

function readableError(error: any, fallback: string) {
  return (
    error?.response?.data?.message ||
    error?.data?.message ||
    error?.message ||
    fallback
  );
}

export const useChangePassword = () =>
  useMutation({
    mutationFn: (payload: ChangePasswordPayload) =>
      accountService.changePassword(payload),
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (error: any) => {
      toast.error(readableError(error, "Failed to update password"));
    },
  });

export const useCloseAccount = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (password: string) => accountService.closeAccount(password),
    onSuccess: () => {
      toast.success("Account closed");
      clearAuthTokens();
      queryClient.clear();
      router.replace("/auth/login");
    },
    onError: (error: any) => {
      toast.error(readableError(error, "Failed to close account"));
    },
  });
};
