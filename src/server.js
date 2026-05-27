import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";

// dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));


// Routes
import userRoutes from "./routes/user.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import jobRoutes from "./routes/job.routes.js";
import exportRoutes from "./routes/export.routes.js";
import emailRoutes from "./routes/email.routes.js";
import automationRoutes from "./routes/automation.routes.js";

// API Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/resume", resumeRoutes);
app.use("/api/v1/jobs", jobRoutes);
app.use("/api/v1/export", exportRoutes);
app.use("/api/v1/email", emailRoutes);
app.use("/api/v1/automation", automationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});