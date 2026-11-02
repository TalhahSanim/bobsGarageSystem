// Routes for authentication:
// Login -> POST /api/auth/login, public -> checks the details and sends a token
// Register -> POST /api/auth/register, public-> saves a user and sends a token
// loadUser -> GET /api/auth, private -_> send the loggedin user

import express from "express";

import auth from "../middleware/auth.js";
import { loadUser, login, register } from "../controllers/authController.js";

// express router
const router = express.Router();

// Auth Routes
// !  Register Route
router.post("/register", register);

// ! Login Route
router.post("/login", login);

router.get("/", auth, loadUser);

export default router;
