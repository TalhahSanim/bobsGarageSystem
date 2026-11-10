// File -> server/src/routes/preferences.js
// Author -> Talhah Sanim
// Application Version -> 1.0
// Routes for logged in users preferences and this code is in controllers/preferencesController.js
//GET -> /api/preferences -> private -> get my preferences -> is created with defaults on first time
// PUT -> /api/preferences -> private -> change my theme,fontsize and or sort order

import express from "express";
import auth from "../middleware/auth.js";
import {
  getPreferences,
  updatePreferences,
} from "../controllers/preferencesController.js";
import { validatePreferences } from "../utils/validate.js";

const router = express.Router();

router.get("/", auth, getPreferences);
router.put("/", auth, validatePreferences, updatePreferences);

export default router;
