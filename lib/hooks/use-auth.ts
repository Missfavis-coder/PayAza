"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services";
import { queryKeys } from "@/lib/query/query-keys";
import { ApiError } from "@/lib/api/client";
import type { LoginRequest, RegisterRequest } from "@/lib/types/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function useAuth(enabled: boolean = true) {
  const queryClient = useQueryClient();
  const router = useRouter();

  // GET CURRENT USER
  const meQuery = useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => {
      try {
        const user = await authService.getMe();
        return user;
      } catch (error) {
        // If unauthorized, don't throw to prevent error boundaries
        if (error instanceof ApiError && error.status === 401) {
          return null;
        }
        throw error;
      }
    },
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    retry: (failureCount, error) => {
      if (error instanceof ApiError && error.status === 401) return false;
      return failureCount < 2;
    },
  });

  // LOGIN MUTATION
  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const user = await authService.login(credentials);
      return user;
    },
    onSuccess: (user) => {
      toast.success(`Welcome back${user?.name ? `, ${user.name}` : ''}! 👋`);
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
      // Navigate to dashboard
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message = error?.message || "Login failed. Please check your credentials.";
      toast.error(message);
    },
  });

  // REGISTER MUTATION
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const user = await authService.register(data);
      return user;
    },
    onSuccess: (user) => {
      toast.success("Account created successfully!");
      // Optionally auto-login after registration
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const message = error?.message || "Registration failed. Please try again.";
      toast.error(message);
    },
  });

  // LOGOUT MUTATION
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await authService.logout();
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      // Clear all cached queries
      queryClient.clear();
      // Redirect to login page
      router.push("/auth/login");
    },
    onError: (error: any) => {
      console.error("Logout error:", error);
      // Still clear local state and redirect even if API call fails
      queryClient.clear();
      router.push("/auth/login");
      toast.error("Logged out, but there was an issue on the server");
    },
  });

  // REFRESH TOKEN MUTATION (optional - for manual refresh)
  const refreshTokenMutation = useMutation({
    mutationFn: async () => {
      const result = await authService.refreshToken();
      if (!result) {
        throw new Error("Failed to refresh token");
      }
      return result;
    },
    onSuccess: () => {
      // Refetch user data with new token
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() });
    },
    onError: () => {
      // If refresh fails, log the user out
      logoutMutation.mutate();
    },
  });

  return {
    // User data and auth state
    user: meQuery.data ?? null,
    isAuthenticated: !!meQuery.data,
    isLoading: meQuery.isLoading,
    isError: meQuery.isError,
    error: meQuery.error,
    
    // User actions
    refetchUser: meQuery.refetch,
    
    // Login
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    
    // Register
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    
    // Logout
    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isLoggingOut: logoutMutation.isPending,
    
    // Token refresh
    refreshToken: refreshTokenMutation.mutate,
    refreshTokenAsync: refreshTokenMutation.mutateAsync,
    isRefreshing: refreshTokenMutation.isPending,
  };
}