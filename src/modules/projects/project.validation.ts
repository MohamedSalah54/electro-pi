import { body } from "express-validator";

export const createProjectValidation = [
  body("title").notEmpty().withMessage("Title is required"),

  body("description").notEmpty().withMessage("Description is required"),
];

export const updateProjectValidation = [
  body("title").optional(),

  body("description").optional(),

  body("status")
    .optional()
    .isIn(["active", "completed"])
    .withMessage("Invalid status"),
];
