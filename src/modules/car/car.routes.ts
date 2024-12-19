import { Router } from "express";
import { carController } from "./car.controller";

const router = Router();

router.get('/', carController.getAll.bind(carController));
router.post('/create', carController.create.bind(carController));
router.put('/update/:id', carController.update.bind(carController));
router.delete('/delete/:id', carController.delete.bind(carController));

export default {router}