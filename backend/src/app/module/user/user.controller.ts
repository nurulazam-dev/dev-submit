import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../shared/sendResponse";
import { IQueryParams } from "../../interfaces/query.interface";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await UserService.getAllUsers(query as IQueryParams);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Users fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await UserService.getAllStudents(query as IQueryParams);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Students fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await UserService.getAllAdmins(query as IQueryParams);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Admins fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.getUserById(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User fetched successfully",
    data: result,
  });
});

const updateUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.updateUserById(id as string, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const adminUpdateUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserService.adminUpdateUserById(id as string, req.body);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getAllStudents,
  getAllAdmins,
  getUserById,
  updateUserById,
  adminUpdateUserById,
};
