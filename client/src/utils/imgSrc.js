// File -> client/src/utils/imgSrc.js
// Makes image be something img can use

// Server location where it displays uploaded files

const serverURL = "http://localhost:3000";

// Takes in the image value and returns a full address or null if no image
export const imgSrc = (image) => {
  if (!image) return null;
  //   URL they typed should be used in currently form
  if (image.startsWith("http")) return image;
  //   uploaded image -> "/uploads" which adds servers address
  return `${serverURL}${image}`;
};
