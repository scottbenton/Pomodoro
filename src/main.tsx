import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "@fontsource-variable/cabin";
import "@fontsource-variable/inter";
import { AppProviders } from "providers/AppProviders.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
