// File -> client/src/components/pages/services/AddServices.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Add Services Page [ADMIN] -> form with client-side validation  that adds a new service

import { useState } from "react"; // import use state
import { useNavigate } from "react-router-dom";
// import the useServicesAdd hook from the context
import { useServicesAdd } from "../../../context/GarageContext";

import ServiceImageField from "./ServiceImageField";

// Bring in the custom validation
import { alpha, is_Empty, isValidFee } from "../../../utils/validation";

// bring in icon from react icon

export default function AddServices() {
  //  build the state from our form and set initial state
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    description: "",
    image: "",
    fee: 0.0,
    errors: {},
  });

  // Destructure data of form
  const { name, type, description, image, fee, errors } = formData;

  // make use of navigate hook
  const navigate = useNavigate();

  // utilise the useServicesAdd hook
  const addService = useServicesAdd();

  // controlled component
  const onChange = (e) => {
    // e.target.name = one of formData.properties
    // e.target.value = the new value in input box
    // spread operator '...' to get the current state
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // runs when the form is submitted
  const handleSubmit = async (e) => {
    // By default the submit button will refresh page
    e.preventDefault();
    // Check the function is being invoked
    console.log(`handleSubmit -> AddServices.jsx ->> Running`);

    // Check every field and collect all issues to let user see all at once
    const errors = {};

    // name -> required and letters only
    if (is_Empty(name)) errors.name = "Name Is Required";
    else if (alpha(name)) errors.name = "Name Can Only Contain Letters";

    // type -> required and letters only
    if (is_Empty(type)) errors.type = "Type Is Required";
    else if (alpha(type)) errors.type = "Type Can Only Contain Letters";

    // description -> required and letters only
    if (is_Empty(description)) errors.description = "Description Is Required";
    else if (alpha(description))
      errors.description = "Description Can Only Contain Letters";

    // fee -> required and more than 0 and two decimal places
    if (is_Empty(fee)) errors.fee = "Fee Is Required";
    else if (fee <= 0) errors.fee = "Fee Must Be More Than 0";
    else if (!isValidFee)
      errors.fee = "Fee Must Be Number With Two Decimal Places";

    // Any issues -> display them and stop. Object keys lists the fields that failed
    if (Object.keys(errors).length > 0) {
      setFormData({ ...formData, errors });
      return;
    }

    // Image is optional -> an empty one uses the fallback image on the card
    const defaultImage = is_Empty(image) ? "" : image;
    // create newService object using es6 shorthand
    // crypto.randomUUID is built in so no library required
    const newService = {
      name,
      type,
      description,
      image: defaultImage,
      fee,
    };

    console.log(newService);
    // send the new service to the api and only leave if saved
    const saved = await addService(newService);
    if (saved) {
      // Back to list and ask it to display a message
      navigate("/services", {
        state: { toast: `${newService.name} Was Added` },
      });
    } else {
      setFormData({
        ...formData,
        errors: {
          name: "Could Not Save This Service. Please Try Again",
        },
      });
    }
  };

  return (
    <>
      <title>Add Service - Bob's Garage</title>

      <div className="panel">
        <h1 className="panel-header">Add Service:</h1>
        <div className="panel-body">
          {/* Form */}
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* Name Field */}
            <div className="mb-4">
              <label className="form-label" htmlFor="name">
                Service Name:
              </label>
              {/* Controlled input comes from state and onChange updates it */}
              <input
                className={`form-input ${errors.name ? "is-invalid" : ""}`}
                type="text"
                id="name"
                placeholder="New Service Name"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            {/* Service Type */}
            <div className="mb-4">
              <label className="form-label" htmlFor="type">
                Service Type:
              </label>
              <input
                className={`form-input ${errors.type ? "is-invalid" : ""}`}
                type="text"
                id="type"
                placeholder="New Service Type"
                name="type"
                value={type}
                onChange={(e) => onChange(e)}
              />
              {errors.type && (
                <div className="invalid-feedback">{errors.type}</div>
              )}
            </div>
            {/* Service Description field */}
            <div className="mb-4">
              <label className="form-label" htmlFor="description">
                Service Description:
              </label>
              <input
                className={`form-input ${errors.description ? "is-invalid" : ""}`}
                type="text"
                id="description"
                placeholder="New Service Description"
                name="description"
                value={description}
                onChange={(e) => onChange(e)}
              />
              {errors.description && (
                <div className="invalid-feedback">{errors.description}</div>
              )}
            </div>
            {/* Image */}
            <ServiceImageField
              image={image}
              error={errors.image}
              onImageChange={(value) =>
                setFormData((prev) => ({ ...prev, image: value }))
              }
            />
            {/* serviceFee */}
            <div className="mb-4">
              <label className="form-label" htmlFor="fee">
                Service Fee:
              </label>
              <input
                className={`form-input ${errors.fee ? "is-invalid" : ""}`}
                type="text"
                id="fee"
                placeholder="120.99"
                name="fee"
                value={fee}
                onChange={(e) => onChange(e)}
              />
              {errors.fee && (
                <div className="invalid-feedback">{errors.fee}</div>
              )}
            </div>
            {/* Submit button */}
            <div className="grid">
              <input
                type="submit"
                value="Add Service"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
