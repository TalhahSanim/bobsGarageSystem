import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// The auth provider so every component finds out who is logged in
import { AuthContextProvider } from "./context/AuthContextComponent.jsx";
import { UsersContextProvider } from "./context/UsersContextComponent.jsx";
import { AdminContextProvider } from "./context/AdminContextComponent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <UsersContextProvider>
        <AdminContextProvider>
          <App />
        </AdminContextProvider>
      </UsersContextProvider>
    </AuthContextProvider>
  </StrictMode>,
);
