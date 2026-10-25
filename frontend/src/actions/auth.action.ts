"use server";

import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  type UserRole,
} from "@/lib/authUtils";
import { httpClient } from "@/lib/axios/httpClient";
import { setTokenInCookies } from "@/lib/tokenUtils";
import type { ApiErrorResponse } from "@/types/api.types";
import type { ILoginResponse } from "@/types/auth.types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  loginZodSchema,
  registerStudentZodSchema,
} from "@/zod/auth.validation";

type ActionResult = ILoginResponse | ApiErrorResponse;

type AuthUser = {
  userId: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole;
  status: "ACTIVE" | "BLOCKED";
};

type AuthResponse = {
  success?: boolean;
  message?: string;
  data?: {
    accessToken: string;
    refreshToken?: string;
    user?: AuthUser;
  };
  accessToken?: string;
  refreshToken?: string;
  user?: AuthUser;
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterStudentPayload = {
  name: string;
  email: string;
  password: string;
  phone: string;
};

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "object" && error !== null && "response" in error) {
    const response = error.response;

    if (
      typeof response === "object" &&
      response !== null &&
      "data" in response
    ) {
      const data = response.data;

      if (
        typeof data === "object" &&
        data !== null &&
        "message" in data &&
        typeof data.message === "string"
      ) {
        return data.message;
      }
    }
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  return fallback;
};

const isRedirectError = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "digest" in error &&
  typeof error.digest === "string" &&
  error.digest.startsWith("NEXT_REDIRECT");

const getAuthData = (response: AuthResponse) => response.data ?? response;

const saveAuthTokens = async (
  accessToken: string,
  refreshToken?: string,
): Promise<void> => {
  await setTokenInCookies("accessToken", accessToken);

  if (refreshToken) {
    await setTokenInCookies("refreshToken", refreshToken);
  }
};

const getRedirectUrl = (role: UserRole, redirectPath?: string): string =>
  redirectPath && isValidRedirectForRole(redirectPath, role)
    ? redirectPath
    : getDefaultDashboardRoute(role);

export const loginAction = async (
  payload: LoginPayload,
  redirectPath?: string,
): Promise<ActionResult> => {
  const parsedPayload = loginZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message ?? "Invalid input",
    } as ApiErrorResponse;
  }

  try {
    const response = await httpClient.post<AuthResponse>(
      "/auth/login",
      parsedPayload.data,
    );

    const authData = getAuthData(response.data);
    const { accessToken, refreshToken, user } = authData;

    if (!accessToken || !user) {
      return {
        success: false,
        message: "Invalid login response from server",
      } as ApiErrorResponse;
    }

    if (user.status !== "ACTIVE") {
      return {
        success: false,
        message:
          "Your account is not active. Please contact the administrator.",
      } as ApiErrorResponse;
    }

    await saveAuthTokens(accessToken, refreshToken);

    redirect(getRedirectUrl(user.role, redirectPath));
  } catch (error: unknown) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: getErrorMessage(error, "Login failed"),
    } as ApiErrorResponse;
  }
};

export const registerStudentAction = async (
  payload: RegisterStudentPayload,
): Promise<ActionResult> => {
  const parsedPayload = registerStudentZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message:
        parsedPayload.error.issues[0]?.message ?? "Invalid registration data",
    } as ApiErrorResponse;
  }

  try {
    await httpClient.post("/auth/register", parsedPayload.data);

    return {
      success: true,
      message: "Registration successful. Please log in.",
    } as ILoginResponse;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Registration failed"),
    } as ApiErrorResponse;
  }
};

export const getCurrentUserAction = async (): Promise<AuthUser | null> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    const response = await httpClient.get<AuthResponse>("/auth/me", {
      headers: {
        Cookie: `accessToken=${accessToken}`,
      },
    });

    const data = getAuthData(response.data);

    return data.user ?? (data as unknown as AuthUser);
  } catch {
    return null;
  }
};

export const refreshTokenAction = async (): Promise<boolean> => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return false;
    }

    const response = await httpClient.post<AuthResponse>(
      "/auth/refresh-token",
      {},
      {
        headers: {
          Cookie: `refreshToken=${refreshToken}`,
        },
      },
    );

    const data = getAuthData(response.data);

    if (!data.accessToken) {
      return false;
    }

    await saveAuthTokens(data.accessToken, data.refreshToken);

    return true;
  } catch {
    return false;
  }
};

export const changePasswordAction = async (payload: {
  currentPassword: string;
  newPassword: string;
}): Promise<ActionResult> => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Please log in to change your password",
      } as ApiErrorResponse;
    }

    const cookieHeader = [
      `accessToken=${accessToken}`,
      refreshToken ? `refreshToken=${refreshToken}` : "",
    ]
      .filter(Boolean)
      .join("; ");

    const response = await httpClient.post("/auth/change-password", payload, {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return {
      success: true,
      message: response.message ?? "Password changed successfully",
    } as ILoginResponse;
  } catch (error: unknown) {
    return {
      success: false,
      message: getErrorMessage(error, "Password change failed"),
    } as ApiErrorResponse;
  }
};

export const logoutUserAction = async (): Promise<void> => {
  try {
    await httpClient.post("/auth/logout");
  } catch {
    // Clear local authentication cookies even if the API request fails.
  } finally {
    const cookieStore = await cookies();

    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
  }

  redirect("/login");
};
