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

// Create Placement (admin only)
router.post(
  "/",
  protect,
  upload.single("studentPhoto"),
  createPlacement
);

// Get All Placements (public)
router.get("/", getAllPlacements);

// Get Single Placement (public)
router.get("/:id", getPlacementById);

// Update Placement (admin only)
router.put(
  "/:id",
  protect,
  upload.single("studentPhoto"),
  updatePlacement
);

// Delete Placement (admin only)
router.delete("/:id", protect, deletePlacement);

export default router;