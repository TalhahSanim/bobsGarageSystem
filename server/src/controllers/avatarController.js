// File -> server/src/controllers/avatarController.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// Logged in users profile image -> upload or remove one
// routes/users.js puts auth in front of both that means req.user always set

import path from "path";
import fs from "fs";
import db from "../models/models.js";
import avatarUpload from "../middleware/avatarUpload.js";

const { User } = db.sequelize.models;

/**
 * Deletes an old profile from uploads if it is one of ours
 * @param {string} image - the saved path such as /uploads/avatar-3-128484.jpg and anything else is skipped
 * @returns {void}
 */
const deleteOutdatedAvatar = (image) => {
  if (!image || !image.startsWith("/uploads/avatar-")) return;
  //   basename() keeps file name as it never points outside uploads directory
  fs.promises
    .unlink(path.join("uploads", path.basename(image)))
    .catch(() => {});
};

/**
 * Saves a new profile image for the logged-in user and delete their old one
 * @route POST /api/users/me/avatar
 * @access Logged In
 * @param {object} req - req.user is set by auth; the image file comes in the form field "avatar"
 * @param {object} res - sends 200 with {image} the new path and 400 if no file,wrong type or over 25mb or server error
 */
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
        .json({ msg: "Please Select a JPG, PNG or WebP Image" });
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

/**
 * Removes the logged-in user's profile image
 * @route DELETE /api/users/me/avatar
 * @access Logged In
 * @param {object} req - req.user is set by auth
 * @param {object} res - sends 200 with {image:null} or 500 on server error
 */
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
