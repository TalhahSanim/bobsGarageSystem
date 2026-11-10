// File -> client/src/context/UsersContext.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

//  The users provider -> the admins list of users and functions to manage them

import { useState } from "react";
import axios from "axios";
import { UsersContext } from "./UsersContext";

const userURL = "http://localhost:3000/api/users";

// Get the servers message from an axios error or general error
const errorMessage = (err) => err.response?.data?.msg || err.message;

// UsersContextProvider Component -> wraps around the app so admin pages can use useUsers()
export const UsersContextProvider = ({ children }) => {
  const [userList, setUserList] = useState([]);
  // status -> idle,loading , succeeded or failed
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  // Get all user [ADMIN ONLY]. Called by the dashboard and not at startup as only admins can see user list
  const loadUsers = async () => {
    console.log("loadUsers -> UsersContextComponent.jsx");
    setStatus("loading");
    try {
      const res = await axios.get(userURL);
      setUserList(res.data);
      setStatus("succeeded");
      setError(null);
    } catch (err) {
      console.log(err.message);
      setStatus("failed");
      setError(errorMessage(err));
    }
  };

  // Find one user in the list which takes in userId (number)
  const getUserById = (id) => userList.find((user) => user.userId === id);

  // Add a user which takes in {firstName,lastName, email,image, password, isAdmin}
  // returns {ok:true} or {ok: false, msg}
  const addUser = async (newUser) => {
    try {
      const res = await axios.post(`${userURL}/add`, newUser);
      setUserList((prev) => [...prev, res.data]);
      return { ok: true };
    } catch (err) {
      console.log(err.message);
      return { ok: false, msg: errorMessage(err) };
    }
  };

  // update a user which takes in the user with their userId
  // returns {ok: true} or {ok:false,msg}

  const updateUser = async (user) => {
    try {
      const res = await axios.put(`${userURL}/edit/${user.userId}`, user);
      // servers send back saved user without password
      setUserList((prev) =>
        prev.map((item) => (item.userId === user.userId ? res.data : item)),
      );
      return { ok: true };
    } catch (err) {
      console.log(err.message);
      return { ok: false, msg: errorMessage(err) };
    }
  };

  // Delete a user which takes in a userId and returns {ok:true} or {ok:false,msg}
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${userURL}/edit/${id}`);
      setUserList((prev) => prev.filter((user) => user.userId !== id));
      return { ok: true };
    } catch (err) {
      console.log(err.message);
      return { ok: false, msg: errorMessage(err) };
    }
  };

  return (
    <UsersContext.Provider
      value={{
        userList,
        status,
        error,
        loadUsers,
        getUserById,
        addUser,
        updateUser,
        deleteUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
