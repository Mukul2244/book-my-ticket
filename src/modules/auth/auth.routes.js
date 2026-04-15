import { Router } from "express";
import AuthController from "./auth.controller.js";
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";

const router = Router();

const authController = new AuthController();

router.post("/register", validate(RegisterDto), authController.register);
router.post("/login", validate(LoginDto), authController.login);

export default router;
