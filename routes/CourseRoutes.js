// routes/courseRoutes.js

import express from "express";

import {
  createCourse,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/CourseController.js";

import auth from "../middlewares/AuthMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// ==========================
// Public Routes
// ==========================

// Get All Courses
router.get("/", getCourses);

// Get Single Course
router.get("/:id", getCourse);

// ==========================
// Protected Admin Routes
// ==========================

// Create Course
router.post(
  "/",
  auth,
  upload.single("image"),
  createCourse
);

// Update Course
router.put(
  "/:id",
  auth,
  upload.single("image"),
  updateCourse
);

// Delete Course
router.delete(
  "/:id",
  auth,
  deleteCourse
);

export default router;