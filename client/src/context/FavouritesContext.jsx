// File -> client/context/FavouritesContext.jsx
// Creates the favourites context and a custom hook to use it

import { createContext, useContext } from "react";

export const FavouritesContext = createContext();

// Custom hook, the user's favourites and add/ remove/ and check functions
export const useFavourites = () => useContext(FavouritesContext);
