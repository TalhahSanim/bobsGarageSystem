// File -> server/src/controllers/adminController.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// Admin image controllers -> uploadImage and getImageList
// routes/admin.js adds auth, admin and multer uploads in front
import fs from "fs";

/**
 * Saves one uploaded image and sends back its path
 * @route POST /api/admin/uploadImage
 * @access Admin
 * @param {object} req - req.file is the image multer saved from the form field "file"
 * @param {object} res - sends 200 with {msg, image} the /uploads or 400 if no image was sent
 * @returns
 */
export const uploadImage = (req, res) => {
  console.log("/api/admin/uploadImage -> POST");
  // No File -> none was selected or file filter has skipped ove due to being non image file
  if (!req.file) {
    return res.status(400).json({
      msg: "Please Select a JPG, PNG or WebP Image",
    });
  }
  res
    .status(200)
    .json({ msg: "Image Uploaded", image: `/uploads/${req.file.filename}` });
};

/**
 * Lists the uploaded image file names and leaving out profile images
 * @route GET /api/admin/getImageList
 * @access Admin
 * @param {object} req - the request and nothing read from it
 * @param {object} res - sends 200 with the file names or 500 if uploads folder cannot be read
 */

export const getImageList = async (req, res) => {
  console.log("/api/admin/getImageList -> GET");
  try {
    const files = await fs.promises.readdir("./uploads");

    // Skip profile images as they belong to user and should only see service image

    res.status(200).send(files.filter((file) => !file.startsWith("avatar-")));
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};
