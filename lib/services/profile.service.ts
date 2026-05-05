import { apiClient } from "@/lib/api";
import { API_ROUTES } from "@/lib/api/config";
import type { User } from "@/lib/types/user";

export const profileService = {
  async getProfile(): Promise<User> {
    return apiClient.get<User>(API_ROUTES.users.profile);
  },
};
