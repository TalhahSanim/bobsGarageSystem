// File -> src/routes/favourites.js
// Routes for Fovourites-> the code for each one is in the controllers/favouritesController.js
// GET -> /api/favourites -> private - logged in users favourites
// GET -> /api/favourites/all -> admin -> Every favourite with the customer and service
// POST -> /api/favourites/:serviceId ->  private -> add a favourite
// DELETE -> /api/favourites/serviceId -> private -> remove one of my favourites
// PUT -> /api/favourites/:favouriteId/status -> admin -> tick a favourite as new or contacted

import express from "express";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
// Take the functions we need out of controllers exports
import {
  getMyFavourites,
  getAllFavourites,
  addFavourite,
  removeFavourite,
  updateFavouriteStatus,
} from "../controllers/favouritesController.js";

const router = express.Router();

router.get("/", auth, getMyFavourites);
router.get("/all", auth, admin, getAllFavourites);
router.post("/:serviceId", auth, addFavourite);
router.delete("/:serviceId", auth, removeFavourite);
router.put("/:favouriteId/status", auth, admin, updateFavouriteStatus);

export default router;
