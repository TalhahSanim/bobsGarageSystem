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

const filterFile = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // to accept the file
  } else {
    cb(null, false); // which skip file and makes req.file undefined
  }
};

const upload = multer({
  storage: storage,
  fileFilter: filterFile,
  limits: { fileSize: 25 * 1024 * 1024 }, // equates to 25MB
});

export default upload;
