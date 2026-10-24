import { Router } from "express";
import { ReviewController } from "./review.controller";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();

router.get("/", checkAuth("ADMIN"), ReviewController.getAllReviews);

router.post("/add-feedback", checkAuth("ADMIN"), ReviewController.createReview);

router.get(
  "/:id",
  checkAuth("STUDENT", "ADMIN"),
  ReviewController.getReviewById,
);

router.get(
  "/students/my-reviews",
  checkAuth("STUDENT"),
  ReviewController.getMyReviews,
);

router.patch(
  "/update/:id",
  checkAuth("ADMIN"),
  ReviewController.adminUpdateReviewById,
);

export const ReviewRoutes: Router = router;
