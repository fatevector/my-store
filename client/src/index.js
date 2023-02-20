import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App";
import history from "./app/utils/history";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router history={history}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Router>
);
