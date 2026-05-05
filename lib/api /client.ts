import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
  } from "axios";
  import { getBaseUrl } from "./config";
  import { ApiError, ErrorResponse, RequestConfig } from "./type";
  import { isApiResponse } from "./utils";
  import { interceptorManager } from "./interceptors";
  //import { authService } from "@/lib/services/auth.service";
  
  const DEFAULT_TIMEOUT = 30000;
  
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: getBaseUrl(),
    timeout: DEFAULT_TIMEOUT
  });
  
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = localStorage.getItem("accessToken");
  
      if (token) {
        config.headers = config.headers ?? {};
        (config.headers as any).Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error),
  );
  
  const PUBLIC_ROUTES = [
    "/",
    "/login",
    "/logins"
  ];
  
  function isPublicRoute(pathname: string): boolean {
    return PUBLIC_ROUTES.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    );
  }
  
  function redirectToLogin(): void {
    if (typeof window === "undefined") return;
  
    if (isPublicRoute(window.location.pathname)) {
      //authService.clearAuthCookies();
      return;
    }
  
   // authService.clearAuthCookies();
  
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
     // const originalRequest = error.config;
  
      if (error.response) {
        const response = error.response;
        const data = response.data as ErrorResponse;
  
        const message =
          data?.message || `Request failed with status ${response.status}`;
  
        const apiError = new ApiError(message, response.status, data);
        const processedError =
          await interceptorManager.applyErrorInterceptors(apiError);
  
        if (
          processedError.status === 401
        ) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
            window.location.href = "/signin";
            return new Promise (() => {});
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
  } from "./type";
  export { ApiError } from "./type";
  export {
    addRequestInterceptor,
    addResponseInterceptor,
    addErrorInterceptor,
  } from "./interceptors";
  