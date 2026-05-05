import { useQuery } from "@tanstack/react-query";
import { healthService } from "@/lib/services/health.service";
import { queryKeys } from "@/lib/query/query-keys";

export const useHealthCheck = () => {
  return useQuery({
    queryKey: queryKeys.health.check(),
    queryFn: () => healthService.check(),
    staleTime: 5 * 60 * 1000, // Health check rarely changes
    gcTime: 10 * 60 * 1000,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false, // Don't refetch health on focus
  });
};
