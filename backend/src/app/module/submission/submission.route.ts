import { Router } from "express";
import { SubmissionController } from "./submission.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { RateLimiter } from "@/app/middleware/rateLimiter";

const router = Router();

router.get("/", checkAuth("ADMIN"), SubmissionController.getAllSubmissions);

router.post(
  "/create",
  RateLimiter.submission,
  checkAuth("STUDENT"),
  SubmissionController.createSubmission,
);

router.get(
  "/:id",
  checkAuth("STUDENT", "ADMIN"),
  SubmissionController.getSubmissionById,
);

router.get(
  "/students/my-submissions",
  checkAuth("STUDENT"),
  SubmissionController.getMySubmissions,
);

router.patch(
  "/update/:id",
  checkAuth("ADMIN"),
  SubmissionController.adminUpdateSubmissionById,
);

export const SubmissionRoutes: Router = router;
