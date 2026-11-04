// Login page -> email and password form logs in with AuthContext
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// login from our auth context
import { useAuth } from "../../../context/AuthContext";
// validation helper
import { is_Empty } from "../../../utils/validation";
import AuthLayout from "../../layout/AuthLayout";

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
      navigate(result.isAdmin ? "/admin" : "/");
    } else {
      setFormData({ ...formData, errors: { email: result.msg } });
    }
  };
  return (
    <AuthLayout
      title="Welcome"
      subtitle="Login to manage active services & enquiries"
    >
      <h1 className="text-3xl">Login</h1>
      <p className="mt-1 mb-6 text-muted">Enter Your Email & Password</p>
      <form onSubmit={(e) => handleSubmit(e)}>
        {/* email field */}
        <div className="mb-4">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            className={`form-input ${errors.email ? "is-invalid" : ""}`}
            id="email"
            placeholder="name@email.com"
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
            Password
          </label>
          <input
            type="password"
            className={`form-input ${errors.password ? "is-invalid" : ""}`}
            id="password"
            placeholder="Enter Your Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        <input type="submit" value="Login" className="btn btn-primary w-full" />

        {/* Register Page Link */}
        <p className="mt-6 text-center text-sm font-normal text-muted">
          No Account?
          <Link className="link-pill" to="/register">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
