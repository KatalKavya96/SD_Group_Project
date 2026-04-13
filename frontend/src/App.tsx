import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "./presentation/routes/AppRoutes";
import { AuthProvider } from "./presentation/context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);