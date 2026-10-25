import { NextRequest, NextResponse } from "next/server";
import { jwtUtils } from "./lib/jwtUtils";
import { isTokenExpiringSoon } from "./lib/tokenUtils";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/authUtils";
import {
  getNewTokensWithRefreshToken,
  getUserInfo,
} from "./services/auth.services";

async function refreshTokenMiddleware(refreshToken: string): Promise<boolean> {
  try {
    const refresh = await getNewTokensWithRefreshToken(refreshToken);
    return !!refresh;
  } catch (error) {
    console.error("Error refreshing token in middleware:", error);
    return false;
  }
}

export async function proxy(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    const publicRoutes = ["/payment/success", "/payment/cancel"];
    if (publicRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.next();
    }

    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    const verifiedToken = accessToken
      ? jwtUtils.verifyToken(
          accessToken,
          process.env.JWT_ACCESS_SECRET as string,
        )
      : null;

    const decodedAccessToken = verifiedToken?.data;
    const isValidAccessToken = verifiedToken?.success;

    let userRole: UserRole | null = null;
    if (decodedAccessToken) {
      userRole = decodedAccessToken.role as UserRole;
    }

    const routerOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoute(pathname);

    if (
      isValidAccessToken &&
      refreshToken &&
      (await isTokenExpiringSoon(accessToken as string))
    ) {
      const requestHeaders = new Headers(request.headers);
      try {
        const refreshed = await refreshTokenMiddleware(refreshToken);
        if (refreshed) {
          requestHeaders.set("x-token-refreshed", "1");
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
      }
    }

    if (isAuth && isValidAccessToken && userRole) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole), request.url),
      );
    }

    if (pathname === "/reset-password") {
      const email = request.nextUrl.searchParams.get("email");
      if (accessToken && email) {
        const userInfo = await getUserInfo();
        if (userInfo?.needPasswordChange) {
          return NextResponse.next();
        } else if (userRole) {
          return NextResponse.redirect(
            new URL(getDefaultDashboardRoute(userRole), request.url),
          );
        }
      }
      if (email) return NextResponse.next();

      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (routerOwner === null) {
      return NextResponse.next();
    }

    if (!accessToken || !isValidAccessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userInfo = await getUserInfo();
    if (userInfo) {
      if (!userInfo.emailVerified) {
        if (pathname !== "/verify-email") {
          const verifyEmailUrl = new URL("/verify-email", request.url);
          verifyEmailUrl.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(verifyEmailUrl);
        }
        return NextResponse.next();
      }

      if (userInfo.emailVerified && pathname === "/verify-email") {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole as UserRole), request.url),
        );
      }

      if (userInfo.needPasswordChange) {
        if (pathname !== "/reset-password") {
          const resetPasswordUrl = new URL("/reset-password", request.url);
          resetPasswordUrl.searchParams.set("email", userInfo.email);
          return NextResponse.redirect(resetPasswordUrl);
        }
        return NextResponse.next();
      }
    }

    if (routerOwner === "COMMON") {
      return NextResponse.next();
    }

    const serviceHubRoles: UserRole[] = [
      "ADMIN",
      "MANAGER",
      "SERVICE_PROVIDER",
      "CUSTOMER",
      "JOB_CANDIDATE",
    ];

    if (serviceHubRoles.includes(routerOwner as UserRole)) {
      const canAccess =
        routerOwner === userRole ||
        (userRole === "ADMIN" && routerOwner === "MANAGER");

      if (!canAccess && userRole) {
        return NextResponse.redirect(
          new URL(getDefaultDashboardRoute(userRole), request.url),
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Error in proxy middleware:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
