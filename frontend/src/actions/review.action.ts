"use server";

import { getActionErrorMessage } from "@/lib/getActionErrorMessage";
import {
  adminUpdateReviewStatus,
  createReview,
  getReviewById,
} from "@/services/review.services";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import {
  ICreateReviewPayload,
  IReviewPayload,
  IReviewStatusUpdatePayload,
} from "@/types/review.type";
import {
  createReviewZodSchema,
  updateReviewStatusZodSchema,
} from "@/zod/review.validation";

export const createReviewAction = async (
  payload: ICreateReviewPayload,
): Promise<ApiResponse<IReviewPayload> | ApiErrorResponse> => {
  const parsed = createReviewZodSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid review data",
    };
  }

  try {
    const result = await createReview(parsed.data);
    return result as ApiResponse<IReviewPayload>;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to submit review"),
    };
  }
};

export const adminUpdateReviewStatusAction = async (
  id: string,
  payload: IReviewStatusUpdatePayload,
): Promise<ApiResponse<IReviewPayload> | ApiErrorResponse> => {
  const parsed = updateReviewStatusZodSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid status",
    };
  }

  try {
    const result = await adminUpdateReviewStatus(id, parsed.data);
    return result as ApiResponse<IReviewPayload>;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update review status"),
    };
  }
};

export const getReviewByIdAction = async (
  id: string,
): Promise<ApiResponse<IReviewPayload> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Review ID is required",
    };
  }

  try {
    const result = await getReviewById(id);
    return result as ApiResponse<IReviewPayload>;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch review"),
    };
  }
};
