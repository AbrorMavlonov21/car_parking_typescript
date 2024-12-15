import { Router } from "express";
import { userController } from "./user.controller";
const router = Router();

router.get("/", userController.getAll.bind(userController));
router.post("/create", userController.create.bind(userController));
router.put("/update/:id", userController.update.bind(userController));
router.delete("/delete/:id", userController.delete.bind(userController));

export default {router};