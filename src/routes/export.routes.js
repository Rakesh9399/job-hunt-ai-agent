import express from "express";

import { exportJobsToExcel } from "../controllers/export.controller.js";

const router = express.Router();

router.get("/excel", exportJobsToExcel);

export default router;