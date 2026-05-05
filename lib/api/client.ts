import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { getCookie } from "cookies-next";
import { getBaseUrl } from "./config";
import { ApiError, ErrorResponse, RequestConfig } from "./types";
import { isApiResponse } from "./utils";
import { interceptorManager } from "./interceptors";
import { authService } from "@/lib/services/auth.service";

const DEFAULT_TIMEOUT = 30000;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: getBaseUrl(),
  timeout: DEFAULT_TIMEOUT,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const requestConfig: RequestConfig = {
      headers: config.headers as Record<string, string>,
      method: config.method,
      timeout: config.timeout,
      signal: config.signal as AbortSignal | undefined,
    };

    const processedConfig =
      await interceptorManager.applyRequestInterceptors(requestConfig);

    if (processedConfig.headers) {
      Object.assign(config.headers, processedConfig.headers);
    }

    return config;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

const PUBLIC_ROUTES = [
  "/",
  "/login",
  "/logins",
  "/pricing",
  "/about",
  "/contact",
  "/guide",
  "/privacy",
  "/terms",
  "/feedback",
];

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}

function redirectToLogin(): void {
  if (typeof window === "undefined") return;

  if (isPublicRoute(window.location.pathname)) {
    authService.clearAuthCookies();
    return;
  }

  authService.clearAuthCookies();

  const loginUrl = new URL("/login", window.location.origin);
  loginUrl.searchParams.set(
    "redirect",
    window.location.pathname + window.location.search,
  );
  window.location.href = loginUrl.toString();
}

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    let data = response.data;

    if (isApiResponse(data)) {
      data = data.data;
    }

    const processedData = await interceptorManager.applyResponseInterceptors(
      response,
      data,
    );
    response.data = processedData;

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response) {
      const response = error.response;
      const data = response.data as ErrorResponse;

      const message =
        data?.message || `Request failed with status ${response.status}`;

      const apiError = new ApiError(message, response.status, data);
      const processedError =
        await interceptorManager.applyErrorInterceptors(apiError);

      if (
        processedError.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        if (typeof window !== "undefined") {
          originalRequest._retry = true;

          const refreshToken = getCookie("tekcify_refresh_token");
          if (!refreshToken) {
            if (isPublicRoute(window.location.pathname)) {
              authService.clearAuthCookies();
              return Promise.reject(processedError);
            }
            authService.clearAuthCookies();
            const loginUrl = new URL("/login", window.location.origin);
            loginUrl.searchParams.set(
              "redirect",
              window.location.pathname + window.location.search,
            );
            window.location.href = loginUrl.toString();
            return new Promise(() => {});
          }

          const retryRequest = () => {
            if (originalRequest.headers) {
              delete originalRequest.headers["Authorization"];
            }
            return axiosInstance.request(originalRequest);
          };

          if (isRefreshing && refreshPromise) {
            return refreshPromise.then((success) => {
              if (success) {
                return retryRequest();
              }
              redirectToLogin();
              throw processedError;
            });
          }

          isRefreshing = true;
          refreshPromise = authService.refreshToken().then(
            (result) => {
              isRefreshing = false;
              refreshPromise = null;
              return !!result;
            },
            () => {
              isRefreshing = false;
              refreshPromise = null;
              return false;
            },
          );

          return refreshPromise.then((success) => {
            if (success) {
              return retryRequest();
            }
            redirectToLogin();
            throw processedError;
          });
        }
      }

      throw processedError;
    }

    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      throw new ApiError("Request timeout", 408);
    }

    throw new ApiError(error.message || "Network error", 0);
  },
);

async function request<T>(
  endpoint: string,
  config: RequestConfig = {},
): Promise<T> {
  const headers = config.headers || {};

  const axiosConfig: AxiosRequestConfig = {
    url: endpoint,
    method: config.method || "GET",
    headers,
    params: config.params,
    timeout: config.timeout,
    signal: config.signal,
    _retry: config._retry,
  };

  if (config.body) {
    if (
      config.body instanceof FormData ||
      config.body instanceof URLSearchParams
    ) {
      axiosConfig.data = config.body;
    } else {
      if (!headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
      }
      if (typeof config.body === "string") {
        try {
          axiosConfig.data = JSON.parse(config.body);
        } catch {
          axiosConfig.data = config.body;
        }
      } else {
        axiosConfig.data = config.body;
      }
    }
  } else if (axiosConfig.method !== "GET" && axiosConfig.method !== "DELETE") {
    if (!headers["Content-Type"]) {
      headers["Content-Type"] = "application/json";
    }
  }

  const response = await axiosInstance.request<T>(axiosConfig);
  return response.data;
}

export const apiClient = {
  get: <T>(endpoint: string, options: RequestConfig = {}) =>
    request<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body?: unknown, options: RequestConfig = {}) =>
    request<T>(endpoint, {
      ...options,
      method: "POST",
      body,
    }),

  put: <T>(endpoint: string, body?: unknown, options: RequestConfig = {}) =>
    request<T>(endpoint, {
      ...options,
      method: "PUT",
      body,
    }),

  patch: <T>(endpoint: string, body?: unknown, options: RequestConfig = {}) =>
    request<T>(endpoint, {
      ...options,
      method: "PATCH",
      body,
    }),

  delete: <T>(endpoint: string, options: RequestConfig = {}) =>
    request<T>(endpoint, { ...options, method: "DELETE" }),
};

export type {
  RequestConfig,
  RequestInterceptor,
  ResponseInterceptor,
  ErrorInterceptor,
} from "./types";
export { ApiError } from "./types";
export {
  addRequestInterceptor,
  addResponseInterceptor,
  addErrorInterceptor,
} from "./interceptors";

export function resetTokenRefreshQueue(): void {
  isRefreshing = false;
  refreshPromise = null;
}
