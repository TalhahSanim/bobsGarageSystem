// File -> src/controllers/avatarController.js
// Author -> Talhah Sanim
// Application Version -> 1.0


// Logged in users profile image -> upload or remove one
// routes/users.js puts auth in front of both that means req.user always set

import path from "path";
import fs from "fs";
import db from "../models/models.js";
import avatarUpload from "../middleware/avatarUpload.js";

const { User } = db.sequelize.models;

// delete old uploaded image which takes in the user's old image a value.
// It only deletes uploaded avatars not URLS or admin uploads
const deleteOutdatedAvatar = (image) => {
  if (!image || !image.startsWith("/uploads/avatar-")) return;
  //   basename() keeps file name as it never points outside uploads directory
  fs.promises
    .unlink(path.join("uploads", path.basename(image)))
    .catch(() => {});
};

// name -> upload profile image
// path -> /api/users/me/avatar
// request -> POST [form-data,field- avatar]
// type -> private which is any logged in user
// description -> saves the image and puts it path in the users image and delete the outdated one
export const uploadAvatar = (req, res) => {
  console.log("/api/users/me/avatar -> POST");
  // Run multer so we can send nice message upon failure
  avatarUpload.single("avatar")(req, res, async (err) => {
    if (err) {
      const msg =
        err.code === "LIMIT_FILE_SIZE"
          ? "The image must be 25mb or smaller"
          : "Upload failed";
      return res.status(400).json({ msg });
    }
    // No files is when none was sent or fileFilter rejected it
    if (!req.file) {
      return res
        .status(400)
        .json({ msg: "Please select an JPG,PNG or WebP image" });
    }

    try {
      const user = await User.findByPk(req.user.userId);
      const outdatedImage = user.image;
      await user.update({ image: `/uploads/${req.file.filename}` });
      //   Delete only outdated field when new one is saved
      deleteOutdatedAvatar(outdatedImage);
      res.status(200).json({ image: user.image });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  });
};

// name-> remove my profile image
// path -> /api/users/me/avatar
// request -> DELETE
// type -> private
// description -> clears the users image and get placeholder again
export const removeAvatar = async (req, res) => {
  console.log("/api/users/me/avatar -> DELETE");
  try {
    const user = await User.findByPk(req.user.userId);
    deleteOutdatedAvatar(user.image);
    await user.update({ image: null });
    res.status(200).json({ image: null });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
