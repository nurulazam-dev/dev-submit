import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { db } from "prisma/db";
import { QueryBuilder } from "../../utils/QueryBuilder";
import {
  IQueryCollection,
  IQueryParams,
} from "../../interfaces/query.interface";
import {
  reviewFilterableFields,
  reviewIncludeConfig,
  reviewSearchableFields,
  reviewSortableFields,
} from "./review.constant";
import { IReviewPayload, ReviewStatus } from "./review.interface";

const createReview = async (payload: IReviewPayload, studentId: string) => {
  try {
    return await db.transaction(async (tx) => {
      const existingProject = await tx.orm.public.Review.first({
        githubUrl: payload.githubUrl,
      });

      if (existingProject) {
        throw new AppError(
          status.CONFLICT,
          "This project has already been submitted!",
        );
      }

      const pendingSubmission = await tx.orm.public.Review.first({
        studentId,
        status: "PENDING",
      });

      if (pendingSubmission) {
        throw new AppError(
          status.CONFLICT,
          "You already have a pending submission. Please wait until it is reviewed.",
        );
      }

      return await tx.orm.public.Review.create({
        feedback: payload.feedback,
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

const getAllReviews = async (query: IQueryParams) => {
  return (
    new QueryBuilder<IReviewPayload>(
      db.orm.public.Review as unknown as IQueryCollection,
      query,
      {
        searchableFields: reviewSearchableFields,
        filterableFields: reviewFilterableFields,
        sortableFields: reviewSortableFields,
        fieldTypes: { createdAt: "date" },
      },
    )
      .search()
      .filter()
      // .include({
      //   reviews: true,
      // })
      .dynamicInclude(reviewIncludeConfig)
      .paginate()
      .sort()
      .fields()
      .execute()
  );
};

const getMyReviews = async (query: IQueryParams, studentId: string) => {
  return (
    new QueryBuilder<IReviewPayload>(
      db.orm.public.Review as unknown as IQueryCollection,
      query,
      {
        searchableFields: reviewSearchableFields,
        filterableFields: reviewFilterableFields,
        sortableFields: reviewSortableFields,
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
      .dynamicInclude(reviewIncludeConfig)
      .paginate()
      .sort()
      .fields()
      .execute()
  );
};

const getReviewById = async (id: string) => {
  const result = await db.orm.public.Review.first({
    id,
  });

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Review not found!");
  }

  return result;
};

const adminUpdateReviewById = async (id: string, payload: IReviewPayload) => {
  const data: Record<string, unknown> = {};

  if (payload.status !== undefined)
    data.status = payload.status as ReviewStatus;

  const result = await db.orm.public.Review.where({ id }).update(data);

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Review not found!");
  }

  return result;
};

export const ReviewService = {
  getAllReviews,
  getMyReviews,
  createReview,
  adminUpdateReviewById,
  getReviewById,
};
