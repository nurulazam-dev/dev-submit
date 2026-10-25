import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import { isTokenExpiringSoon } from "./lib/tokenUtils";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  type UserRole,
} from "./lib/authUtils";

const BASE_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;

type RefreshedTokens = {
  accessToken: string;
  refreshToken?: string;
};

function getTokenMaxAge(token: string): number {
  const decoded = jwtUtils.decodedToken(token);

  if (
    !decoded ||
    typeof decoded === "string" ||
    typeof decoded.exp !== "number"
  ) {
    return 60 * 60 * 24;
  }

  return Math.max(0, decoded.exp - Math.floor(Date.now() / 1000));
}

function applyTokenCookies(
  response: NextResponse,
  tokens: RefreshedTokens | null,
): NextResponse {
  if (!tokens) {
    return response;
  }

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/",
  };

  response.cookies.set("accessToken", tokens.accessToken, {
    ...cookieOptions,
    maxAge: getTokenMaxAge(tokens.accessToken),
  });

  if (tokens.refreshToken) {
    response.cookies.set("refreshToken", tokens.refreshToken, {
      ...cookieOptions,
      maxAge: getTokenMaxAge(tokens.refreshToken),
    });
  }

  return response;
}

function nextResponse(tokens: RefreshedTokens | null): NextResponse {
  return applyTokenCookies(NextResponse.next(), tokens);
}

function redirectResponse(
  url: URL,
  tokens: RefreshedTokens | null,
): NextResponse {
  return applyTokenCookies(NextResponse.redirect(url), tokens);
}

async function refreshTokens(
  refreshToken: string,
): Promise<RefreshedTokens | null> {
  if (!BASE_API_URL) {
    console.error("NEXT_PUBLIC_API_BASE_URL is not defined");
    return null;
  }

  try {
    const response = await fetch(`${BASE_API_URL}/auth/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `refreshToken=${refreshToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Token refresh failed:", response.status);
      return null;
    }

    const result = await response.json();
    const accessToken = result?.data?.accessToken;
    const newRefreshToken = result?.data?.refreshToken;

    if (typeof accessToken !== "string" || !accessToken) {
      console.error("Refresh response did not contain an access token");
      return null;
    }

    return {
      accessToken,
      ...(typeof newRefreshToken === "string" && newRefreshToken
        ? { refreshToken: newRefreshToken }
        : {}),
    };
  } catch (error: unknown) {
    console.error("Error refreshing tokens:", error);
    return null;
  }
}

function getVerifiedRole(token: string): UserRole | null {
  if (!JWT_ACCESS_SECRET) {
    console.error("JWT_ACCESS_SECRET is not defined");
    return null;
  }

  const result = jwtUtils.verifyToken(token, JWT_ACCESS_SECRET);

  if (!result.success || typeof result.data === "string") {
    return null;
  }

  const { role, status } = result.data;

  if (
    (role !== "ADMIN" && role !== "STUDENT") ||
    (status !== "ACTIVE" && status !== "BLOCKED")
  ) {
    return null;
  }

  if (status === "BLOCKED") {
    return null;
  }

  return role;
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  let accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  let refreshedTokens: RefreshedTokens | null = null;

  if (accessToken && refreshToken) {
    try {
      if (await isTokenExpiringSoon(accessToken)) {
        refreshedTokens = await refreshTokens(refreshToken);

        if (refreshedTokens) {
          accessToken = refreshedTokens.accessToken;
        }
      }
    } catch (error: unknown) {
      console.error("Token refresh failed in proxy:", error);
    }
  }

  const userRole = accessToken ? getVerifiedRole(accessToken) : null;

  const isAuthenticated = userRole !== null;
  const routeOwner = getRouteOwner(pathname);
  const isAuth = isAuthRoute(pathname);

  if (isAuth && isAuthenticated && userRole) {
    return redirectResponse(
      new URL(getDefaultDashboardRoute(userRole), request.url),
      refreshedTokens,
    );
  }

  if (routeOwner === null) {
    return nextResponse(refreshedTokens);
  }

  if (!accessToken || !isAuthenticated || !userRole) {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirect", `${pathname}${search}`);

    return redirectResponse(loginUrl, refreshedTokens);
  }

  if (routeOwner === "COMMON") {
    return nextResponse(refreshedTokens);
  }

  if (routeOwner !== userRole) {
    return redirectResponse(
      new URL(getDefaultDashboardRoute(userRole), request.url),
      refreshedTokens,
    );
  }

  return nextResponse(refreshedTokens);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
