// File -> client/src/context/ThemeContextComponent.jsx
// The theme provider -> stores the theme and puts them on <html> and saves it in localStorage

import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";

// ThemeContextProvider component -> wraps around the app so every component can read or change theme

export const ThemeContextProvider = ({ children }) => {
  // Start with saved theme or light if nothing saved
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  //   When ever the theme chnages put it on <html> and remember it
  useEffect(() => {
    // put the them changes and put it on <html>  so the css variables change for the whole page
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  //   Change the theme and it takes in the theme name like light or dark
  const changeTheme = (name) => {
    console.log("changeTheme -> ThemeContextCOmponent", name);
    setTheme(name);
  };

  return (
    <ThemeContext.provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.provider>
  );
};
