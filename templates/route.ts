import { Router } from "express";
import ModelNameController from "../controllers/model-name-controller";

const router = Router();

router.post("/", ModelNameController.create);
router.get("/:id", ModelNameController.findOne);
router.get("/", ModelNameController.findAll);
router.put("/:id", ModelNameController.update);
router.delete("/:id", ModelNameController.destroy);

export default router;
