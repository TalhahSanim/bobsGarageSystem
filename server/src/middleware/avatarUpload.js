// File -> server/src/middleware/avatarUpload.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// File -> src/middleware/avatarUpload.js
// Multer settings fo profile images such as where to save or what to call it and the size and image types
// Any logged  in user can upload

import multer from "multer";

// The image types we accept and the file ending we give every one
// Never the users own file name or ending
const avatarTypes = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const avatarUpload = multer({
  storage: multer.diskStorage({
    // save image into server/uploads
    destination: (req, file, cb) => cb(null, "./uploads"),
    // Own avatar name which includes user id, time, ending such as profile123.jpg
    filename: (req, file, cb) => {
      cb(
        null,
        `avatar-${req.user.userId}-${Date.now()}${avatarTypes[file.mimetype]}`,
      );
    },
  }),
  //   25MB Max
  limits: { fileSize: 25 * 1024 * 1024 },
  //   Accept only image types like above and reject other types
  fileFilter: (req, file, cb) => cb(null, Boolean(avatarTypes[file.mimetype])),
});

export default avatarUpload;
