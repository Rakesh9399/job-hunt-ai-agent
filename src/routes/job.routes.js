import express from "express";

import { fetchAndSaveJobs, getAllJobs, getSavedJobs } from "../controllers/job.controller.js";

const router = express.Router();

router.get("/fetch", fetchAndSaveJobs);
router.get("/", getAllJobs);
router.get("/saved-jobs", getSavedJobs);

export default router;