import { useNavigate } from "react-router-dom";
// login from our auth context
import { useAuth } from "../../context/AuthContext";
// validation helper
import { is_Empty } from "../../utils/validation";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // runs when form submit: check field then proceed loggin in
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit Function -> Login.jsx");

    // validation
    if (is_Empty(email)) {
      setFormData({ ...FormData, errors: { email: "Email is required" } });
      return;
    }
    if (is_Empty(password)) {
      setFormData({
        ...FormData,
        errors: { password: "password is required" },
      });
      return;
    }
    // login and if fails show servers message under email box
    const result = await login(email, password);
    if (result.ok) {
      navigate("/services");
    } else {
      setFormData({ ...FormData, errors: { email: result.msg } });
    }
  };
  return <div>Login</div>;
}
