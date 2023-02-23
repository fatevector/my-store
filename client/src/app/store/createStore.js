import { combineReducers, configureStore } from "@reduxjs/toolkit";

import categoriesReducer from "./categories";
import authReducer from "./auth";
import productsReducer from "./products";
import cartReducer from "./cart";

const rootReducer = combineReducers({
    categories: categoriesReducer,
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer
});

export const createStore = () => {
    return configureStore({
        reducer: rootReducer
    });
};
