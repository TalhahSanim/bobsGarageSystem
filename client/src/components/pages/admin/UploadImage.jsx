//Admin -> pick image file and upload to server
import { useState } from "react";
import { useAdmin } from "../../../context/AdminContext";

// uploadImage component -> sends an image file to server
export default function UploadImage() {
  // state for the selected file and for a message
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");
  const { uploadImage } = useAdmin();

  // Runs when file is selected-> kepp first file and clear message
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setMessage("");
  };

  // runs when form submits-> send the first files and clear the message
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage("Please select an image first");
      return;
    }
    const result = await uploadImage(selectedFile);
    setMessage(result.msg);
  };

  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-blue-600">
        Upload an Image
      </h2>
      <div className="panel">
        <div className="panel-header">Select an image to Uplaod:</div>
        <div className="panel-body">
          <form onSubmit={(e) => handleUpload(e)} encType="mulipart/form-data">
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
                className="block w-full rounded-md border border-gray-300 text-sm text-gray-600 file:mr-4 file:cursor-pointer file:border-0 file:bg-garage file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-garage-dark"
              />
              {message && (
                <p className="mt-2 text-sm text-gray-700">{message}</p>
              )}
            </div>
            <div className="grid">
              <input type="submit" value="Upload Image" className="btn-info" />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
