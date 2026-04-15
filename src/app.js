import express from "express";
import cors from "cors";
import authRouter from "./modules/auth/auth.routes.js";
import bookingRouter from "./modules/booking/booking.routes.js";

const app = new express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRouter);
app.use("/booking", bookingRouter);

export default app;