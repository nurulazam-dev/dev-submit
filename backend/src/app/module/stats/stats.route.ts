import { Router } from "express";
import { StatsController } from "./stats.controller";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();

router.get(
  "/",
  checkAuth("ADMIN", "STUDENT"),
  StatsController.getDashboardStatsData,
);

export const StatsRoutes: Router = router;
