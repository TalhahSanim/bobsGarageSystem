// File -> client/src/context/AdminContext.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0
// Creates the admin context -> uploaded images  and hook to use it
import { createContext, useContext } from "react";

// Holds {imageList,loadImages , uploadImage}
export const AdminContext = createContext();

// Custom hook -> the image list and upload functionality
export const useAdmin = () => useContext(AdminContext);
