import type { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, type UserRole } from "../lib/authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
        },
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
        },
        {
          title: "My Profile",
          href: "/profile/me",
          icon: "User",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings",
        },
      ],
    },
  ];
};

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        href: "/admin/dashboard/users",
        icon: "Users",
      },
      {
        title: "Students",
        href: "/admin/dashboard/students",
        icon: "GraduationCap",
      },
      {
        title: "Admins",
        href: "/admin/dashboard/admins",
        icon: "ShieldCheck",
      },
    ],
  },
  {
    title: "Submission Management",
    items: [
      {
        title: "All Submissions",
        href: "/admin/dashboard/submissions",
        icon: "FileText",
      },
    ],
  },
  {
    title: "Review Management",
    items: [
      {
        title: "All Reviews",
        href: "/admin/dashboard/reviews",
        icon: "MessageSquare",
      },
      {
        title: "My Reviews",
        href: "/admin/dashboard/my-reviews",
        icon: "ClipboardCheck",
      },
    ],
  },
];

export const studentNavItems: NavSection[] = [
  {
    title: "Submissions",
    items: [
      {
        title: "My Submissions",
        href: "/dashboard/my-submissions",
        icon: "FileText",
      },
    ],
  },
  {
    title: "Feedback & Reviews",
    items: [
      {
        title: "My Reviews",
        href: "/dashboard/my-reviews",
        icon: "MessageSquare",
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];

    case "STUDENT":
      return [...commonNavItems, ...studentNavItems];

    default:
      return commonNavItems;
  }
};
