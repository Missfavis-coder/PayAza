"use client";

import { useQuery } from "@tanstack/react-query";
import { chartsService } from "@/lib/services/charts.service";
import { queryKeys } from "@/lib/query/query-keys";
import type { ChartPeriod } from "@/lib/types/api";

export const useSpendingChart = (period: ChartPeriod) =>
  useQuery({
    queryKey: queryKeys.charts.spending(period),
    queryFn: () => chartsService.getSpending(period),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

export const useTransfersChart = (period: ChartPeriod) =>
  useQuery({
    queryKey: queryKeys.charts.transfers(period),
    queryFn: () => chartsService.getTransfers(period),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });

export const useTopUpsChart = (period: ChartPeriod) =>
  useQuery({
    queryKey: queryKeys.charts.topups(period),
    queryFn: () => chartsService.getTopUps(period),
    staleTime: 60 * 1000,
    gcTime: 5 * 60 * 1000,
  });
