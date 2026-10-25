"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import {
  ICreateServicePayload,
  IServicePayload,
  IUpdateServicePayload,
} from "@/types/service.type";

export const getAllServices = async (queryString: string = "") => {
  try {
    const response = await httpClient.get<ApiResponse<IServicePayload[]>>(
      queryString ? `/services?${queryString}` : "/services",
    );
    return response;
  } catch (error) {
    console.log("Error fetching services:", error);
    throw error;
  }
};

export const createService = async (payload: ICreateServicePayload) => {
  try {
    const response = await httpClient.post<IServicePayload>(
      "/services/create-service",
      payload,
    );
    return response;
  } catch (error) {
    console.log("Error creating service:", error);
    throw error;
  }
};

export const updateService = async (
  id: string,
  payload: IUpdateServicePayload,
) => {
  try {
    const response = await httpClient.patch<IServicePayload>(
      `/services/update/${id}`,
      payload,
    );
    return response;
  } catch (error) {
    console.log("Error updating service:", error);
    throw error;
  }
};

export const getServiceById = async (id: string) => {
  try {
    const service = await httpClient.get<IServicePayload>(`/services/${id}`);
    return service;
  } catch (error) {
    console.log("Error fetching service by id:", error);
    throw error;
  }
};

export const deleteService = async (id: string) => {
  try {
    const response = await httpClient.patch<ApiResponse<{ message: string }>>(
      `/services/delete/${id}`,
    );

    return response;
  } catch (error) {
    console.error("Error deleting service:", error);
    throw error;
  }
};
