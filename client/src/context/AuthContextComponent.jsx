// The auth provider logs users in and out and remembers the token
// loads the logged in user when the app starts

import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
// adds or removes the x-auth-token header on each axios request
import setAuthToken from "../utils/setAuthToken"; // ! to be created

const authURL = "http://localhost:3000/api/auth";

// AuthCOntextProvider component wraps the app on every component can useAuth()
export const AuthContextProvider = ({ children }) => {
  // if token saved we started in loading till its checked
  const [auth, setAuth] = useState({
    user: null,
    isAuth: false,
    isAdmin: false,
    status: localStorage.getItem("token") ? "loading" : "idle",
    error: null,
  });

  // save the logged in user into state
  const setUser = (user) => {
    setAuth({
      user,
      isAuth: true,
      isAdmin: user.isAdmin,
      status: "succeeded",
      error: null,
    });
  };

  //  forget user then remove the token form localStorage and from axios
  // takes in optional error message to display
  const clearUser = (error = null) => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setAuth({
      user: null,
      isAuth: false,
      isAdmin: false,
      status: "idle",
      error,
    });
  };

  //  Load the logged in user from the API [GET /api/auth reads the token header]
  // Returns true if it worked and false when failed
  const loadUser = async () => {
    try {
      const res = await axios.get(authURL);
      setUser(res.data);
      return res.data;
    } catch (err) {
      // token missing, expired or invalid [WIll be created ]

      console.log("loadUser failed", err.message);
      clearUser("Could Not Load Your Details. Please Log in Again ");
      return false;
    }
  };

  //  save the token and add it to axios and then load user which returns true when successfully working
  const saveToken = async (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
    return await loadUser();
  };

  //  Login which takes an email and password
  // returns {ok: true} or {ok:false,msg} to let form display error
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${authURL}/login`, { email, password });
      const user = await saveToken(res.data.token);
      return user
        ? { ok: true, isAdmin: user.isAdmin }
        : { ok: false, msg: "Logged In, But Could Not Load Your Details" };
    } catch (err) {
      const msg =
        err.response?.data?.msg || "Could Not Login. Please Try Again";
      clearUser(msg);
      return { ok: false, msg };
    }
  };

  // Register a new user which takes in {firstName, LastName, email, image,password}
  // returns {ok:true} or {ok:false,msg}

  const register = async (newUser) => {
    try {
      const res = await axios.post(`${authURL}/register`, newUser);
      const loaded = await saveToken(res.data.token);
      return loaded
        ? { ok: true }
        : { ok: false, msg: "Registered, But Could Not Load Your Details" };
    } catch (err) {
      const msg =
        err.response?.data?.msg || "Could Not Register. Please Try Again";
      clearUser(msg);
      return { ok: false, msg };
    }
  };

  // Log out and forget token and the user
  const logout = () => {
    console.log("logout -> AuthContextComponent.jsx");
    clearUser();
  };

  // upload a new profile image and takes in the file and returns {ok,msg} for profile page
  const avatarUpload = async (file) => {
    // multer reads  multipart/form-data so send the file in a FormData
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/me/avatar",
        formData,
      );
      // Change just the image in the saved user and keep the rest
      setAuth((prev) => ({
        ...prev,
        user: { ...prev.user, image: res.data.image },
      }));
      return { ok: true, msg: "Profile Image Updated" };
    } catch (err) {
      return {
        ok: false,
        msg: err.response?.data?.msg || "Could Not Upload Your Image",
      };
    }
  };

  // Remove profile image back to profile placeholder image icon
  const avatarRemove = async () => {
    try {
      await axios.delete("http://localhost:3000/api/users/me/avatar");
      setAuth((prev) => ({ ...prev, user: { ...prev.user, image: null } }));
    } catch (err) {
      console.log("avatarRemove failed", err.message);
    }
  };

  // When app starts if we save token use it to load the user to stay logged in upon refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      loadUser();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{ ...auth, login, register, logout, avatarUpload, avatarRemove }}
    >
      {children}
    </AuthContext.Provider>
  );
};
