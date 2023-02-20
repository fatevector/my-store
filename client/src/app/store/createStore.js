import { combineReducers, configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "./categories";
import authReducer from "./auth";
import productsReducer from "./products";

const rootReducer = combineReducers({
    categories: categoriesReducer,
    auth: authReducer,
    products: productsReducer
});

export const createStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};
