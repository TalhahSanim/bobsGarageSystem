// Register page -> form creating new account & registers with AuthContext
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// register from our authcontext
import { useAuth } from "../../../context/AuthContext";
// validation helper
import { is_Empty } from "../../../utils/validation";

// Register component for creating a neew account
export default function Register() {
  // setup form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    password: "",
    passwordCompare: "",
    errors: {},
  });

  // Destructure the formData
  const {
    firstName,
    lastName,
    email,
    image,
    password,
    passwordCompare,
    errors,
  } = formData;

  // setup state displaying status of saving a  new user
  const [registerStatus, setRegisterStatus] = useState("idle");

  // register from our auth context and navigate to move pages after
  const { register } = useAuth();
  const navigate = useNavigate();

  // Update field that changed when the input names matches key in formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // were only save if have firstname and email and were not saving
  const canSave = firstName !== "" && email !== "" && registerStatus !== "idle";

  // runs when form submits and check every field then register
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit -> Register.jsx");

    // Validation -> required field then password required to match
    if (is_Empty(firstName)) {
      setFormData({
        ...formData,
        errors: { firstName: "First Name is required" },
      });
      return;
    }
    if (is_Empty(lastName)) {
      setFormData({
        ...formData,
        errors: { lastName: "Last Name is required" },
      });
      return;
    }
    if (is_Empty(email)) {
      setFormData({
        ...formData,
        errors: { email: "Email is required" },
      });
      return;
    }
    if (is_Empty(password)) {
      setFormData({
        ...formData,
        errors: { password: "Password is required" },
      });
      return;
    }
    if (is_Empty(passwordCompare)) {
      setFormData({
        ...formData,
        errors: { passwordCompare: "You have not re-entered your password" },
      });
      return;
    }

    if (password !== passwordCompare) {
      setFormData({
        ...formData,
        errors: { password: "Passwords do not match" },
      });
      return;
    }

    // Register also logs you in too
    if (canSave) {
      setRegisterStatus("pending");
      const result = await register({
        firstName,
        lastName,
        email,
        image,
        password,
      });
      setRegisterStatus("idle");
      if (result.ok) {
        navigate("/services");
      } else {
        setFormData({ ...formData, errors: { email: result.msg } });
      }
    }
  };

  //  helper to ensure field reads same -> {label,input,error}
  // it takes in field name,label, input type aand placeholder
  const field = (name, label, type = "text", placeholder = label) => (
    <div className="mb-4">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className={`form-input ${errors[name] ? "is-invalid" : "is-valid"}`}
        id={name}
        placeholder={placeholder}
        name={name}
        value={formData[name]}
        onChange={(e) => onChange(e)}
      />
      {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
    </div>
  );
  return (
    <Fragment>
      <h1 className="my-6 text-3xl font-bold text-blue-600">
        Register For System
      </h1>
      <div className="panel">
        <div className="panel-header">Register</div>
        <div className="panel-body">
          {/* Form */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="grid gap-x-6 md:grid-cols-2">
              {field("email", "Email", "email", "email@someplace.com")}
              {field("image", "Image", "text", "https://imagelocale.url")}
            </div>
            <div className="grid gap-x-6 md:grid-cols-2">
              {field("password", "Password", "password")}
              {field("passwordCompare", "Re-enter Password", "password")}
            </div>
            {/* Submit- disable when saving */}
            <div className="mb-4 grid">
              <input
                type="submit"
                value={
                  registerStatus === "pending" ? "Registering..." : "Register"
                }
                className="btn-info disabled:opacity-55"
                disabled={registerStatus === "pending"}
              />
            </div>

            {/* Link to login auth page */}
            <p className="mt-4">
              Already Have Account?
              <Link className="link-pill" to="/login">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
