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

    //  Check for errors
    // Name errors
    if (is_Empty(name)) {
      console.log("Service Name Field is Empty");
      setFormData({
        ...formData,
        errors: {
          name: "Name Is Required",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { name: "" } });
    }
    // alphanumerical character check for name

    if (alpha(name)) {
      console.log("Service Name contains special characters");
      setFormData({
        ...formData,
        errors: {
          name: "Name Can Only Contain Letters",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { name: "" } });
    }

    // Type error
    if (is_Empty(type)) {
      console.log("Type Field is Empty");
      setFormData({
        ...formData,
        errors: {
          type: "Type Is Required",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { type: "" } });
    }
    // alphanumerical character check for type
    if (alpha(type)) {
      console.log("Service Type contains special characters");
      setFormData({
        ...formData,
        errors: {
          type: "Type Can Only Contain Letters",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { type: "" } });
    }

    // description error
    if (is_Empty(description)) {
      console.log("Description Field is Empty");
      setFormData({
        ...formData,
        errors: {
          description: "Description Is Required",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { description: "" } });
    }
    // alphanumerical character check for description
    if (alpha(description)) {
      console.log("Description contains special characters");
      setFormData({
        ...formData,
        errors: {
          description: "Description Can Only Contain Letters",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { description: "" } });
    }
    // image error
    let defaultImage = "";
    if (is_Empty(image)) {
      console.log(defaultImage);
      setFormData({
        ...formData,
        image: defaultImage,
      });
    } else {
      defaultImage = image;
      console.log(`image: ${defaultImage}`);
    }

    // fee error - not empty great than 0, 2decimal places
    if (is_Empty(fee)) {
      // console.log("Fee is Empty"); // check if empty validation runs
      setFormData({
        ...formData,
        errors: {
          fee: "Fee Is Required",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { fee: "" } });
    }

    if (fee <= 0) {
      console.log("Fee is negative");
      setFormData({
        ...formData,
        errors: { fee: "Fee Must Be More Than 0" },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { fee: "" } });
    }

    if (!isValidFee(fee)) {
      console.log("Fee is invalid");
      setFormData({
        ...formData,
        errors: {
          fee: "Fee Must Be A Number With Two Decimal Places",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { fee: "" } });
    }

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
      navigate("/services");
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
        <div className="panel-header">Car Service:</div>
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
                className={`form-input ${errors.name ? "is-invalid" : "is-valid"}`}
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
                className={`form-input ${errors.type ? "is-invalid" : "is-valid"}`}
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
                className={`form-input ${errors.description ? "is-invalid" : "is-valid"}`}
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
                className={`form-input ${errors.fee ? "is-invalid" : "is-valid"}`}
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
