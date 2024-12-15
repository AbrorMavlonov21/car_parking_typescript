import { Router } from "express";
import { parkController } from "./park.controller";

const router = Router();

router.get("/", parkController.getAll.bind(parkController));
router.post('/create', parkController.create.bind(parkController));
router.put('/update/:id', parkController.update.bind(parkController));
router.delete('/delete/:id', parkController.delete.bind(parkController));

export default { router };
