// File -> server/src/middleware/upload.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// Multer configuration -> where uploads saved and called
// and which files allowed to be upload such as images up to 25mb
// used by routes/admin.js
import path from "path";
import multer from "multer";

// Where multer saves uploads and what calls them
const storage = multer.diskStorage({
  // save in server/uploads relative where server runs
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  //  keep file name and remove folder and other characters
  filename: function (req, file, cb) {
    const validName = path
      .basename(file.originalname)
      .replace(/[^a-zA-Z0-9._-]/g, "-");
    cb(null, `${Date.now()}-${validName}`);
  },
});

// Only let images pass through
const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
/**
 * Multer file filter and only accepts JPG,PNG,WebP or GIF Images
 * @param {object} req - the request
 * @param {object} file - the uploaded file and file.mimetype is its type
 * @param {Function} cb - cb null,true keeps the file and  cb null, false skips it so req.file is undefined
 */
const filterFile = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // to accept the file
  } else {
    cb(null, false); // which skip file and makes req.file undefined
  }
};

/** Saves admin uploads to ./uploads directory with the time and file name - JPG/PNG/WebP/GIF 25MB max */
const upload = multer({
  storage: storage,
  fileFilter: filterFile,
  limits: { fileSize: 25 * 1024 * 1024 }, // equates to 25MB
});

export default upload;
