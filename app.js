import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes.js";
import courseRoutes from "./routes/CourseRoutes.js";
import EnrollmentRoutes from "./routes/EnrollmentRoutes.js";
import PlacementRoutes from "./routes/PlacementRoutes.js";
import mentorRoutes from "./routes/MentorRoutes.js";

import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://pninfosys-frontend-nu.vercel.app",
        "https://pninfosys.com",
        "https://www.pninfosys.com"
    ],
    credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", EnrollmentRoutes);
app.use("/api/placements", PlacementRoutes);
app.use("/api/mentors", mentorRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("PN Infosys Backend API Running 🚀");
});

// Server (local dev only — Vercel handles this in production)
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export default app;