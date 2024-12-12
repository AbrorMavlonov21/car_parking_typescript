import { Router } from "express";
import parkRoutes from "./park/park.routes";
import authRoutes from "./auth/auth.routes";

const router = Router();

router.use("/park", parkRoutes.router);
router.use("/auth", authRoutes.router);

export default { router };
