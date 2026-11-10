// File -> client/src/components/pages/auth/Register.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Register page -> form creating new account & registers with AuthContext
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// register from our authcontext
import { useAuth } from "../../../context/AuthContext";
// validation helper
import AuthLayout from "../../layout/AuthLayout";
import { is_Empty } from "../../../utils/validation";

// Register component for creating a new account
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

  // were only save if have firstName and email and were not saving
  const canSave = firstName !== "" && email !== "" && registerStatus === "idle";

  // runs when form submits and check every field then register
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit -> Register.jsx");

    // Validation -> required field then password required to match
    if (is_Empty(firstName)) {
      setFormData({
        ...formData,
        errors: { firstName: "First Name Is Required" },
      });
      return;
    }
    if (is_Empty(lastName)) {
      setFormData({
        ...formData,
        errors: { lastName: "Last Name Is Required" },
      });
      return;
    }
    if (is_Empty(email)) {
      setFormData({
        ...formData,
        errors: { email: "Email Is Required" },
      });
      return;
    }
    if (is_Empty(password)) {
      setFormData({
        ...formData,
        errors: { password: "Password Is Required" },
      });
      return;
    }
    if (is_Empty(passwordCompare)) {
      setFormData({
        ...formData,
        errors: { passwordCompare: "Please Confirm Your Password" },
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

    if (password.length < 8) {
      setFormData({
        ...formData,
        errors: { password: "Passwords Must Be At Least 8 Characters" },
      });
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
  // it takes in field name,label, input type and placeholder
  const field = (name, label, type = "text", placeholder = label) => (
    <div className="mb-4">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className={`form-input ${errors[name] ? "is-invalid" : ""}`}
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
    <AuthLayout
      title="Join Bob's Garage Today"
      subtitle="Save Services and Enquiries and Replies Land directly at you"
    >
      <h1 className="text-3xl">Create An Account</h1>
      <p className="mt-1 mb-6 text-muted">Enter your details to register</p>
      {/* Form */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="grid gap-x-6 md:grid-cols-2">
          {field("firstName", "First Name")}
          {field("lastName", "Last Name")}
        </div>
        {field("email", "Email", "email", "email@someplace.com")}
        {field("image", "Image", "text", "https://imagelocale.url")}
        {field("password", "Password", "password")}
        {field("passwordCompare", "Re-enter Password", "password")}
        {/* Submit- disable when saving */}
        <div className="mb-4 grid">
          <input
            type="submit"
            value={registerStatus === "pending" ? "Registering..." : "Register"}
            className="btn btn-primary mt-2 w-full "
            disabled={registerStatus === "pending"}
          />
        </div>

        {/* Link to login auth page */}
        <p className="mt-6 text-center text-sm font-normal text-muted">
          Already Have Account?
          <Link className="link-pill" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
