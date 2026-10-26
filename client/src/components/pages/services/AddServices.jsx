import { useState } from "react"; // import use state
import { useNavigate } from "react-router-dom";
// import the useServicesAdd hook from the context
import { useServicesAdd } from "../../../context/GarageContext";

// Bring in the custom validation
import { alpha, is_Empty, isValidFee } from "../../../utils/validation";

// bring in icon from react icon
import { FaPlus } from "react-icons/fa";

export default function AddServices() {
  //  build the state from our form and set intial state
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

  // runs when the fomr is submited
  const handleSubmit = (e) => {
    // By default the submit button will refresh page
    e.preventDefault();
    // Check the function is being invoked
    console.log(`handleSubmit -> AddServices.jsx ->> Running`);

    //  Check for errors
    //  todo:Client side validation- LATER
    // Name errors
    if (is_Empty(name)) {
      console.log("Service Name Field is Empty");
      setFormData({
        ...formData,
        errors: {
          name: "You are required to enter the name of service in the box above.",
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
          name: "Your service name cannot include any special characters. Alpha Characters only",
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
          type: "You are required to enter a type for this service in the box above.",
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
          type: "Your service type cannot include any special characters. Alpha Characters only",
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
          description:
            "You are required to enter a description of service in the box above.",
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
          description:
            "Your description cannot include any special characters. Alpha Characters only",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { description: "" } });
    }
    // image error
    let defaultImage = "https://img.icons8.com/?size=512w&id=44471&format=png";
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
      console.log("Fee is Empty");
      setFormData({
        ...formData,
        errors: {
          fee: "You are required to enter a fee in the box above.",
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
        errors: { fee: "Fee is required to be greater than value of 0" },
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
          fee: "Fee is required be formatted in number with two decimal places",
        },
      });
      return;
    } else {
      setFormData({ ...formData, errors: { fee: "" } });
    }

    // create newService object using es6 shorthand
    // crypto.randomUUID is built in so no libary required
    const newService = {
      name,
      type,
      description,
      image: defaultImage,
      fee,
    };

    console.log(newService);
    // send the new product to our state then redirect
    addService(newService);
    navigate("/services");
  };

  return (
    <>
      <title>Add a Car Service</title>
      <h1 className="mmy-6 flex item-center gap-2 text-3xl font-bold text-red-600">
        <FaPlus />
        Add A new Car Service
      </h1>
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
            {/* Service Desciption field */}
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
            <div className="mb-4">
              <label className="form-label" htmlFor="image">
                Service Image URL:
              </label>
              <input
                className={`form-input ${errors.image ? "is-invalid" : "is-valid"}`}
                type="text"
                id="image"
                placeholder="https://mycarservicebg.net.url/"
                name="image"
                value={image}
                onChange={(e) => onChange(e)}
              />
              {errors.image && (
                <div className="invalid-feedback">{errors.image}</div>
              )}
            </div>
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
              <input type="submit" value="Add Service" className="btn-info" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
