import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App";
import history from "./app/utils/history";
import { createStore } from "./app/store/createStore";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router history={history}>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </Router>
);
