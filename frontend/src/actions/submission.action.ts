"use server";

import { getActionErrorMessage } from "@/lib/getActionErrorMessage";
import {
  adminUpdateSubmission,
  createSubmission,
  getSubmissionById,
} from "@/services/submission.services";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import {
  IAdminUpdateSubmissionPayload,
  ICreateSubmissionPayload,
  ISubmissionPayload,
} from "@/types/submission.type";
import {
  adminUpdateSubmissionZodSchema,
  createSubmissionZodSchema,
} from "@/zod/submission.validation";

export const createSubmissionAction = async (
  payload: ICreateSubmissionPayload,
): Promise<ApiResponse<ISubmissionPayload> | ApiErrorResponse> => {
  const parsed = createSubmissionZodSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid submission data",
    };
  }

  try {
    const result = await createSubmission(parsed.data);
    return result as ApiResponse<ISubmissionPayload>;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to create submission"),
    };
  }
};

export const adminUpdateSubmissionAction = async (
  id: string,
  payload: IAdminUpdateSubmissionPayload,
): Promise<ApiResponse<ISubmissionPayload> | ApiErrorResponse> => {
  const parsed = adminUpdateSubmissionZodSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid status",
    };
  }

  try {
    const result = await adminUpdateSubmission(id, parsed.data);
    return result as ApiResponse<ISubmissionPayload>;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update submission status"),
    };
  }
};

export const getSubmissionByIdAction = async (
  id: string,
): Promise<ApiResponse<ISubmissionPayload> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Submission ID is required",
    };
  }

  try {
    const result = await getSubmissionById(id);
    return result as ApiResponse<ISubmissionPayload>;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch submission"),
    };
  }
};
