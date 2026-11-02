// Creates the admin context -> uploaded images  and hook to use it
import { createContext, useContext } from "react";

// Holds {imageList,loadImages , uploadImage}
export const AdminContext = createContext();

// Custom hook -> the image list and upload functionalty
export const useAdmin = () => useContext(AdminContext);
