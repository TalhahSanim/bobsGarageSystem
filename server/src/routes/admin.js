// File -> server/src/routes/admin.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// The admin dash image routes:
// uploadImage -> POST /api/admin/uploadImage -> ADMIN ONLY
// getImageList -> GET /api/admin/getImageList -> ADMIN ONLY
import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import upload from "../middleware/upload.js";
import { getImageList, uploadImage } from "../controllers/adminController.js";

const router = express.Router();

router.post("/uploadImage", auth, admin, upload.single("file"), uploadImage);
router.get("/getImageList", auth, admin, getImageList);
export default router;
