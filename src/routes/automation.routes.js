import express from "express";

import { startLinkedInAutomation } from "../controllers/automation.controller.js";

const router = express.Router();

router.get(
    "/linkedin",
    startLinkedInAutomation
);

export default router;