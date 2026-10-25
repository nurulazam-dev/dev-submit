import { getActionErrorMessage } from "@/lib/getActionErrorMessage";
import {
  createService,
  deleteService,
  getServiceById,
  updateService,
} from "@/services/servicesData.services";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { IServicePayload, IUpdateServicePayload } from "@/types/service.type";
import {
  createServiceZodSchema,
  updateServiceZodSchema,
} from "@/zod/service.validation";

export const createServiceAction = async (
  payload: IServicePayload,
): Promise<ApiResponse<IServicePayload> | ApiErrorResponse> => {
  const parsedPayload = createServiceZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return await createService(parsedPayload.data as IServicePayload);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to create service"),
    };
  }
};

export const getServiceByIdAction = async (
  id: string,
): Promise<ApiResponse<IServicePayload> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid service id",
    };
  }

  try {
    return await getServiceById(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch service details"),
    };
  }
};

export const updateServiceAction = async (
  id: string,
  payload: IUpdateServicePayload,
): Promise<ApiResponse<IServicePayload> | ApiErrorResponse> => {
  const parsedPayload = updateServiceZodSchema.safeParse(payload);

  if (!parsedPayload.success) {
    return {
      success: false,
      message: parsedPayload.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    return await updateService(id, parsedPayload.data);
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update service"),
    };
  }
};

export const deleteServiceAction = async (
  id: string,
): Promise<ApiResponse<{ message: string }> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid service id",
    };
  }

  try {
    const result = await deleteService(id);
    return result;
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete service"),
    };
  }
};
