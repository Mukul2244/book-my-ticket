import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes.js";
import validate from "./common/middleware/validate.middleware.js";
import RegisterDto from "./modules/auth/dto/register.dto.js";

const app = new express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", validate(RegisterDto), authRouter);

export default app;