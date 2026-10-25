import { Router } from "express";
import { ReviewController } from "./review.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { ReviewValidation } from "./review.validation";

const router = Router();

router.get("/", checkAuth("ADMIN"), ReviewController.getAllReviews);

router.post(
  "/add-feedback",
  checkAuth("ADMIN"),
  validateRequest(ReviewValidation.createReviewZodSchema),
  ReviewController.createReview,
);

router.get(
  "/admin/my-reviews",
  checkAuth("ADMIN"),
  ReviewController.getMyReviews,
);

router.get(
  "/:id",
  checkAuth("STUDENT", "ADMIN"),
  ReviewController.getReviewById,
);

router.patch(
  "/update/:id",
  checkAuth("ADMIN"),
  validateRequest(ReviewValidation.updateReviewStatusZodSchema),
  ReviewController.adminUpdateReviewById,
);

export const ReviewRoutes: Router = router;
