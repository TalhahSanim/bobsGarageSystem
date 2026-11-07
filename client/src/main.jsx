import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// The auth provider so every component finds out who is logged in
import { AuthContextProvider } from "./context/AuthContextComponent.jsx";
import { UsersContextProvider } from "./context/UsersContextComponent.jsx";
import { AdminContextProvider } from "./context/AdminContextComponent.jsx";
import ThemeContextProvider from "./context/ThemeContextComponent.jsx";
import { FavouritesContextProvider } from "./context/FavouritesContextComponent.jsx";
import { GarageContext } from "./context/GarageContext.jsx";
import { GarageContextProvider } from "./context/GarageContextComponent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ThemeContextProvider>
        <FavouritesContextProvider>
          <UsersContextProvider>
            <AdminContextProvider>
              <GarageContextProvider>
                <App />
              </GarageContextProvider>
            </AdminContextProvider>
          </UsersContextProvider>
        </FavouritesContextProvider>
      </ThemeContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
