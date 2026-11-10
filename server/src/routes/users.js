// File -> server/src/routes/users.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// the admin routes for users -> getALL, add,edit, delete
// auth and admin are added to every route
import express from "express";

// secure every route -> MUST be logged (auth) and an admin
import auth from "../middleware/auth.js";
// profile image controllers
import { uploadAvatar, removeAvatar } from "../controllers/avatarController.js";
import admin from "../middleware/admin.js";
import {
  addUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../controllers/usersController.js";
import { validateUser } from "../utils/validate.js";

const router = express.Router();
// ! User Routes
router.get("/", auth, admin, getUsers);
router.post("/add", auth, admin, validateUser, addUser);

router.put("/edit/:id", auth, admin, validateUser, updateUser);

router.delete("/edit/:id", auth, admin, deleteUser);

router.post("/me/avatar", auth, uploadAvatar);
router.delete("/me/avatar", auth, removeAvatar);

export default router;
