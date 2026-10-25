/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import {
  IApplyServiceRequestPayload,
  IServiceRequestPayload,
} from "@/types/serviceRequest.type";
import {
  IServiceRequestUpdateCostBySPPayload,
  IServiceRequestUpdatePayload,
} from "@/zod/serviceRequest.validation";

export const getAllServiceRequestsService = async (queryString: string) => {
  try {
    const response = await httpClient.get<
      ApiResponse<IServiceRequestPayload[]>
    >(queryString ? `/service-requests?${queryString}` : "/service-requests");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message ||
        "An error occurred while fetching service requests data.",
      data: null,
      meta: null,
    };
  }
};

export const getMyAllServiceRequestByCustomerService = async (
  queryString: string,
) => {
  try {
    const response = await httpClient.get<
      ApiResponse<IServiceRequestPayload[]>
    >(
      queryString
        ? `/service-requests/my-service-requests-customer?${queryString}`
        : "/service-requests/my-service-requests-customer",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message ||
        "An error occurred while fetching customer own service requests data.",
      data: null,
      meta: null,
    };
  }
};

export const getMyAllRequestsBySPService = async (queryString: string) => {
  try {
    const response = await httpClient.get<
      ApiResponse<IServiceRequestPayload[]>
    >(
      queryString
        ? `/service-requests/my-service-requests-sp?${queryString}`
        : "/service-requests/my-service-requests-sp",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message ||
        "An error occurred while fetching SP own service requests data.",
      data: null,
      meta: null,
    };
  }
};

export const getServiceRequestByIdService = async (id: string) => {
  try {
    const response = await httpClient.get<ApiResponse<IServiceRequestPayload>>(
      `/service-requests/${id}`,
    );
    return response;
  } catch (error: any) {
    console.log("Error fetching job application by id:", error);
    throw error;
  }
};

export const applyServiceRequestService = async (
  payload: IApplyServiceRequestPayload,
) => {
  try {
    const response = await httpClient.post<IServiceRequestPayload>(
      "/service-requests/apply",
      payload,
    );
    return response;
  } catch (error) {
    console.log("Error apply service request:", error);
    throw error;
  }
};

export const updateServiceRequestService = async (
  id: string,
  payload: IServiceRequestUpdatePayload,
) => {
  try {
    const response = await httpClient.patch<IServiceRequestUpdatePayload>(
      `/service-requests/update-service-request/${id}`,
      payload,
    );
    return response;
  } catch (error) {
    console.log("Error updating service request:", error);
    throw error;
  }
};

export const updateServiceRequestCostBySPService = async (
  id: string,
  payload: IServiceRequestUpdateCostBySPPayload,
): Promise<any> => {
  try {
    const response = await httpClient.patch(
      `/service-requests/update-service-request-cost/${id}`,
      payload,
    );

    return response.data;
  } catch (error) {
    console.error("Service Error:", error);
    throw error;
  }
};

export const cancelServiceRequestService = async (id: string) => {
  try {
    const response = await httpClient.patch<
      ApiResponse<{
        message: string;
      }>
    >(`/service-requests/cancel/${id}`);

    return response;
  } catch (error) {
    console.log("Error fetching service request by id:", error);
    throw error;
  }
};
