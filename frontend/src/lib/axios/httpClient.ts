/* eslint-disable @typescript-eslint/no-explicit-any */
import { getNewTokensWithRefreshToken } from "@/services/auth.services";
import { ApiResponse } from "@/types/api.types";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { cookies, headers } from "next/headers";
import { isTokenExpiringSoon } from "../tokenUtils";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined in environment variables");
}

async function handleTokenRefresh(accessToken: string, refreshToken: string) {
  const requestHeaders = await headers();

  if (requestHeaders.get("x-token-refreshed") === "1") {
    return;
  }

  if (await isTokenExpiringSoon(accessToken)) {
    try {
      await getNewTokensWithRefreshToken(refreshToken);
    } catch (error: any) {
      console.error("HTTP Client: Token refresh failed", error);
    }
  }
}

const createAxiosInstance = async (): Promise<AxiosInstance> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (accessToken && refreshToken) {
    await handleTokenRefresh(accessToken, refreshToken);
  }

  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },

    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      console.error(`[API ERROR]: ${message}`);
      return Promise.reject(error);
    },
  );

  return instance;
};

export interface ApiRequestOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

const request = async <TData>(
  config: InternalAxiosRequestConfig | any,
): Promise<ApiResponse<TData>> => {
  const instance = await createAxiosInstance();
  const response = await instance.request<ApiResponse<TData>>(config);
  return response.data;
};

export const httpClient = {
  get: <TData>(endpoint: string, options?: ApiRequestOptions) =>
    request<TData>({ method: "GET", url: endpoint, ...options }),

  post: <TData>(
    endpoint: string,
    data?: unknown,
    options?: ApiRequestOptions,
  ) => request<TData>({ method: "POST", url: endpoint, data, ...options }),

  put: <TData>(endpoint: string, data?: unknown, options?: ApiRequestOptions) =>
    request<TData>({ method: "PUT", url: endpoint, data, ...options }),

  patch: <TData>(
    endpoint: string,
    data?: unknown,
    options?: ApiRequestOptions,
  ) => request<TData>({ method: "PATCH", url: endpoint, data, ...options }),

  delete: <TData>(endpoint: string, options?: ApiRequestOptions) =>
    request<TData>({ method: "DELETE", url: endpoint, ...options }),
};
