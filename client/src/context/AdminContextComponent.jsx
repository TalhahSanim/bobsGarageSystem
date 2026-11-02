//  The admin provider ->  List of uploade images and function to upload
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

  // upload an image file to the sserver and takes in a file and rutrns {ok,msg}
  const uploadImage = async (file) => {
    // multer reads mulipart/form-data so send file in FormData
    const formData = new FormData();
    formData.append("name", file.name);
    formData.append("file", file);
    try {
      await axios.post(`${adminURL}/uploadImage`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      //  refresh the list  so new image can be slected straight away
      await loadImages();
      return { ok: true, msg: "Image Upload Successful" };
    } catch (err) {
      console.log("uploadImage failed", err.message);
      return { ok: false, msg: "Image Upload Failed" };
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
