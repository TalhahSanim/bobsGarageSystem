import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// The auth provider so every component finds out who is logged in
import { AuthContextProvider } from "./context/AuthContextComponent.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </StrictMode>,
);
