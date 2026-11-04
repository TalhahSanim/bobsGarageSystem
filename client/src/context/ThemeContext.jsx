// File -> client/src/context/ThemeContext.jsx
// Creates the theme context and custom hook to use it

import { createContext, useContext } from "react";

// Holds {theme, changeTheme}
export const ThemeContext = createContext();

// Custom hook -> gives the component the current theme and the changeTheme function
export const useTheme = () => useContext(ThemeContext);
