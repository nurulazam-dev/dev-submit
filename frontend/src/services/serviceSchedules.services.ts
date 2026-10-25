/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import {
  ICreateServiceSchedulePayload,
  IServiceSchedulePayload,
} from "@/types/schedule.type";

export async function getAllSchedules(queryString: string) {
  try {
    const response = await httpClient.get<
      ApiResponse<IServiceSchedulePayload[]>
    >(queryString ? `/service-schedules?${queryString}` : "/service-schedules");

    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message ||
        "An error occurred while fetching service schedules data.",
      data: null,
      meta: null,
    };
  }
}

export const getMyAllSchedulesService = async (queryString: string) => {
  try {
    const response = await httpClient.get<
      ApiResponse<IServiceSchedulePayload[]>
    >(
      queryString
        ? `/service-schedules/my-schedules?${queryString}`
        : "/service-schedules/my-schedules",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message ||
        "An error occurred while fetching provider own schedules data.",
      data: null,
      meta: null,
    };
  }
};

export const getServiceScheduleById = async (id: string) => {
  try {
    const data = await httpClient.get<IServiceSchedulePayload>(
      `/service-schedules/${id}`,
    );
    return data;
  } catch (error) {
    console.log("Error fetching schedule by id:", error);
    throw error;
  }
};

export const createServiceScheduleService = async (
  payload: ICreateServiceSchedulePayload,
) => {
  try {
    const response = await httpClient.post<IServiceSchedulePayload>(
      "/service-schedules/create-schedule",
      payload,
    );
    return response;
  } catch (error) {
    console.log("Error creating service schedule:", error);
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

/* export const adminDeleteUserService = async (id: string) => {
  try {
    const response = await httpClient.patch<ApiResponse<{ message: string }>>(
      `/users/delete/${id}`,
    );

    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}; */
