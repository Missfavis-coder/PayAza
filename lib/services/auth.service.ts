import axios from "axios";
import { getBaseUrl } from "@/lib/api/config";
import { clearAuthCookies } from "@/lib/utils/auth-cookies";
import { resetTokenRefreshQueue } from "@/lib/api/client";
import type {
  OAuthCallbackResponse,
  RefreshTokenResponse,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  MeResponse,
  User,
} from "@/lib/types/api";

interface BackendTokenResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authService = {
  clearAuthCookies(): void {
    clearAuthCookies();
  },

  //  OAUTH CALLBACK
  async handleCallback(
    code: string,
    state: string,
    codeVerifier?: string,
    referralCode?: string
  ): Promise<OAuthCallbackResponse> {
    const response = await axiosInstance.post<
      BackendTokenResponse<OAuthCallbackResponse>
    >("/auth/callback", {
      code,
      state,
      codeVerifier,
      referralCode,
    });

    const result = response.data;

    if (!result.success || !result.data) {
      throw new Error(
        result.message || result.error || "Authentication failed"
      );
    }

    return result.data;
  },

  //  LOGIN
  async login(payload: LoginRequest): Promise<User> {
    const response = await axiosInstance.post<
      BackendTokenResponse<AuthResponse>
    >("/auth/login", payload);

    const result = response.data;

    if (!result.success || !result.data) {
      throw new Error(result.message || result.error || "Login failed");
    }

    return result.data.user;
  },

  //  REGISTER
  async register(payload: RegisterRequest): Promise<User> {
    const response = await axiosInstance.post<
      BackendTokenResponse<AuthResponse>
    >("/auth/register", payload);

    const result = response.data;

    if (!result.success || !result.data) {
      throw new Error(result.message || result.error || "Registration failed");
    }

    return result.data.user;
  },

  // ✅ GET CURRENT USER
  async getMe(): Promise<User | null> {
    try {
      const response = await axiosInstance.get<
        BackendTokenResponse<MeResponse>
      >("/auth/me");

      const result = response.data;

      if (!result.success || !result.data) {
        return null;
      }

      return result.data.user;
    } catch {
      return null;
    }
  },

  //  REFRESH TOKEN
  async refreshToken(): Promise<RefreshTokenResponse | null> {
    try {
      const response = await axiosInstance.post<
        BackendTokenResponse<RefreshTokenResponse>
      >("/auth/refresh",
        {}
      );

      const result = response.data;

      if (!result.success || !result.data) {
        clearAuthCookies();
        return null;
      }

      return result.data;
    } catch {
      clearAuthCookies();
      return null;
    }
  },

  //  LOGOUT
  async logout(): Promise<void> {
    try {
      await axiosInstance.post("/auth/logout");
    } finally {
      this.clearAuthCookies();
      resetTokenRefreshQueue();
    }
  },
};