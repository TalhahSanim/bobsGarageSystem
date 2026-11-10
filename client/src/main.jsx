// File -> client/src/main.jsx
// Author -> Talhah Sanim
// Application Version -> 1.0

// runs the app and puts app around all context providers and flowbites theme

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider as FlowbiteTheme } from "flowbite-react";
import flowbiteTheme from "./flowbiteTheme.js";
// The auth provider so every component finds out who is logged in
import { AuthContextProvider } from "./context/AuthContextComponent.jsx";
import { UsersContextProvider } from "./context/UsersContextComponent.jsx";
import { AdminContextProvider } from "./context/AdminContextComponent.jsx";
import ThemeContextProvider from "./context/ThemeContextComponent.jsx";
import { FavouritesContextProvider } from "./context/FavouritesContextComponent.jsx";
import { GarageContextProvider } from "./context/GarageContextComponent.jsx";
import EnquiriesContextProvider from "./context/EnquiriesContextComponent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FlowbiteTheme theme={flowbiteTheme}>
      <AuthContextProvider>
        <ThemeContextProvider>
          <FavouritesContextProvider>
            <UsersContextProvider>
              <AdminContextProvider>
                <GarageContextProvider>
                  <EnquiriesContextProvider>
                    <App />
                  </EnquiriesContextProvider>
                </GarageContextProvider>
              </AdminContextProvider>
            </UsersContextProvider>
          </FavouritesContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </FlowbiteTheme>
  </StrictMode>,
);
