// File -> server/src/routes/auth.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// Routes for authentication:
// Login -> POST /api/auth/login, public -> checks the details and sends a token
// Register -> POST /api/auth/register, public-> saves a user and sends a token
// loadUser -> GET /api/auth, private -_> send the loggedin user

import express from "express";

import auth from "../middleware/auth.js";
import { validateRegister, validateLogin } from "../utils/validate.js";
import { loadUser, login, register } from "../controllers/authController.js";

// express router
const router = express.Router();

// Auth Routes
// !  Register Route
router.post("/register", validateRegister, register);

// ! Login Route
router.post("/login", validateLogin, login);

router.get("/", auth, loadUser);

export default router;
