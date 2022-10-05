import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./style/zero_style.css";
import "./style/app_style.css";
import { BrowserRouter } from "react-router-dom";
import { setupStore } from "./store/store";
import { Provider } from "react-redux";

const store = setupStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
