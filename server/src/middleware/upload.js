// Multer configuration -> where uploads saved and called
// and which files allowed to be upload such as images up to 2mb
// used by routes/admin.js
import path from "path";
import multer from "multer";

// Where multer saves uploads and what calls them
const storage = multer.diskStorage({
  // save in server/uploads relative where server runs
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  //  keep files original name
  filename: function (req, file, cb) {
    const validName = path
      .basename(file.originalname)
      .replace(/[^a-zA-Z0-9._-]/g, "-");
    cb(null, validName);
  },
});

// Only let images pass through
const allowedTypes = ["images/jpeg", "images/png", "images/webp", "images/gif"];

const filterFile = (req, res, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // to accept the file
  } else {
    cb(null, false); // which skip file and makes req.file undefined
  }
};

const upload = multer({
  storage: storage,
  filterFile: filterFile,
  limits: { fileSize: 2 * 2024 * 2024 }, // equates to 2MB
});

export default upload;
