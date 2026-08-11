import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    college: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    qualification: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    semester: {
      type: String,
      required: true,
    },

    course: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Enrollment", enrollmentSchema);