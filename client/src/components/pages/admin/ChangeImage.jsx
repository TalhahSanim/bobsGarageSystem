// Admin -> select one of uploaded images as homepage banner

import { useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
// changeImage Component -> select the homepage banner image
export default function ChangeImage() {
  const { imageList, changeBanner } = useAdmin();
  // The image selected in the dropdown
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  // runs when different image is selected in dropdown
  const handleChange = (e) => {
    setImage(e.target.value);
    setMessage("");
  };

  // Runs when change image is clicked and set as banner
  const changeFile = async (e) => {
    e.preventDefault();
    const result = await changeBanner(image);
    setMessage(result.msg);
  };

  return (
    <section>
      <div className="mb-4">
        <label className="form-label" htmlFor="fileList">
          Select an Image:
        </label>
        {/* Dropdown for uploaded image */}
        <select
          id="fileList"
          value={image}
          onChange={(e) => handleChange(e)}
          className="form-input bg-white"
        >
          <option value="">----- Please Select and Image -----</option>
          {imageList.map((imageName) => (
            <option key={imageName} value={imageName}>
              {imageName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h2 className="mb-2 text-xl font-semibold">Replace Banner</h2>
        <p className="mb-4">Selected Image: {image || "none"}</p>
        {/* image preview of selected image */}
        {image && (
          <img
            src={`http://localhost:3000/uploads/${image}`}
            alt="Preview od the selected banner"
            className="mb-4 h-40 w-full rounded-lg object-cover"
          />
        )}
        <div className="grid">
          <button
            type="button"
            className="btn-info"
            onClick={(e) => changeFile(e)}
            disabled={!image}
          >
            Change Image
          </button>
        </div>
        {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
      </div>
    </section>
  );
}
