// File -> client/src/utils/imgSrc.js
// Author -> Talhah Sanim
// Application Version -> 1.0
// Makes image be something img can use

import { SERVER_URL } from "./api";

// Server location where it displays uploaded files

const serverURL = SERVER_URL;

// Takes in the image value and returns a full address or null if no image
export const imgSrc = (image) => {
  if (!image) return null;
  //   URL they typed should be used in currently form
  if (image.startsWith("http")) return image;
  //   uploaded image -> "/uploads" which adds servers address
  return `${serverURL}${image}`;
};
