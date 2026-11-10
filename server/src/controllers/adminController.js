// Admin image controllers -> uploadImage and getImageList
// routes/admin.js adds auth, admin and multer uploads in front
import fs from "fs";

// name -> upload image
// path -> /api/admin/uploadImage/
// request => POST
// type -> admin
// description -> multer saves one file from the form field "file" and save it
// Send it back its path to let client save service image
export const uploadImage = (req, res) => {
  console.log("/api/admin/uploadImage -> POST");
  // No File -> none was selected or file filter has skipped ove due to being non image file
  if (!req.file) {
    return res.status(400).json({
      msg: "Please Select a JPG,PNG or WebP Image",
    });
  }
  res
    .status(200)
    .json({ msg: "Image Uploaded", image: `/uploads/${req.file.filename}` });
};

// name -> get image list
// path -> /api/admin/getImageList
// request -> GET
// type -> admin
// description -> reads the uploads folder and sends back the file names a an array

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
