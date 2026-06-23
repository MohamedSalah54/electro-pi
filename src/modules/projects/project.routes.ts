import { Router } from "express";
import { ProjectController } from "./project.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  createProjectValidation,
  updateProjectValidation,
} from "./project.validation";

const router = Router();

router.use(authMiddleware);

router.post("/", createProjectValidation, validate, ProjectController.create);

router.get("/", ProjectController.findAll);

router.get("/:id", ProjectController.findOne);

router.put("/:id", updateProjectValidation, validate, ProjectController.update);

router.delete("/:id", ProjectController.delete);

export default router;
