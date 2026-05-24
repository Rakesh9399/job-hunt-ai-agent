import express from "express";

import {
    createUserProfile,
    getUserProfile,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUserProfile);

router.get("/", getUserProfile);

export default router;