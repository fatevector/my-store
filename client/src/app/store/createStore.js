import { combineReducers, configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "./categories";
import authReducer from "./auth";

const rootReducer = combineReducers({
    categories: categoriesReducer,
    auth: authReducer
});

export const createStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};
