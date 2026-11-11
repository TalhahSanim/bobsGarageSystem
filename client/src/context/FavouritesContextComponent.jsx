// File -> client/src/context/FavouritesContextComponent.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0
// The Favourites Provider -> Loads the logged in user's favourites
// and adds or remove them through the API

import { useState, useEffect } from "react";
import axios from "axios";
import { FavouritesContext } from "./FavouritesContext";
import { useAuth } from "./AuthContext";
import { API_URL } from "../utils/api";

const favouritesURL = `${API_URL}/favourites`;

// FavouritesContextProvider component -> must be inside AuthContextProvider -> as it uses useAuth
export default function FavouritesContextProvider({ children }) {
  const { isAuth } = useAuth();
  const [favourites, setFavourites] = useState([]);

  // Load users favourites when they log in and empty the list when they log out
  useEffect(() => {
    // Fet the logged in user's favourites from API
    const loadFavourites = async () => {
      try {
        const res = await axios.get(favouritesURL);
        setFavourites(res.data);
      } catch (err) {
        console.log("loadFavourites failed", err.message);
      }
    };

    if (isAuth) {
      loadFavourites();
    } else {
      setFavourites([]);
    }
  }, [isAuth]);

  // Is this service one of my favourite -> takes in serviceId and returns true or false
  const isFavourite = (serviceId) =>
    favourites.some((favourites) => favourites.serviceId === serviceId);

  // Add a favourite and it takes a serviceId and returns server's take you response
  const addFavourite = async (serviceId) => {
    const res = await axios.post(`${favouritesURL}/${serviceId}`);
    // place it on top of list and never twice
    setFavourites((prev) => [
      res.data.favourite,
      ...prev.filter((favourites) => favourites.serviceId !== serviceId),
    ]);
    return res.data.msg;
  };

  // Remove a favourite and it takes a serviceId
  const removeFavourite = async (serviceId) => {
    await axios.delete(`${favouritesURL}/${serviceId}`);
    setFavourites((prev) =>
      prev.filter((favourites) => favourites.serviceId !== serviceId),
    );
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, isFavourite, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}
