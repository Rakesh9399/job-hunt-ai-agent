import express from "express";

import { generateEmailForJob } from "../controllers/email.controller.js";

const router = express.Router();

router.get(
    "/generate/:jobId",
    generateEmailForJob
);

export default router;