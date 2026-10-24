import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { db } from "prisma/db";
import { QueryBuilder } from "../../utils/QueryBuilder";
import {
  IQueryCollection,
  IQueryParams,
} from "../../interfaces/query.interface";
import {
  submissionFilterableFields,
  submissionIncludeConfig,
  submissionSearchableFields,
  submissionSortableFields,
} from "./submission.constant";
import {
  IAdminUpdateSubmissionPayload,
  ISubmissionPayload,
  SubmissionStatus,
} from "./submission.interface";

const createSubmission = async (
  payload: ISubmissionPayload,
  studentId: string,
) => {
  try {
    return await db.transaction(async (tx) => {
      const existingProject = await tx.orm.public.Submission.first({
        githubUrl: payload.githubUrl,
      });

      if (existingProject) {
        throw new AppError(
          status.CONFLICT,
          "This project has already been submitted!",
        );
      }

      const pendingSubmission = await tx.orm.public.Submission.first({
        studentId,
        status: "PENDING",
      });

      if (pendingSubmission) {
        throw new AppError(
          status.CONFLICT,
          "You already have a pending submission. Please wait until it is reviewed.",
        );
      }

      return await tx.orm.public.Submission.create({
        title: payload.title,
        description: payload.description,
        githubUrl: payload.githubUrl,
        liveUrl: payload.liveUrl,
        studentId,
        status: "PENDING",
      });
    });
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "sqlState" in error &&
      error.sqlState === "23505"
    ) {
      throw new AppError(
        status.CONFLICT,
        "This project already exists or you already have a pending submission.",
      );
    }

    throw error;
  }
};

const getAllSubmissions = async (query: IQueryParams) => {
  return (
    new QueryBuilder<ISubmissionPayload>(
      db.orm.public.Submission as unknown as IQueryCollection,
      query,
      {
        searchableFields: submissionSearchableFields,
        filterableFields: submissionFilterableFields,
        sortableFields: submissionSortableFields,
        fieldTypes: { createdAt: "date" },
      },
    )
      .search()
      .filter()
      // .include({
      //   reviews: true,
      // })
      .dynamicInclude(submissionIncludeConfig)
      .paginate()
      .sort()
      .fields()
      .execute()
  );
};

const getMySubmissions = async (query: IQueryParams, studentId: string) => {
  return (
    new QueryBuilder<ISubmissionPayload>(
      db.orm.public.Submission as unknown as IQueryCollection,
      query,
      {
        searchableFields: submissionSearchableFields,
        filterableFields: submissionFilterableFields,
        sortableFields: submissionSortableFields,
        fieldTypes: { createdAt: "date" },
      },
    )
      .search()
      .where({
        studentId,
      })
      .filter()
      // .include({
      //   reviews: true,
      // })
      .dynamicInclude(submissionIncludeConfig)
      .paginate()
      .sort()
      .fields()
      .execute()
  );
};

const getSubmissionById = async (id: string) => {
  const result = await db.orm.public.Submission.first({
    id,
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Submission not found!");
  }

  return result;
};

const adminUpdateSubmissionById = async (
  id: string,
  payload: IAdminUpdateSubmissionPayload,
) => {
  const data: Record<string, unknown> = {};

  if (payload.status !== undefined)
    data.status = payload.status as SubmissionStatus;

  const result = await db.orm.public.Submission.where({ id }).update(data);

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Submission not found!");
  }

  return result;
};

export const SubmissionService = {
  getAllSubmissions,
  getMySubmissions,
  createSubmission,
  adminUpdateSubmissionById,
  getSubmissionById,
};
