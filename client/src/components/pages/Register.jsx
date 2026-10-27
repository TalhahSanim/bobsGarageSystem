import { useNavigate } from "react-router-dom";
// register from our authcontext
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
// validation helper
export default function Register() {
  // setup state displaying status of saving a user
  const [registerStatus, setRegisterStatus] = useState("idle");

  // register from our auth context and navigate to move pages after
  const { register } = useAuth();
  const navigate = useNavigate();
  return <div>Register</div>;
}
