/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import { IAdminUpdateUserPayload, IUserPayload } from "@/types/users.type";

export async function getAllUsers(queryString: string) {
  try {
    const response = await httpClient.get<ApiResponse<IUserPayload[]>>(
      queryString ? `/users?${queryString}` : "/users",
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while fetching users data.",
      data: null,
      meta: null,
    };
  }
}

export async function getAllCustomers(queryString: string) {
  try {
    const response = await httpClient.get<ApiResponse<IUserPayload[]>>(
      queryString ? `/users/customers?${queryString}` : "/users/customers",
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while fetching users data.",
      data: null,
      meta: null,
    };
  }
}

export async function getAllProviders(queryString: string) {
  try {
    const response = await httpClient.get<ApiResponse<IUserPayload[]>>(
      queryString ? `/users/providers?${queryString}` : "/users/providers",
    );

    return response;
  } catch (error: any) {
    return {
      success: false,
      message:
        error.message || "An error occurred while fetching providers data.",
      data: null,
      meta: null,
    };
  }
}

export const createStaff = async (payload: IUserPayload) => {
  try {
    const response = await httpClient.post<IUserPayload>(
      "/users/register-staff",
      payload,
    );
    return response;
  } catch (error) {
    console.log("Error creating staff member:", error);
    throw error;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await httpClient.get<IUserPayload>(`/users/${id}`);
    return user;
  } catch (error) {
    console.log("Error fetching user by id:", error);
    throw error;
  }
};

export const adminUpdateUser = async (
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
};

export const adminDeleteUserService = async (id: string) => {
  try {
    const response = await httpClient.patch<ApiResponse<{ message: string }>>(
      `/users/delete/${id}`,
    );

    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
