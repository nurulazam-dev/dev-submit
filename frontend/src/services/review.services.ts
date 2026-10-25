/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import {
  ICreateReviewPayload,
  IReviewPayload,
  IReviewStatusUpdatePayload,
} from "@/types/review.type";

export async function getAllReviews(queryString: string = "") {
  try {
    const response = await httpClient.get<ApiResponse<IReviewPayload[]>>(
      queryString ? `/reviews?${queryString}` : "/reviews",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching reviews data.",
      data: [],
      meta: null,
    };
  }
}

export async function getMyReviews(queryString: string = "") {
  try {
    const response = await httpClient.get<ApiResponse<IReviewPayload[]>>(
      queryString
        ? `/reviews/admin/my-reviews?${queryString}`
        : "/reviews/admin/my-reviews",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching your reviews.",
      data: [],
      meta: null,
    };
  }
}

export async function getReviewById(id: string) {
  try {
    const response = await httpClient.get<IReviewPayload>(`/reviews/${id}`);
    return response;
  } catch (error: any) {
    console.error("Error fetching review by id:", error);
    throw error;
  }
}

export async function createReview(payload: ICreateReviewPayload) {
  try {
    const response = await httpClient.post<IReviewPayload>(
      "/reviews/add-feedback",
      payload,
    );
    return response;
  } catch (error: any) {
    console.error("Error creating review feedback:", error);
    throw error;
  }
}

export async function adminUpdateReviewStatus(
  id: string,
  payload: IReviewStatusUpdatePayload,
) {
  try {
    const response = await httpClient.patch<IReviewPayload>(
      `/reviews/update/${id}`,
      payload,
    );
    return response;
  } catch (error: any) {
    console.error("Error updating review status:", error);
    throw error;
  }
}
