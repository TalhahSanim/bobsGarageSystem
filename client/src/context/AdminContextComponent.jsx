// File -> client/src/context/AdminContextComponent.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

//  The admin provider ->  List of uploaded images and a function to upload
import { useState } from "react";
import axios from "axios";
import { AdminContext } from "./AdminContext";

const adminURL = "http://localhost:3000/api/admin";

//  AdminContextProvider component -> wraps the app so admin pages and home can use useAdmin()
export const AdminContextProvider = ({ children }) => {
  // file name in server uploads
  const [imageList, setImageList] = useState([]);

  //  Get the list of uploaded images -> ADMIN ONLY
  const loadImages = async () => {
    console.log("loadImages -> AdminCOntextComponent.jsx");
    try {
      const res = await axios.get(`${adminURL}/getImageList`);
      setImageList(res.data);
    } catch (err) {
      console.log("loadImages failed", err.message);
    }
  };

  // Upload an image file to server and it takes in a file
  // returns {ok,msg,image} and image is saved path such as /uploads/123-car.jpg
  const uploadImage = async (file) => {
    // multer reads multipart/form-data as we send file inside FormData
    // The name "file" must match upload.single("file") on the server
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post(`${adminURL}/uploadImage`, formData);
      // Refresh the list so new image is available right away
      await loadImages();
      return { ok: true, msg: res.data.msg, image: res.data.image };
    } catch (err) {
      console.log("uploadImage failed", err.message);
      // The servers message if it sent one -> ("images must be 25mb or less")
      return {
        ok: false,
        msg: err.response?.data?.msg || "Could Not Upload The Image",
      };
    }
  };

  return (
    <AdminContext.Provider
      value={{
        imageList,
        loadImages,
        uploadImage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
