/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import {
  IApplyJobApplicationPayload,
  IJobApplicationPayload,
  IMyJobApplicationPayload,
  IUpdateJobApplicationPayload,
} from "@/types/jobApplication.type";
// import {
//   ICreateJobPostPayload,
//   IJobPostPayload,
//   IUpdateJobPostPayload,
// } from "@/types/jobPost.type";

export const getAllJobApplicationsService = async (queryString: string) => {
  try {
    const response = await httpClient.get<
      ApiResponse<IJobApplicationPayload[]>
    >(queryString ? `/job-applications?${queryString}` : "/job-applications");
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message ||
        "An error occurred while fetching job applications data.",
      data: null,
      meta: null,
    };
  }
};

export const getMyAllJobApplicationsService = async (queryString: string) => {
  try {
    const response = await httpClient.get<
      ApiResponse<IMyJobApplicationPayload[]>
    >(
      queryString
        ? `/job-applications/my-applications?${queryString}`
        : "/job-applications/my-applications",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message ||
        "An error occurred while fetching your job applications data.",
      data: null,
      meta: null,
    };
  }
};

export const applyJobApplicationService = async (
  payload: IApplyJobApplicationPayload,
) => {
  try {
    const response = await httpClient.post<IApplyJobApplicationPayload>(
      "/job-applications/apply",
      payload,
    );
    return response;
  } catch (error) {
    console.log("Error creating job-application:", error);
    throw error;
  }
};

export const updateJobApplicationService = async (
  id: string,
  payload: IUpdateJobApplicationPayload,
): Promise<ApiResponse<IJobApplicationPayload>> => {
  try {
    const response = await httpClient.patch<
      ApiResponse<IJobApplicationPayload>
    >(`/job-applications/update/${id}`, payload);

    return response.data;
  } catch (error) {
    console.log("Error updating job-application:", error);
    throw error;
  }
};

export const getJobApplicationService = async (id: string) => {
  try {
    const response = await httpClient.get<IJobApplicationPayload>(
      `/job-applications/${id}`,
    );
    return response;
  } catch (error) {
    console.log("Error fetching job application by id:", error);
    throw error;
  }
};
