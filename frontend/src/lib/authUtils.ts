export type UserRole =
  | "ADMIN"
  | "MANAGER"
  | "SERVICE_PROVIDER"
  | "CUSTOMER"
  | "JOB_CANDIDATE";

export const authRoutes = [
  "/login",
  "/register",
  "/register-customer",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

export const isAuthRoute = (pathname: string) => {
  return authRoutes.some((route: string) => route === pathname);
};

export type RouteConfig = {
  exact: string[];
  pattern: RegExp[];
};

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/profile", "/profile/settings", "/change-password"],
  pattern: [],
};

export const adminProtectedRoutes: RouteConfig = {
  pattern: [/^\/admin/],
  exact: [],
};

export const managerProtectedRoutes: RouteConfig = {
  pattern: [/^\/manager/],
  exact: [],
};

export const providerProtectedRoutes: RouteConfig = {
  pattern: [/^\/service-provider/],
  exact: [],
};

export const candidateProtectedRoutes: RouteConfig = {
  pattern: [/^\/candidate/],
  exact: [],
};

export const customerProtectedRoutes: RouteConfig = {
  pattern: [/^\/dashboard/, /^\/payment/],
  exact: ["/payment/success", "/payment/cancel"],
};

export const isRouteMatches = (pathname: string, routes: RouteConfig) => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.pattern.some((pattern: RegExp) => pattern.test(pathname));
};

export const getRouteOwner = (pathname: string): UserRole | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }

  if (isRouteMatches(pathname, managerProtectedRoutes)) {
    return "MANAGER";
  }

  if (isRouteMatches(pathname, providerProtectedRoutes)) {
    return "SERVICE_PROVIDER";
  }

  if (isRouteMatches(pathname, candidateProtectedRoutes)) {
    return "JOB_CANDIDATE";
  }

  if (isRouteMatches(pathname, customerProtectedRoutes)) {
    return "CUSTOMER";
  }

  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }

  return null;
};

export const getDefaultDashboardRoute = (role: UserRole) => {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "MANAGER":
      return "/manager/dashboard";
    case "SERVICE_PROVIDER":
      return "/service-provider/dashboard";
    case "JOB_CANDIDATE":
      return "/candidate/dashboard";
    case "CUSTOMER":
      return "/dashboard";
    default:
      return "/";
  }
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole,
) => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  if (role === "ADMIN" && routeOwner === "MANAGER") {
    return true;
  }

  return false;
};
