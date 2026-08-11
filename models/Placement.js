import mongoose from "mongoose";

const placementSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },

    studentPhoto: {
      type: String,
      required: true, // Cloudinary URL
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    course: {
      type: String,
      required: true,
      trim: true,
    },

    package: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Placed", "Training"],
      default: "Placed",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Placement", placementSchema);