import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resume.routes.js";

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/resume", resumeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});