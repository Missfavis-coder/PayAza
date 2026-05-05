import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/query-keys";
import { profileService } from "@/lib/services";
import { ApiError } from "@/lib/api/client";

export function useProfile(enabled: boolean = true) {
  return useQuery({
    queryKey: queryKeys.profile.current(),
    queryFn: () => profileService.getProfile(),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 401) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    enabled,
  });
}
