import { Router } from "express";
import { UserController } from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();

router.get("/", checkAuth("ADMIN"), UserController.getAllUsers);
router.get("/students", checkAuth("ADMIN"), UserController.getAllStudents);
router.get("/admins", checkAuth("ADMIN"), UserController.getAllAdmins);
router.get("/:id", checkAuth("ADMIN"), UserController.getUserById);

router.patch(
  "/:id",
  checkAuth("ADMIN", "STUDENT"),
  UserController.updateUserById,
);

router.patch(
  "/update/:id",
  checkAuth("ADMIN"),
  UserController.adminUpdateUserById,
);

export const UserRoutes: Router = router;
