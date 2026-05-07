"use client";

import { useQuery } from "@tanstack/react-query";
import { analyticsService } from "@/lib/services/analytics.service";
import { queryKeys } from "@/lib/query/query-keys";
import type { AdminUsersParams } from "@/lib/types/api";

export const useUserAnalytics = () => {
  return useQuery({
    queryKey: queryKeys.analytics.me(),
    queryFn: () => analyticsService.getMine(),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useAdminAnalytics = () => {
  return useQuery({
    queryKey: queryKeys.analytics.admin(),
    queryFn: () => analyticsService.getAdmin(),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useAdminUsers = (params?: AdminUsersParams) => {
  return useQuery({
    queryKey: queryKeys.analytics.adminUsers(params),
    queryFn: () => analyticsService.getAdminUsers(params),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};

export const useAdminUser = (userId: string | undefined) => {
  return useQuery({
    queryKey: queryKeys.analytics.adminUser(userId ?? ""),
    queryFn: () => analyticsService.getAdminUser(userId as string),
    enabled: Boolean(userId),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};
