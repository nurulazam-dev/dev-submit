/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import {
  IAdminUpdateSubmissionPayload,
  ICreateSubmissionPayload,
  ISubmissionPayload,
} from "@/types/submission.type";

export async function getAllSubmissions(queryString: string = "") {
  try {
    const response = await httpClient.get<ApiResponse<ISubmissionPayload[]>>(
      queryString ? `/submissions?${queryString}` : "/submissions",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching submissions data.",
      data: [],
      meta: null,
    };
  }
}

export async function getMySubmissions(queryString: string = "") {
  try {
    const response = await httpClient.get<ApiResponse<ISubmissionPayload[]>>(
      queryString
        ? `/submissions/students/my-submissions?${queryString}`
        : "/submissions/students/my-submissions",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching your submissions.",
      data: [],
      meta: null,
    };
  }
}

export async function getSubmissionById(id: string) {
  try {
    const response = await httpClient.get<ISubmissionPayload>(
      `/submissions/${id}`,
    );
    return response;
  } catch (error: any) {
    console.error("Error fetching submission by id:", error);
    throw error;
  }
}

export async function createSubmission(payload: ICreateSubmissionPayload) {
  try {
    const response = await httpClient.post<ISubmissionPayload>(
      "/submissions/create",
      payload,
    );
    return response;
  } catch (error: any) {
    console.error("Error creating submission:", error);
    throw error;
  }
}

export async function adminUpdateSubmission(
  id: string,
  payload: IAdminUpdateSubmissionPayload,
) {
  try {
    const response = await httpClient.patch<ISubmissionPayload>(
      `/submissions/update/${id}`,
      payload,
    );
    return response;
  } catch (error: any) {
    console.error("Error updating submission status:", error);
    throw error;
  }
}
