/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IPaymentPayload } from "@/types/payment.type";

export const createPaymentService = async (payload: { requestId: string }) => {
  try {
    const response = await httpClient.post("/payments/create-payment", payload);

    return response.data as { checkoutUrl: string };
  } catch (error: any) {
    console.error("Payment Service Error:", error);
    throw error;
  }
};

export const getAllPaymentsService = async (queryString: string) => {
  try {
    const response = await httpClient.get<ApiResponse<IPaymentPayload[]>>(
      queryString ? `/payments?${queryString}` : "/payments",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching payments data.",
      data: null,
      meta: null,
    };
  }
};
