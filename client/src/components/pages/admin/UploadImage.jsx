// File -> client/src/components/pages/admin/UploadImage.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

//Admin -> pick image file and upload to server
import { useState } from "react";
import { useAdmin } from "../../../context/AdminContext";

// uploadImage component -> sends an image file to server
export default function UploadImage() {
  // state for the selected file and for a message
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const { uploadImage } = useAdmin();

  // Runs when file is selected-> keep first file and clear message
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage("");
  };

  // runs when form submits-> send the first files and clear the message
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage("Please Select An Image First");
      return;
    }
    const result = await uploadImage(selectedFile);
    setMessage(result.msg);
  };

  return (
    <section>
      <title>Upload Image - Bob's Garage</title>
      <div className="panel">
        <h1 className="panel-header">Select an image to Upload:</h1>
        <div className="panel-body">
          <form onSubmit={(e) => handleUpload(e)} encType="multipart/form-data">
            <div className="mb-4">
              <label className="form-label" htmlFor="selectedFile">
                Select image to upload
              </label>
              {/* File input-> the file and classes style select file button */}
              <input
                type="file"
                accept="image/*"
                id="selectedFile"
                onChange={(e) => handleFileChange(e)}
                className="block w-full border border-line text-sm text-muted file:mr-4 file:cursor-pointer file:border-0 file:bg-button file:px-4 file:py-2 file:font-medium file:text-on-primary hover:file:bg-button-hover"
              />
              {message && <p className="mt-2 text-sm text-muted">{message}</p>}
            </div>
            <div className="grid">
              <input
                type="submit"
                value="Upload Image"
                className="btn btn-info"
              />
            </div>
          </form>
        </div>
      </div>
      <h2>This Page is Under Development</h2>
    </section>
  );
}
