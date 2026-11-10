// File -> server/src/routes/services.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// The routes for service-> add,getALL, getOne,edit & delete
// server.js uses the file on /api/services so every path starts here starts after that
import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import {
  addService,
  getAllServices,
  getOneService,
  getOrderedServices,
  searchServices,
  updateService,
  deleteService,
} from "../controllers/servicesController.js";
import { validateService } from "../utils/validate.js";

// router path of express
const router = express.Router();

// ! Service Routes
router.get("/", getAllServices);
router.get("/edit/:id", getOneService);
router.get("/o/:field/:direction", getOrderedServices);
router.get("/s/:search", searchServices);
router.post("/add", auth, admin, validateService, addService);
router.put("/edit/:id", auth, admin, validateService, updateService);
router.delete("/edit/:id", auth, admin, deleteService);

export default router;
