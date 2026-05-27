import express from "express";

import { fetchAndSaveJobs, getAllJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.get("/fetch", fetchAndSaveJobs);
router.get("/", getAllJobs);

export default router;