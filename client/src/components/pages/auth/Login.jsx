// Login page -> email and password form logs in with AuthContext
import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// login from our auth context
import { useAuth } from "../../../context/AuthContext";
// validation helper
import { is_Empty } from "../../../utils/validation";

export default function Login() {
  // setup state for login form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    errors: {},
  });

  // Destructure state for the login form
  const { email, password, errors } = formData;

  // login from our auth context and navigate to move pages after logging in
  const { login } = useAuth();
  const navigate = useNavigate();

  //  update field that changed the input's name equals the key in form data
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // runs when form submit: check field then proceed loggin in
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit Function -> Login.jsx");

    // validation
    if (is_Empty(email)) {
      setFormData({ ...formData, errors: { email: "Email is required" } });
      return;
    }
    if (is_Empty(password)) {
      setFormData({
        ...formData,
        errors: { password: "password is required" },
      });
      return;
    }
    // login and if fails show servers message under email box
    const result = await login(email, password);
    if (result.ok) {
      navigate("/services");
    } else {
      setFormData({ ...formData, errors: { email: result.msg } });
    }
  };
  return (
    <Fragment>
      <h1 className="my-6 text-3xl font-bold text-blue-600">System Login</h1>
      <div className="panel">
        <div className="panel-header">Login</div>
        <div className="panel-body">
          {/* Form */}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              {/* Email Field */}
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                className={`form-input ${errors.email ? "is-invalid" : "is-valid"}`}
                id="email"
                placeholder="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            {/* Password Field */}
            <div className="mb-4">
              <label className="form-label" htmlFor="password">
                password
              </label>
              <input
                type="password"
                className={`form-input ${errors.password ? "is-invalid" : "is-valid"}`}
                id="password"
                placeholder="password"
                name="password"
                value={password}
                onChange={(e) => onChange(e)}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mb-4 grid">
              <input type="submit" value="Login" className="btn btn-primary" />
            </div>
            {/* link to the register auth page */}
            <p className="mt-4">
              No Account?
              <Link className="link-pill" to="/register">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
