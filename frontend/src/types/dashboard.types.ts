import { IServiceRequestPayload } from "./serviceRequest.type";

export interface NavItem {
  title: string;
  href: string;
  icon: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface PieChartData {
  status: string;
  count: number;
}

export interface BarChartData {
  month: Date | string;
  count: number;
}

/* export interface IDashboardStatsDataPayload {
  requestCount: number;
  providerCount: number;
  serviceCount: number;
  pendingApplications: number;
  userCount: number;
  totalRevenue: number;
  barChartData: BarChartData[];
  pieChartData: PieChartData[];
} */

export interface IDashboardStatsDataPayload {
  userCount?: number;
  providerCount?: number;
  requestCount?: number;
  serviceCount?: number;
  pendingApplications?: number;
  totalRevenue?: number | { _sum: { amount: number | null } };

  totalAssignedRequests?: number;
  completedRequests?: number;
  reviewCount?: number;
  averageRating?: number;

  totalJobApplied?: number;
  acceptedApplications?: number;
  rejectedApplications?: number;

  serviceRequest?: IServiceRequestPayload[];
  totalRequests?: number;
  activeRequests?: number;
  totalSpent?: number;

  requestStatusDistribution?: { status: string; count: number }[];
  monthlyRequests?: { month: string; count: number }[];
}
