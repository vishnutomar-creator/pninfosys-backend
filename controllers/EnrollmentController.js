import Enrollment from "../models/Enrollment.js";

export const createEnrollment = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      college,
      address,
      qualification,
      gender,
      branch,
      semester,
      course,
    } = req.body;

    // Check required fields
    if (
      !fullName ||
      !email ||
      !phone ||
      !college ||
      !address ||
      !qualification ||
      !gender ||
      !branch ||
      !semester ||
      !course
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // Create enrollment
    const enrollment = await Enrollment.create({
      fullName,
      email,
      phone,
      college,
      address,
      qualification,
      gender,
      branch,
      semester,
      course,
    });

    res.status(201).json({
      success: true,
      message: "Enrollment submitted successfully.",
      enrollment,
    });
  } catch (error) {
    console.error("Create Enrollment Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: enrollments.length,
      enrollments,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message ,
    });
  }
};

export const getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found.",
      });
    }

    res.status(200).json({
      success: true,
      enrollment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message ,
    });
  }
};

export const approveEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      {
        status: "Approved",
      },
      {
        new: true,
      }
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enrollment Approved.",
      enrollment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      {
        status: "Rejected",
      },
      {
        new: true,
      }
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Enrollment Rejected.",
      enrollment,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found.",
      });
    }

    await enrollment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Enrollment Deleted Successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

