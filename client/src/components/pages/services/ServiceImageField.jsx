// File -> client/src/components/pages/services/ServiceImageField.jsx
// The image part of add and edit Service forms.
// Paste a URL, or upload a file from the computer. Either method fills in service's image

import { useState } from "react";
import { useAdmin } from "../../../context/AdminContext";
import { imgSrc } from "../../../utils/imgSrc";

// Takes in the current image value, its error message and a function to change it
export default function ServiceImageField({ image, error, onImageChange }) {
  const { uploadImage } = useAdmin();
  // idle -> uploading -> done or failed and the message to display
  const [upload, setUpload] = useState({ status: "idle", msg: "" });

  // runs when file is selected -> upload it right away and then use its path
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUpload({ status: "uploading", msg: "" });
    const result = await uploadImage(file);
    if (result.ok) {
      onImageChange(result.image);
      setUpload({
        status: "complete",
        msg: "Uploaded. Save the service to keep it",
      });
    } else {
      setUpload({ status: "failed", msg: result.msg });
    }
    // Clear the file selector so selecting the file again still is functional
    e.target.value = "";
  };
  return (
    <div className="mb-4">
      <label className="form-label" htmlFor="image">
        Service Image
      </label>

      {/* Preview -> the uploaded file or the typed URL */}
      {imgSrc(image) && (
        <img
          src={imgSrc(image)}
          alt=""
          className="mb-3 aspect-square w-40 object-cover shadow-sm"
        />
      )}

      {/* Option 1 -> paste a url or see uploaded path */}
      <input
        className={`form-input ${error ? "is-invalid" : ""}`}
        type="text"
        id="image"
        name="image"
        placeholder="https://img.icons8.com/?size=100&id=CeajqgpI2YHP&format=png&color=000000"
        value={image}
        onChange={(e) => onImageChange(e.target.value)}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}

      {/* Option 2 -> upload a image file */}
      <label className="form-label mt-3" htmlFor="imageFile">
        Or upload an image (jpg,png,webp or gif, up to 25mb)
      </label>
      <input
        type="file"
        id="imageFile"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFile}
        disabled={upload.status === "uploading"}
        className="block w-full text-sm text-muted file:mr-2 file:cursor-pointer file:border-0 file:bg-primary file:px-4 file:py-2 file:text-on-primary"
      />

      {/* What happened */}
      {upload.status === "uploading" && (
        <p
          className="mt-2 flex items-center gap-2 text-sm text-muted"
          role="status"
        >
          <span className="spinner" aria-hidden="true"></span> Uploading...
        </p>
      )}
      {upload.status === "complete" && (
        <p className="alert-success mt-2 text-sm" role="status">
          {upload.msg}
        </p>
      )}
      {upload.status === "failed" && (
        <p className="alert-danger mt-2 text-sm" role="status">
          {upload.msg}
        </p>
      )}
    </div>
  );
}
