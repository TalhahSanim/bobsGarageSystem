// File -> client/src/context/ThemeContextComponent.jsx
// The preferences provider -> theme , font-size and sort order
// Saved in localStorage for guest and in the database for logged in users

import { useState, useEffect } from "react";
import axios from "axios";
import { ThemeContext } from "./ThemeContext";
import { useAuth } from "./AuthContext";

const preferenceURL = "http://localhost:3000/api/preferences";

// ThemeContextProvider component which is required to be inside  AuthContextProvider as it uses useAuth
export default function ThemeContextComponent({ children }) {
  const { isAuth } = useAuth();
  // Start with saved values or default
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );
  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem("fontSize") || "medium",
  );
  // same sort key is used so noone uses their choice
  const [sortOrder, setSortOrder] = useState(
    () => localStorage.getItem("sort") || "default",
  );

  // When the preference changes -> put it on <html> and remember it in localStorage
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.font = fontSize;
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    localStorage.setItem("sort", sortOrder);
  }, [theme, fontSize, sortOrder]);

  // when user logged in then load their saved preferences from the database
  useEffect(() => {
    if (isAuth) {
      // Get logged in users preferences
      const loadPreferences = async () => {
        try {
          const res = await axios.get(preferenceURL);
          setTheme(res.data.theme);
          setFontSize(res.data.fontSize);
          setSortOrder(res.data.sortOrder);
        } catch (err) {
          console.log("loadPreferences failed", err.message);
        }
      };
      loadPreferences();
    }
  }, [isAuth]);

  // Save preference change which take in {theme , {fontSize} and or {sortOrder}
  //  Changes the screen right away then saves to the database if logged in
  const savePreference = async (changes) => {
    // Change the them
    if (changes.theme) setTheme(changes.theme);
    if (changes.fontSize) setFontSize(changes.fontSize);
    if (changes.sortOrder) setSortOrder(changes.sortOrder);
    if (isAuth) {
      try {
        await axios.put(preferenceURL, changes);
      } catch (err) {
        console.log("savePreference failed", err.message);
      }
    }
  };

  // Change theme which takes in light and dark values
  const changeTheme = (name) => savePreference({ theme: name });
  // Change font size which takes in small, medium or large
  const changeFontSize = (size) => savePreference({ fontSize: size });
  // Change sort order which takes in for example fee-ASC
  const changeSort = (order) => savePreference({ sortOrder: order });

  return (
    <ThemeContext.Provider
      value={{
        theme,
        fontSize,
        sortOrder,
        changeTheme,
        changeFontSize,
        changeSort,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
