// File -> server/src/routes/testRoute.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// Test Route -> Get /api -> checks the server is running
import express from "express";
import { apiTest } from "../controllers/testController.js";
const router = express.Router();

router.get("/", apiTest);

export default router;
