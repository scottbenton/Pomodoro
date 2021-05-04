import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppProviders } from "./components/providers/AppProviders";
import reportWebVitals from "./reportWebVitals";
import { register } from "./serviceWorkerRegistration";
import { init } from "utils/firebase";

import "typeface-nunito";

init();

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
register();
