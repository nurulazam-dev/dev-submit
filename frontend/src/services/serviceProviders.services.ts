/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IServiceProviderPayload } from "@/types/serviceProvider.type";

export async function getAllServiceProviders(queryString: string) {
  try {
    const response = await httpClient.get<
      ApiResponse<IServiceProviderPayload[]>
    >(queryString ? `/service-providers?${queryString}` : "/service-providers");

    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message ||
        "An error occurred while fetching service-providers data.",
      data: null,
      meta: null,
    };
  }
}

export const getServiceProviderById = async (id: string) => {
  try {
    const user = await httpClient.get<IServiceProviderPayload>(
      `/service-providers/${id}`,
    );
    return user;
  } catch (error) {
    console.log("Error fetching service-provider by id:", error);
    throw error;
  }
};

/* export const adminUpdateUser = async (
  id: string,
  payload: IAdminUpdateUserPayload,
) => {
  try {
    const user = await httpClient.patch<IAdminUpdateUserPayload>(
      `/users/update/${id}`,
      payload,
    );
    return user;
  } catch (error) {
    console.log("Error updating user:", error);
    throw error;
  }
}; */
