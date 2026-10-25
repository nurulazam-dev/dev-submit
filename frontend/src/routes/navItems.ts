import { NavSection } from "@/types/dashboard.types";
import { getDefaultDashboardRoute, UserRole } from "../lib/authUtils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  /*  const profilePath =
    role === "CUSTOMER"
      ? "/dashboard/profile"
      : `/${role.toLowerCase().replace("_", "-")}/dashboard/profile`; */

  const profilePath = "/profile/me";

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
          href: profilePath,
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
        /*  {
          title: "Account Settings",
          href: "/settings",
          icon: "Settings",
        }, */
      ],
    },
  ];
};

export const providerNavItems: NavSection[] = [
  {
    title: "Service Management",
    items: [
      {
        title: "Service Requests",
        href: "/service-provider/dashboard/my-requests",
        icon: "ClipboardList",
      },
      /* {
        title: "My Services",
        href: "/service-provider/dashboard/my-services",
        icon: "Briefcase",
      }, */
      {
        title: "My Schedules",
        href: "/service-provider/dashboard/my-schedules",
        icon: "Clock",
      },
      /* {
        title: "Earnings",
        href: "/service-provider/dashboard/earnings",
        icon: "Wallet",
      }, */
      {
        title: "Reviews",
        href: "/service-provider/dashboard/my-reviews",
        icon: "Star",
      },
      {
        title: "Applied Jobs",
        href: "/service-provider/dashboard/my-applied-jobs",
        icon: "Activity",
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "User Management",
    items: [
      {
        title: "All Users",
        href: "/admin/dashboard/users-management",
        icon: "Users",
      },
      /* {
        title: "System Admins",
        href: "/admin/dashboard/admins-management",
        icon: "ShieldCheck",
      }, */
      /* {
        title: "Managers",
        href: "/admin/dashboard/managers-management",
        icon: "UserCog",
      }, */
      /* {
        title: "Service Providers",
        href: "/admin/dashboard/service-providers-management",
        icon: "HardHat",
      }, */
      /* {
        title: "Job Candidates",
        href: "/admin/dashboard/job-candidates-management",
        icon: "UserSearch",
      }, */
      /* {
        title: "Customers",
        href: "/admin/dashboard/customers-management",
        icon: "Contact2",
      }, */
    ],
  },
  {
    title: "Platform Operations",
    items: [
      {
        title: "Services Categories",
        href: "/admin/dashboard/services-management",
        icon: "Layers",
      },
      /* {
        title: "Provider Schedules",
        href: "/admin/dashboard/service-provider-schedules",
        icon: "CalendarRange",
      }, */
      {
        title: "Service Requests",
        href: "/admin/dashboard/service-requests-management",
        icon: "BellRing",
      },
    ],
  },
  {
    title: "Careers Recruitment",
    items: [
      {
        title: "Job Posts",
        href: "/admin/dashboard/job-posts-management",
        icon: "FilePlus",
      },
      {
        title: "Job Applications",
        href: "/admin/dashboard/job-applications-management",
        icon: "FileUser",
      },
    ],
  },
  {
    title: "Financials & Feedback",
    items: [
      {
        title: "Payments",
        href: "/admin/dashboard/payments-management",
        icon: "CreditCard",
      },
      {
        title: "Reviews Control",
        href: "/admin/dashboard/reviews-management",
        icon: "MessageSquareText",
      },
    ],
  },
];

export const managerNavItems: NavSection[] = [
  {
    title: "Human Resources",
    items: [
      /*  {
        title: "Admins",
        href: "/manager/dashboard/admins",
        icon: "ShieldCheck",
      }, */
      {
        title: "Providers",
        href: "/manager/dashboard/service-providers",
        icon: "HardHat",
      },
      {
        title: "Customers",
        href: "/manager/dashboard/customers",
        icon: "Users",
      },
    ],
  },
  {
    title: "System Operations",
    items: [
      {
        title: "Service Requests",
        href: "/manager/dashboard/service-requests",
        icon: "ClipboardList",
      },
      {
        title: "Providers Schedules",
        href: "/manager/dashboard/providers-schedules",
        icon: "LayoutGrid",
      },
      /* {
        title: "Categories",
        href: "/manager/dashboard/categories",
        icon: "LayoutGrid",
      }, */
      /* {
        title: "Verifications",
        href: "/manager/dashboard/verifications",
        icon: "BadgeCheck",
      }, */
      /*  {
        title: "Transactions",
        href: "/manager/dashboard/transactions",
        icon: "Receipt",
      }, */
      /* {
        title: "Analytics",
        href: "/manager/dashboard/reports",
        icon: "BarChart3",
      }, */
    ],
  },
  {
    title: "Financials & Feedback",
    items: [
      {
        title: "Payments",
        href: "/manager/dashboard/payments-management",
        icon: "CreditCard",
      },
    ],
  },
];

export const candidateNavItems: NavSection[] = [
  {
    title: "Job Portal",
    items: [
      {
        title: "Applied Jobs",
        href: "/candidate/dashboard/applied-jobs",
        icon: "Briefcase",
      },
      /*  {
        title: "Job Offers",
        href: "/candidate/dashboard/offers",
        icon: "MailOpen",
      }, */
      /* {
        title: "Resume Builder",
        href: "/candidate/dashboard/resume",
        icon: "FileUser",
      }, */
    ],
  },
];

export const customerNavItems: NavSection[] = [
  {
    title: "Orders & Activity",
    items: [
      {
        title: "My Bookings",
        href: "/dashboard/my-bookings",
        icon: "CalendarCheck",
      },
      /* {
        title: "Track Service",
        href: "/dashboard/track-service",
        icon: "MapPin",
      }, */
    ],
  },
  /* {
    title: "Billing & Feedback",
    items: [
      {
        title: "Payment History",
        href: "/dashboard/payments",
        icon: "History",
      },
      { title: "My Reviews", href: "/dashboard/my-reviews", icon: "StarHalf" },
    ],
  }, */
  {
    title: "Job Portal",
    items: [
      {
        title: "Applied Jobs",
        href: "/dashboard/applied-jobs",
        icon: "Briefcase",
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];

    case "MANAGER":
      return [...commonNavItems, ...managerNavItems];

    case "SERVICE_PROVIDER":
      return [...commonNavItems, ...providerNavItems];

    case "JOB_CANDIDATE":
      return [...commonNavItems, ...candidateNavItems];

    case "CUSTOMER":
      return [...commonNavItems, ...customerNavItems];

    default:
      return commonNavItems;
  }
};
