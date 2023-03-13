import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "react-router";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import App from "./App";
import history from "./app/utils/history";
import { createStore } from "./app/store/createStore";
import AppLoader from "./app/components/hoc/appLoader";
import ThemeProvider from "./app/components/hooks/useTheme";

const store = createStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Router history={history}>
        <React.StrictMode>
            <Provider store={store}>
                <AppLoader>
                    <ThemeProvider>
                        <App />
                    </ThemeProvider>
                </AppLoader>
            </Provider>
        </React.StrictMode>
    </Router>
);
