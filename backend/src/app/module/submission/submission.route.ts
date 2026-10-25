import { Router } from "express";
import { SubmissionController } from "./submission.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { RateLimiter } from "@/app/middleware/rateLimiter";
import { validateRequest } from "@/app/middleware/validateRequest.ts";
import { SubmissionValidation } from "./submission.validation";

const router = Router();

router.get("/", checkAuth("ADMIN"), SubmissionController.getAllSubmissions);

router.post(
  "/create",
  RateLimiter.submission,
  checkAuth("STUDENT"),
  validateRequest(SubmissionValidation.createSubmissionZodSchema),
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
