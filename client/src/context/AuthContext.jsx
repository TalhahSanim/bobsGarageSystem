// File -> client/src/context/AuthContext.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// Creates the auth context and a custom hook to use it

import { createContext, useContext } from "react";

// Hold the logged in user , isAUth,isAdmin, status, error, and the auth functions
export const AuthContext = createContext();

// Custom hook give a component for everything about the logged in user
export const useAuth = () => useContext(AuthContext);
