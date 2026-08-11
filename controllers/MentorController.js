import Mentor from "../models/Mentor.js";

// Create Mentor

export const createMentor = async (req, res) => {
  try {
    const mentor = await Mentor.create({
      ...req.body,
      photo: req.file ? req.file.path : "",
    });

    res.status(201).json({
      success: true,
      message: "Mentor created successfully",
      mentor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create mentor",
      error: error.message,
    });
  }
};

// Get All Mentors
export const getMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find().sort({
      order: 1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      mentors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentors",
      error: error.message,
    });
  }
};

// Get Single Mentor
export const getMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    res.status(200).json({
      success: true,
      mentor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentor",
      error: error.message,
    });
  }
};

// Update Mentor
export const updateMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Mentor updated successfully",
      mentor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update mentor",
      error: error.message,
    });
  }
};

// Delete Mentor
export const deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);

    if (!mentor) {
      return res.status(404).json({
        success: false,
        message: "Mentor not found",
      });
    }

    await mentor.deleteOne();

    res.status(200).json({
      success: true,
      message: "Mentor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete mentor",
      error: error.message,
    });
  }
};