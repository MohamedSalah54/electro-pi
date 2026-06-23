import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createTaskValidation, updateTaskValidation } from "./task.validation";
import { TaskController } from "./task.controller";

const router = Router();

router.use(authMiddleware);

router.post(
  "/projects/:projectId/tasks",
  createTaskValidation,
  validate,
  TaskController.create,
);

router.get("/projects/:projectId/tasks", TaskController.findAll);

router.get("/tasks/:id", TaskController.findOne);

router.put("/tasks/:id", updateTaskValidation, validate, TaskController.update);

router.delete("/tasks/:id", TaskController.delete);

export default router;
