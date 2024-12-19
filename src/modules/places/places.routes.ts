import { Router } from "express";
import { placeController } from "./places.controller";

const router = Router();

router.get('/', placeController.getAll.bind(placeController));
router.post('/create', placeController.create.bind(placeController));
router.put('/update/:id', placeController.update.bind(placeController));
router.delete('/delete/:id', placeController.delete.bind(placeController));

export default { router }