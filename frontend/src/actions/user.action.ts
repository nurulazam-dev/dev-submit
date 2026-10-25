import { getActionErrorMessage } from "@/lib/getActionErrorMessage";
import {
  adminDeleteUserService,
  adminUpdateUser,
  createStaff,
  getUserById,
} from "@/services/users.services";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { IAdminUpdateUserPayload, IUserPayload } from "@/types/users.type";
import {
  adminUpdateUserZodSchema,
  registerStaffZodSchema,
} from "@/zod/user.validation";

export const createStaffAction = async (
  payload: IUserPayload,
): Promise<ApiResponse<IUserPayload> | ApiErrorResponse> => {
  const parsedPayload = registerStaffZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return await createStaff(parsedPayload.data as IUserPayload);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to create staff member"),
    };
  }
};

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
    return await getUserById(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch user details"),
    };
  }
};

export const adminUpdateUserAction = async (
  id: string,
  payload: IAdminUpdateUserPayload,
): Promise<ApiResponse<IUserPayload> | ApiErrorResponse> => {
  const parsedPayload = adminUpdateUserZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return await adminUpdateUser(id, parsedPayload.data);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update user"),
    };
  }
};

export const adminDeleteUserAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid user id",
    };
  }

  try {
    const result = await adminDeleteUserService(id);
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete user"),
    };
  }
};
