import { apiClient } from "@/lib/api";
import { API_ROUTES } from "@/lib/api/config";
import type { HealthResponse } from "@/lib/types/api";

export const healthService = {
  async check(): Promise<HealthResponse> {
    return apiClient.get<HealthResponse>(API_ROUTES.health);
  },
};
