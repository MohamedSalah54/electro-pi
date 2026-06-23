import { body } from "express-validator";

export const createTaskValidation = [
  body("title").notEmpty().withMessage("Title is required"),

  body("description").notEmpty().withMessage("Description is required"),

  body("dueDate").notEmpty().withMessage("Due date is required"),

  body("priority")
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
];

export const updateTaskValidation = [
  body("status")
    .optional()
    .isIn(["pending", "in_progress", "done"])
    .withMessage("Invalid status"),

  body("priority")
    .optional()
    .isIn(["low", "medium", "high"])
    .withMessage("Invalid priority"),
];
