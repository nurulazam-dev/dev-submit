"use server";

import { getActionErrorMessage } from "@/lib/getActionErrorMessage";
import {
  adminUpdateUser,
  getUserById,
  updateUserProfile,
} from "@/services/users.services";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import {
  IAdminUpdateUserPayload,
  IUpdateUserPayload,
  IUserPayload,
} from "@/types/users.type";
import {
  adminUpdateUserZodSchema,
  updateUserProfileZodSchema,
} from "@/zod/user.validation";

export const getUserByIdAction = async (
  id: string,
): Promise<ApiResponse<IUserPayload> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid user id",
    };
  }

  try {
    return (await getUserById(id)) as ApiResponse<IUserPayload>;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch user details"),
    };
  }
};

export const updateUserAction = async (
  id: string,
  payload: IUpdateUserPayload,
): Promise<ApiResponse<IUserPayload> | ApiErrorResponse> => {
  const parsed = updateUserProfileZodSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return (await updateUserProfile(id, parsed.data)) as ApiResponse<IUserPayload>;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update profile"),
    };
  }
};

export const adminUpdateUserAction = async (
  id: string,
  payload: IAdminUpdateUserPayload,
): Promise<ApiResponse<IUserPayload> | ApiErrorResponse> => {
  const parsed = adminUpdateUserZodSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return (await adminUpdateUser(id, parsed.data)) as ApiResponse<IUserPayload>;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update user"),
    };
  }
};
