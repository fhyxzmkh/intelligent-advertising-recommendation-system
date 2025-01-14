import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { FpjsProvider } from "@fingerprintjs/fingerprintjs-pro-react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FpjsProvider
      loadOptions={{
        apiKey: "JGqYTzoTprYcwzGAEPPj",
      }}
    >
      <App />
    </FpjsProvider>
  </StrictMode>,
);
