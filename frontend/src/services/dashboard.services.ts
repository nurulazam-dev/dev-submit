/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IDashboardStatsDataPayload } from "@/types/dashboard.types";

export async function getDashboardData() {
  try {
    const response = await httpClient.get<IDashboardStatsDataPayload>("/stats");

    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching dashboard data.",
      data: null,
      meta: null,
    };
  }
}
