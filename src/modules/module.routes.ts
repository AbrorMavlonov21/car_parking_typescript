import { Router } from "express";
import parkRoutes from "./park/park.routes";
import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";

const router = Router();

router.use("/park", parkRoutes.router);
router.use("/auth", authRoutes.router);
router.use("/user", userRoutes.router);

export default { router };
