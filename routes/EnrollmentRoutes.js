import express from "express";

import {
  createEnrollment,
  getEnrollments,
  getEnrollmentById,
  approveEnrollment,
  rejectEnrollment,
  deleteEnrollment,
} from "../controllers/EnrollmentController.js";
import auth from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Student
router.post("/", createEnrollment);

// Admin
router.get("/", auth, getEnrollments);
router.get("/:id", auth, getEnrollmentById);

router.put("/:id/approve",auth, approveEnrollment);
router.put("/:id/reject", auth, rejectEnrollment);

router.delete("/:id",auth, deleteEnrollment);

export default router;