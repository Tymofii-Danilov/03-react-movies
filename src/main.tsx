import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App/App.tsx";
import "modern-normalize/modern-normalize.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
