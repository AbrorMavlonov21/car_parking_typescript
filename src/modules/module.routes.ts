import { Router } from "express";
import parkRoutes from "./park/park.routes";
import authRoutes from "./auth/auth.routes";
import userRoutes from "./user/user.routes";
import carRoutes from "./car/car.routes";
import placesRoutes from "./places/places.routes";

const router = Router();

router.use("/park", parkRoutes.router);
router.use("/auth", authRoutes.router);
router.use("/user", userRoutes.router);
router.use("/car", carRoutes.router);
router.use("/place", placesRoutes.router);

export default { router };
