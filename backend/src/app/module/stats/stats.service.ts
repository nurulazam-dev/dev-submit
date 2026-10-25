import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import type { TAuthPayload } from "../../interfaces/requestUser.interface";
import type {
  IDashboardStatsDataPayload,
  IStatusDistribution,
  IMonthlyStats,
} from "./stats.interface";
import { db } from "../../../../prisma/db";

const countRecords = async (collection: any): Promise<number> => {
  const result = await collection.aggregate((agg: any) => ({
    total: agg.count(),
  }));

  return result.total;
};

const getDashboardStatsData = async (
  user: TAuthPayload,
): Promise<IDashboardStatsDataPayload> => {
  switch (user.role) {
    case "ADMIN":
      return getAdminStatsData();

    case "STUDENT":
      return getStudentStatsData(user);

    default:
      throw new AppError(status.BAD_REQUEST, "Invalid user role");
  }
};

// ========================================
// ADMIN DASHBOARD STATISTICS
// ========================================

const getAdminStatsData = async (): Promise<IDashboardStatsDataPayload> => {
  const [
    userCount,
    adminCount,
    studentCount,
    submissionCount,
    pendingSubmissions,
    approvedSubmissions,
    rejectedSubmissions,
    reviewCount,
    requestStatusDistribution,
    monthlyRequests,
  ] = await Promise.all([
    countRecords(db.orm.public.User),

    countRecords(db.orm.public.User.where({ role: "ADMIN" })),

    countRecords(db.orm.public.User.where({ role: "STUDENT" })),

    countRecords(db.orm.public.Submission),

    countRecords(
      db.orm.public.Submission.where({
        status: "PENDING",
      }),
    ),

    countRecords(
      db.orm.public.Submission.where({
        status: "APPROVED",
      }),
    ),

    countRecords(
      db.orm.public.Submission.where({
        status: "REJECTED",
      }),
    ),

    countRecords(db.orm.public.Review),

    getRequestStatusDistribution(),

    getMonthlyRequestData(),
  ]);

  return {
    userCount,
    adminCount,
    studentCount,
    submissionCount,
    pendingSubmissions,
    approvedSubmissions,
    rejectedSubmissions,
    reviewCount,
    requestStatusDistribution,
    monthlyRequests,
  };
};

// ========================================
// STUDENT DASHBOARD STATISTICS
// ========================================

const getStudentStatsData = async (
  user: TAuthPayload,
): Promise<IDashboardStatsDataPayload> => {
  const studentId = user.userId;

  const [
    totalSubmissions,
    myPendingSubmissions,
    myApprovedSubmissions,
    myRejectedSubmissions,
  ] = await Promise.all([
    countRecords(db.orm.public.Submission.where({ studentId })),

    countRecords(
      db.orm.public.Submission.where({
        studentId,
        status: "PENDING",
      }),
    ),

    countRecords(
      db.orm.public.Submission.where({
        studentId,
        status: "APPROVED",
      }),
    ),

    countRecords(
      db.orm.public.Submission.where({
        studentId,
        status: "REJECTED",
      }),
    ),
  ]);

  return {
    totalSubmissions,
    myPendingSubmissions,
    myApprovedSubmissions,
    myRejectedSubmissions,
  };
};

// ========================================
// SUBMISSION STATUS DISTRIBUTION
// ========================================

const getRequestStatusDistribution = async (): Promise<
  IStatusDistribution[]
> => {
  const [pending, approved, rejected] = await Promise.all([
    countRecords(
      db.orm.public.Submission.where({
        status: "PENDING",
      }),
    ),

    countRecords(
      db.orm.public.Submission.where({
        status: "APPROVED",
      }),
    ),

    countRecords(
      db.orm.public.Submission.where({
        status: "REJECTED",
      }),
    ),
  ]);

  return [
    { status: "PENDING", count: pending },
    { status: "APPROVED", count: approved },
    { status: "REJECTED", count: rejected },
  ];
};

// ========================================
// MONTHLY SUBMISSION STATISTICS
// ========================================

const getMonthlyRequestData = async (): Promise<IMonthlyStats[]> => {
  const submissions = await db.orm.public.Submission.all();

  const monthlyCounts = new Map<string, number>();

  for (const submission of submissions) {
    const createdAt = new Date(submission.createdAt.toString());

    if (Number.isNaN(createdAt.getTime())) {
      continue;
    }

    const month = createdAt.toISOString().slice(0, 7);

    monthlyCounts.set(month, (monthlyCounts.get(month) ?? 0) + 1);
  }

  return Array.from(monthlyCounts, ([month, count]) => ({ month, count })).sort(
    (a, b) => a.month.localeCompare(b.month),
  );
};

export const StatsService = {
  getDashboardStatsData,
};
