import express from "express";

import {
  createMentor,
  getMentors,
  getMentor,
  updateMentor,
  deleteMentor,
} from "../controllers/MentorController.js";

import upload from "../middlewares/upload.js";
import auth from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// Create Mentor
router.post("/",auth, upload.single("photo"), createMentor);

// Get All Mentors
router.get("/",  getMentors);

// Get Single Mentor
router.get("/:id",auth, getMentor);

// Update Mentor
router.put("/:id",auth, upload.single("photo"), updateMentor);

// Delete Mentor
router.delete("/:id", auth, deleteMentor);

export default router;