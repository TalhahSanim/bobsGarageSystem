// File -> client/src/components/pages/services/EditService.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Edit Services Page [ADMIN] -> Loads a service into the form and saves the changes

// import useState and  useEffect from react
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Bring in useServicesUpdate and useGetServicesById
import {
  useServicesUpdate,
  useGetServiceById,
} from "../../../context/GarageContext";

import ServiceImageField from "./ServiceImageField";

// Bring in the custom validation
import { alpha, is_Empty, isValidFee } from "../../../utils/validation";

//  EditService component : form for updating our service
export default function EditService() {
  // pull the id from url bar
  const { id } = useParams();
  console.log(id);

  //  build the state from our form and set initial state
  const [formData, setFormData] = useState({
    serviceId: "",
    name: "",
    description: "",
    type: "",
    image: "",
    fee: "",
    errors: {},
  });

  // make use of navigate hook
  const navigate = useNavigate();

  // use the new contexts hook
  const updateService = useServicesUpdate();
  const getServiceById = useGetServiceById();

  // Destructure data of form
  const { serviceId, name, type, description, image, fee, errors } = formData;

  // controlled component
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // runs when the form is submitted
  const handleSubmit = async (e) => {
    // By default the submit button will refresh page
    e.preventDefault();
    // Check the function is being invoked
    console.log(`handleSubmit -> EditService.jsx ->> Running`);
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

    const updService = {
      serviceId,
      name,
      description,
      type,
      image: defaultImage,
      fee,
    };
    console.log(updService);
    // send updated service to the API. only leave if it is saved
    const saved = await updateService(updService);
    if (saved) {
      navigate("/services");
    } else {
      setFormData({
        ...formData,
        errors: {
          name: "Could Not Save Your Changes. Please Try Again",
        },
      });
    }
  };
  useEffect(() => {
    const loadService = async () => {
      const service = await getServiceById(Number(id));
      if (service) {
        setFormData({
          serviceId: service.serviceId,
          name: service.name,
          type: service.type,
          description: service.description,
          image: service.image,
          fee: service.fee,
          errors: {},
        });
      }
    };
    loadService();
  }, [id]);

  return (
    <>
      <title>Edit Service - Bob's Garage</title>

      <div className="panel">
        <h1 className="panel-header">Edit Service</h1>
        <div className="panel-body">
          {/* Form */}
          <form onSubmit={(e) => handleSubmit(e)}>
            {/* Name Field */}
            <div className="mb-4">
              <label className="form-label" htmlFor="name">
                Edit Service Name:
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
                Edit Service Type:
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
                Edit Service Description:
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
                Edit Service Fee:
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
                value="Update Service"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
