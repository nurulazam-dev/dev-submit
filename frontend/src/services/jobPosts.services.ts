/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import {
  ICreateJobPostPayload,
  IJobPostPayload,
  IUpdateJobPostPayload,
} from "@/types/jobPost.type";

export const getAllJobPostsService = async (queryString: string) => {
  try {
    const response = await httpClient.get<ApiResponse<IJobPostPayload[]>>(
      queryString ? `/job-posts?${queryString}` : "/job-posts",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching job posts data.",
      data: null,
      meta: null,
    };
  }
};

export const createJobPostService = async (payload: ICreateJobPostPayload) => {
  try {
    const response = await httpClient.post<ICreateJobPostPayload>(
      "/job-posts/create-job-post",
      payload,
    );
    return response;
  } catch (error) {
    console.log("Error creating job-post:", error);
    throw error;
  }
};

export const updateJobPostService = async (
  id: string,
  payload: IUpdateJobPostPayload,
) => {
  try {
    const response = await httpClient.patch<IUpdateJobPostPayload>(
      `/job-posts/update/${id}`,
      payload,
    );
    return response;
  } catch (error) {
    console.log("Error updating job-post:", error);
    throw error;
  }
};

export const getJobPostService = async (id: string) => {
  try {
    const response = await httpClient.get<IJobPostPayload>(`/job-posts/${id}`);
    return response;
  } catch (error) {
    console.log("Error fetching job post by id:", error);
    throw error;
  }
};

export const deleteJobPostService = async (id: string) => {
  try {
    const response = await httpClient.patch<
      ApiResponse<{
        message: string;
      }>
    >(`/job-posts/delete/${id}`);

    return response;
  } catch (error) {
    console.log("Error fetching job post by id:", error);
    throw error;
  }
};
