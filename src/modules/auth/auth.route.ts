import { Router } from "express";
import { AuthController } from "./auth.controller";
import { registerValidation, loginValidation } from "./auth.validation";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();

router.post("/register", registerValidation, validate, AuthController.register);

router.post("/login", loginValidation, validate, AuthController.login);

export default router;
