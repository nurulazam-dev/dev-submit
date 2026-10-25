import { Request, Response } from "express";
import status from "http-status";
import { catchAsync } from "../../shared/catchAsync";
import { ReviewService } from "./review.service";
import { sendResponse } from "../../shared/sendResponse";
import { IQueryParams } from "../../interfaces/query.interface";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewService.createReview(
    req.body,
    req.user?.userId as string,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Review submit successfully",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await ReviewService.getAllReviews(query as IQueryParams);
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Reviews fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getMyReviews = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;
  const reviewerId = (req.user as any).userId;

  const result = await ReviewService.getMyReviews(
    query as IQueryParams,
    reviewerId,
  );

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "My Reviews fetched successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getReviewById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await ReviewService.getReviewById(id as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Review fetched successfully",
    data: result,
  });
});

const adminUpdateReviewById = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const result = await ReviewService.adminUpdateReviewById(
      id as string,
      req.body,
    );

    sendResponse(res, {
      httpStatusCode: status.OK,
      success: true,
      message: "Review status updated successfully",
      data: result,
    });
  },
);

export const ReviewController = {
  createReview,
  getAllReviews,
  getReviewById,
  adminUpdateReviewById,
  getMyReviews,
};
