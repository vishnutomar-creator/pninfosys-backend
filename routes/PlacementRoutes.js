import express from "express";

import {
  createPlacement,
  getAllPlacements,
  getPlacementById,
  updatePlacement,
  deletePlacement,
} from "../controllers/PlacementController.js";

import { protect } from "../middlewares/AuthMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// Create Placement
router.post(
  "/",
  protect,
  upload.single("studentPhoto"),
  createPlacement
);

// Get All Placements
router.get("/", protect, getAllPlacements);

// Get Single Placement
router.get("/:id", protect, getPlacementById);

// Update Placement
router.put(
  "/:id",
  protect,
  upload.single("studentPhoto"),
  updatePlacement
);

// Delete Placement
router.delete("/:id", protect, deletePlacement);

export default router;