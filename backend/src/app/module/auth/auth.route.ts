import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest.ts";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerStudentZodSchema),
  AuthController.registerStudent,
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser,
);

router.post("/logout", AuthController.logoutUser);

router.get("/me", checkAuth("ADMIN", "STUDENT"), AuthController.getMe);

router.post(
  "/forger-password",
  validateRequest(AuthValidation.forgetPasswordZodSchema),
  AuthController.forgetPassword,
);

router.post(
  "/reset-password",
  validateRequest(AuthValidation.resetPasswordZodSchema),
  AuthController.resetPassword,
);

router.post(
  "/change-password",
  checkAuth("ADMIN", "STUDENT"),
  validateRequest(AuthValidation.changePasswordZodSchema),
  AuthController.changePassword,
);

router.post("/refresh-token", AuthController.getNewToken);

export const AuthRoutes: Router = router;
