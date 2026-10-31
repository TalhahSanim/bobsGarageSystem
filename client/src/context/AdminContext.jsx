// Creates the admin context -> uploaded images and home page banner and hook to use it
import { createContext, useContext } from "react";

// Holds {imageList,homepageImage,loadImages , uploadImage, changeBanner}
export const AdminContext = createContext();

// Custom hook -> th eimage list, the banner, and the functions to change them
export const useAdmin = () => useContext(AdminContext);
