// Add User page -> form for an admin to add user and optionally assign as admin
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
//  add user from users context
import { useUsers } from "../../../context/UsersContext";
// validation helper
import { is_Empty } from "../../../utils/validation";

// addUser component -> form for admin to create user
export default function AddUser() {
  // set for state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    password: "",
    passwordCompare: "",
    isAdmin: false,
    errors: {},
  });

  // Destructure the form data
  const {
    firstName,
    lastName,
    email,
    image,
    password,
    passwordCompare,
    isAdmin,
    errors,
  } = formData;

  // ste state to show status of saving a new user
  const [registerStatus, setRegisterStatus] = useState("idle");

  // addUser from our users context and navigate to return to the list after
  const { addUser } = useUsers();
  const navigate = useNavigate();

  // update the field so that changed inputs name matches key in the form data
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // only can save if firstname and email and not already saving
  const canSave = firstName !== "" && email !== "" && registerStatus === "idle";

  // runs when form submits which checks every field then add user
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit -> AddUser.jsx");

    // validation

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
        errors: { password: "Passwords Do Not Match!" },
      });
      return;
    }

    if (password.length < 8) {
      setFormData({
        ...formData,
        errors: { password: "Passwords Must Be At Least 8 Characters" },
      });
    }
    if (canSave) {
      setRegisterStatus("pending");
      const result = await addUser({
        firstName,
        lastName,
        email,
        image,
        password,
        isAdmin,
      });
      setRegisterStatus("idle");
      if (result.ok) {
        // back to user list and new user appears
        navigate("/admin/users");
      } else {
        setFormData({ ...formData, errors: { email: result.msg } });
      }
    }
  };
  // helper to enable each field read same label input and error
  // takes in the field name, label, input type and placeholder
  const field = (name, label, type = "text", placeholder = label) => (
    <div className="mb-4">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className={`form-input ${errors[name]} ? "is-invalid: "is-valid"`}
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
      <div className="panel">
        <div className="panel-header">New User</div>
        <div className="panel-body">
          {/* Form */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="grid gap-x-6 md:grid-cols-2">
              {field("firstName", "First Name")}
              {field("lastName", "Last Name")}
            </div>
            {field("email", "Email", "email", "email@example.com")}
            {field("image", "Image", "text", "https://photo.url")}
            <div className="grid gap-x-6 md:grid-cols-2">
              {field("password", "Password", "password")}
              {field("passwordCompare", "Re-enter Password", "password")}
            </div>
            {/* Enable admin to assign user to admin privileges */}
            <label htmlFor="" className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                className="size-4 accent-garage"
                checked={isAdmin}
                onChange={(e) =>
                  setFormData({ ...formData, isAdmin: e.target.checked })
                }
              />
              Assign this user an admin
            </label>
            {/* Submit button is disabled when saving */}
            <div className="mb-4 grid">
              <input
                type="submit"
                value={
                  registerStatus === "pending" ? "Adding..." : "Add new user"
                }
                className="btn-info disabled:opacity-60"
                disabled={registerStatus === "pending"}
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
