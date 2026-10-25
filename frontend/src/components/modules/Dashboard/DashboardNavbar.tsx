import { getDefaultDashboardRoute } from "@/lib/authUtils";
import { getNavItemsByRole } from "@/routes/navItems";
import { getUserInfo } from "@/services/auth.services";
import { NavSection } from "@/types/dashboard.types";
import DashboardNavbarContent from "./DashboardNavbarContent";

const DashboardNavbar = async () => {
  const userInfo = await getUserInfo();
  if (!userInfo) {
    // No session during build/pre-render.
    return null;
  }

  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);

  const dashboardHome = getDefaultDashboardRoute(userInfo.role);
  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
