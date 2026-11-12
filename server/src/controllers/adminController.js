// File -> server/src/controllers/adminController.js
// Author -> Talhah Sanim
// Application Version -> 1.0

// Admin image controller -> uploadImage
// routes/admin.js adds auth, admin and multer uploads in front

/**
 * Saves one uploaded image and sends back its path
 * @route POST /api/admin/uploadImage
 * @access Admin
 * @param {object} req - req.file is the image multer saved from the form field "file"
 * @param {object} res - sends 200 with {msg, image} the /uploads or 400 if no image was sent
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
