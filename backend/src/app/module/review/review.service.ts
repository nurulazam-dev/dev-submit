import status from "http-status";
import AppError from "../../errorHelpers/AppError";
import { db } from "../../../../prisma/db";
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
import { IReviewPayload, IReviewStatusUpdatePayload } from "./review.interface";

const createReview = async (payload: IReviewPayload, reviewerId: string) => {
  const reviewer = await db.orm.public.User.first({
    id: reviewerId,
  });

  if (!reviewer) {
    throw new AppError(status.NOT_FOUND, "Reviewer not found");
  }

  const submission = await db.orm.public.Submission.first({
    id: payload.submissionId,
  });

  if (!submission) {
    throw new AppError(status.NOT_FOUND, "Submission not found");
  }

  const existingReview = await db.orm.public.Review.first({
    submissionId: payload.submissionId,
  });

  if (existingReview) {
    throw new AppError(
      status.CONFLICT,
      "Feedback has already been added for this submission",
    );
  }

  const review = await db.orm.public.Review.create({
    submissionId: payload.submissionId,
    reviewerId,
    feedback: payload.feedback,
    status: payload.status,
  });

  return review;
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
      .dynamicInclude(reviewIncludeConfig, ["submission", "reviewer"])
      .paginate()
      .sort()
      .fields()
      .execute()
  );
};

const getMyReviews = async (query: IQueryParams, reviewerId: string) => {
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
        reviewerId,
      })
      .filter()
      .dynamicInclude(reviewIncludeConfig, ["submission"])
      .paginate()
      .sort()
      .fields()
      .execute()
  );
};

const getReviewById = async (id: string) => {
  const result = await db.orm.public.Review.where({ id })
    .include("submission")
    .include("reviewer")
    .first();

  if (!result) {
    throw new AppError(status.NOT_FOUND, "Review not found!");
  }

  return result;
};

const adminUpdateReviewById = async (
  id: string,
  payload: IReviewStatusUpdatePayload,
) => {
  const existingReview = await db.orm.public.Review.first({
    id,
  });

  if (!existingReview) {
    throw new AppError(status.NOT_FOUND, "Review not found!");
  }

  const result = await db.orm.public.Review.where({ id }).update({
    status: payload.status,
  });

  return result;
};

export const ReviewService = {
  getAllReviews,
  getMyReviews,
  createReview,
  adminUpdateReviewById,
  getReviewById,
};
