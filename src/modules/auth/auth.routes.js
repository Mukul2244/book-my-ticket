import { Router } from "express";
import AuthController from "./auth.controller.js";

const router = Router();

const authController = new AuthController();

router.post("/register", authController.register);

export default router;