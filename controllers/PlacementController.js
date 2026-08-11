import Placement from "../models/Placement.js";

// ==============================
// Create Placement
// ==============================
export const createPlacement = async (req, res) => {
  try {
    const {
      studentName,
      company,
      course,
      package: packageName,
      year,
      status,
    } = req.body;

    const studentPhoto = req.file?.path;

    if (
      !studentName ||
      !studentPhoto ||
      !company ||
      !course ||
      !packageName ||
      !year
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const placement = await Placement.create({
      studentName,
      studentPhoto,
      company,
      course,
      package: packageName,
      year,
      status,
    });

    res.status(201).json({
      success: true,
      message: "Placement added successfully.",
      placement,
    });
  } catch (error) {
    console.error("Create Placement Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Get All Placements
// ==============================
export const getAllPlacements = async (req, res) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: placements.length,
      placements,
    });
  } catch (error) {
    console.error("Get Placements Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Get Single Placement
// ==============================
export const getPlacementById = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found.",
      });
    }

    res.status(200).json({
      success: true,
      placement,
    });
  } catch (error) {
    console.error("Get Placement Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Update Placement
// ==============================
export const updatePlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found.",
      });
    }

    placement.studentName =
      req.body.studentName || placement.studentName;
    placement.company =
      req.body.company || placement.company;
    placement.course =
      req.body.course || placement.course;
    placement.package =
      req.body.package || placement.package;
    placement.year =
      req.body.year || placement.year;
    placement.status =
      req.body.status || placement.status;

    if (req.file) {
      placement.studentPhoto = req.file.path;
    }

    await placement.save();

    res.status(200).json({
      success: true,
      message: "Placement updated successfully.",
      placement,
    });
  } catch (error) {
    console.error("Update Placement Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Delete Placement
// ==============================
export const deletePlacement = async (req, res) => {
  try {
    const placement = await Placement.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({
        success: false,
        message: "Placement not found.",
      });
    }

    await placement.deleteOne();

    res.status(200).json({
      success: true,
      message: "Placement deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Placement Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};