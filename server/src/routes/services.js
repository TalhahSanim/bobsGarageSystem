// The routes for service-> add,getALL, getOne,edit & delete
// server.js uses the file on /api/services so every path starts here starts after that
import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import {
  addService,
  deleteService,
  getAllServices,
  getOneService,
  updateService,
} from "../controllers/servicesController.js";

// router path of express
const router = express.Router();

// ! Service Routes
router.get("/", getAllServices);
router.get("/edit/:id", getOneService);
router.post("/add", auth, admin, validateService, addService);
router.put("/edit/:id", auth, admin, updateService);
router.delete("/edit/:id", auth, admin, deleteService);

export default router;
