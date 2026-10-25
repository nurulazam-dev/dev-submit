export type TSubmissionStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface NavItem {
  title: string;
  href: string;
  icon: string;
}

export interface NavSection {
  title?: string;
  items: NavItem[];
}

export interface IStatusDistribution {
  status: TSubmissionStatus;
  count: number;
}

export interface IMonthlyStats {
  month: string;
  count: number;
}

export interface IAdminDashboardStats {
  userCount: number;
  adminCount: number;
  studentCount: number;
  submissionCount: number;
  pendingSubmissions: number;
  approvedSubmissions: number;
  rejectedSubmissions: number;
  reviewCount: number;
  requestStatusDistribution: IStatusDistribution[];
  monthlyRequests: IMonthlyStats[];
}

export interface IStudentDashboardStats {
  totalSubmissions: number;
  myPendingSubmissions: number;
  myApprovedSubmissions: number;
  myRejectedSubmissions: number;
}

export type IDashboardStatsDataPayload =
  | IAdminDashboardStats
  | IStudentDashboardStats;
