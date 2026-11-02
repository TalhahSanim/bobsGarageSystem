// The admin dash image routes:
// uploadImage -> POST /api/admin/uploadImage -> ADMIN ONLY
// getImageList -> GET /api/admin/getImageList -> ADMIN ONLY
import express from "express";
import fs from "fs";
import multer from "multer";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = express.Router();

// Where multer saves uploads and what calls them
const storage = multer.diskStorage({
  // save in server/uploads relative where server runs
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  //  keep files original name
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// name -> upload image
// path -> /api/admin/uploadImage/
// request => POST
// type -> admin
// description -> multer reafds one file from the form filed "file" and save it
router.post("/uploadImage", auth, admin, upload.single("file"), (req, res) => {
  console.log("/api/admin/uploadImage -> POST");
  console.log(req.file);
  res.status(200).send("Image Uploaded");
});

// name -> get image list
// path -> /api/admin/getImageList
// request -> GET
// type -> admin
// description -> reads the uploads folder and sends back the file names a an array
router.get("/getImageList", auth, admin, async (req, res) => {
  console.log("/api/admin/getImageList -> GET");
  try {
    const files = await fs.promises.readdir("./uploads");
    res.status(200).send(files);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Could not read the uploads folder");
  }
});

export default router;
