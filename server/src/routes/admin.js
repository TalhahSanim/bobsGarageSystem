// File -> server/src/routes/admin.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// The admin dash image route:
// uploadImage -> POST /api/admin/uploadImage -> ADMIN ONLY
import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import upload from "../middleware/upload.js";
import { uploadImage } from "../controllers/adminController.js";

const router = express.Router();

router.post("/uploadImage", auth, admin, upload.single("file"), uploadImage);
export default router;
