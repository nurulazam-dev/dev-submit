import { Router } from "express";
import { AuthRoutes } from "../module/auth/auth.route";
// import { ReviewRoutes } from "../module/review/review.route";
import { UserRoutes } from "../module/user/user.route";
// import { StatsRoutes } from "../module/stats/stats.route";

const router = Router();

router.use("/auth", AuthRoutes);
router.use("/users", UserRoutes);
// router.use("/reviews", ReviewRoutes);
// router.use("/stats", StatsRoutes);

export const IndexRoutes: Router = router;
