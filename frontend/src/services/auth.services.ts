"use server";

import { cookies } from "next/headers";
import { setTokenInCookies } from "@/lib/tokenUtils";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_API_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

type ChangePasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

type ApiResult = {
  success?: boolean;
  message?: string;
  data?: unknown;
  [key: string]: unknown;
};

export async function getNewTokensWithRefreshToken(
  refreshToken: string,
): Promise<boolean> {
  try {
    if (!refreshToken) {
      return false;
    }

    const res = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to refresh tokens:", res.status);
      return false;
    }

    const result = await res.json();
    const { accessToken, refreshToken: newRefreshToken } = result.data ?? {};

    if (!accessToken) {
      console.error("Refresh response did not contain an access token");
      return false;
    }

    await setTokenInCookies("accessToken", accessToken);

    if (newRefreshToken) {
      await setTokenInCookies("refreshToken", newRefreshToken);
    }

    return true;
  } catch (error: unknown) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export async function getUserInfo() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }

    const res = await fetch(`${BASE_API_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: `accessToken=${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch user info:", res.status, res.statusText);
      return null;
    }

    const result = await res.json();

    return result.data ?? null;
  } catch (error: unknown) {
    console.error("Error fetching user info:", error);
    return null;
  }
}

export async function changePasswordService(
  payload: ChangePasswordPayload,
): Promise<ApiResult> {
  try {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!accessToken) {
      return {
        success: false,
        message: "Unauthorized: Access token not found.",
      };
    }

    const cookieHeader = [
      `accessToken=${accessToken}`,
      refreshToken ? `refreshToken=${refreshToken}` : null,
    ]
      .filter(Boolean)
      .join("; ");

    const res = await fetch(`${BASE_API_URL}/auth/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result: ApiResult = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to change password",
        error: result,
      };
    }

    return result;
  } catch (error: unknown) {
    console.error("Error in changePasswordService:", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Internal server error during password change.",
    };
  }
}
