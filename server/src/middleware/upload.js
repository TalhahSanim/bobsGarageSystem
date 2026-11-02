// Multer configuration -> where uploades saved and called
// used by routes/admin.js

import multer from "multer";

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

export default upload;
