/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ApiResponse } from "@/types/api.types";
import {
  IAdminUpdateUserPayload,
  IUpdateUserPayload,
  IUserPayload,
} from "@/types/users.type";

export async function getAllUsers(queryString: string = "") {
  try {
    const response = await httpClient.get<ApiResponse<IUserPayload[]>>(
      queryString ? `/users?${queryString}` : "/users",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while fetching users data.",
      data: [],
      meta: null,
    };
  }
}

export async function getAllStudents(queryString: string = "") {
  try {
    const response = await httpClient.get<ApiResponse<IUserPayload[]>>(
      queryString ? `/users/students?${queryString}` : "/users/students",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while fetching students data.",
      data: [],
      meta: null,
    };
  }
}

export async function getAllAdmins(queryString: string = "") {
  try {
    const response = await httpClient.get<ApiResponse<IUserPayload[]>>(
      queryString ? `/users/admins?${queryString}` : "/users/admins",
    );
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An error occurred while fetching admins data.",
      data: [],
      meta: null,
    };
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await httpClient.get<IUserPayload>(`/users/${id}`);
    return user;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    throw error;
  }
};

export const updateUserProfile = async (
  id: string,
  payload: IUpdateUserPayload,
) => {
  try {
    const response = await httpClient.patch<IUserPayload>(`/users/${id}`, payload);
    return response;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const adminUpdateUser = async (
  id: string,
  payload: IAdminUpdateUserPayload,
) => {
  try {
    const response = await httpClient.patch<IUserPayload>(
      `/users/update/${id}`,
      payload,
    );
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
