import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/AuthController.js";
import { protect } from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// public route
router.post("/login", loginAdmin); // admin login
router.post("/register", registerAdmin); //admin register

export default router