import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { SubmissionService } from "./submission.service";
import { sendResponse } from "../../shared/sendResponse";
import { IQueryParams } from "../../interfaces/query.interface";

const createSubmissions = catchAsync(async (req: Request, res: Response) => {
  const result = await SubmissionService.createSubmission(
    req.body,
    req.user?.userId as string,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Submission submit successfully",
    data: result,
  });
});

const getAllSubmissions = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await SubmissionService.getAllSubmissions(
    query as IQueryParams,
  );
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Submissions fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getMySubmissions = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const studentId = (req.user as any).userId;

  const result = await SubmissionService.getMySubmissions(
    query as IQueryParams,
    studentId,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "My Submissions fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getSubmissionById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SubmissionService.getSubmissionById(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Submission fetched successfully",
    data: result,
  });
});

const adminUpdateSubmissionById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await SubmissionService.adminUpdateSubmissionById(
      id as string,
      req.body,
    );

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Submission updated successfully",
      data: result,
    });
  },
);

export const SubmissionController = {
  createSubmissions,
  getAllSubmissions,
  getSubmissionById,
  adminUpdateSubmissionById,
  getMySubmissions,
};
