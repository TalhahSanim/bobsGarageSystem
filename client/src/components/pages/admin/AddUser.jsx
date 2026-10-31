// Add User page -> form for an admin to add user and optionally asign as admin
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
//  add user from useers context
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

  // Destructure the form datat
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

  // addUser from our users context and navigate to return to the liist after
  const { addUser } = useUsers();
  const navigate = useNavigate();

  // update the field so that changed inputs name mathches key in the form data
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
        errors: { firstName: "First Name is Required" },
      });
      return;
    }

    if (is_Empty(lastName)) {
      setFormData({
        ...formData,
        errors: { lastName: "Last Name is Required" },
      });
      return;
    }

    if (is_Empty(email)) {
      setFormData({
        ...formData,
        errors: { email: "Email is Required" },
      });
      return;
    }

    if (is_Empty(password)) {
      setFormData({
        ...formData,
        errors: { password: "Password is Required" },
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
        errors: { password: "Password do not match!" },
      });
      return;
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
  // helper to enable each filed read same label input and error
  // tkaes in the field name, label, input type and placeholder
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
      <h1 className="mb-4 text-2xl font-bold text-blue-600">Add New User</h1>
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
            {/* Enable admin to assign user to admin privledges */}
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
            {/* Submit button is diabled when saving */}
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
