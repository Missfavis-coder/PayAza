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
      return await authService.getMe();
    // Extract the data property from the response
    },
  
    enabled: typeof window !== "undefined",
  
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
       "Login failed. Please check your credentials.";
      
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
        if (typeof window === "undefined") return;
      
        localStorage.removeItem("nfc_access_token");
        localStorage.removeItem("nfc_refresh_token");
        sessionStorage.removeItem("nfc_access_token");
    
      
    },
    onSuccess: () => {
      toast.success("Logged out successfully");
      router.push("/auth/login");
    },
    onError: (error: any) => {
      console.error("Logout error:", error);
      queryClient.clear();
      router.push("/auth/login");
      toast.error("Logged out, but there was an issue on the server");
    },
  });

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
    
    user: meQuery.data ?? null,
    isAuthenticated: !!meQuery.data,
    isLoading: meQuery.isLoading,
    isError: meQuery.isError,
    error: meQuery.error,
    
    // User actions
    refetchUser: meQuery.refetch,
    

    // Logout
logout: logoutMutation.mutate,
logoutAsync: logoutMutation.mutateAsync,
isLoggingOut: logoutMutation.isPending,

    // Login
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    
    // Register
    register: registerMutation.mutate,
    registerAsync: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    
    
    // Token refresh
    refreshToken: refreshTokenMutation.mutate,
    refreshTokenAsync: refreshTokenMutation.mutateAsync,
    isRefreshing: refreshTokenMutation.isPending,
  };
}