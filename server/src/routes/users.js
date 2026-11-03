// the admin routes for users -> getALL, add,edit, delete
// auth and admin are added to every route
import express from "express";

// secure every route -> MUST be logged (auth) and an admin
import auth from "../middleware/auth.js";
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

export default router;
