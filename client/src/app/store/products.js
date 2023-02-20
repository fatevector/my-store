import { createSlice } from "@reduxjs/toolkit";
import productService from "../services/product.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
        // lastFetch: null
    },
    reducers: {
        productsRequested: state => {
            state.isLoading = true;
        },
        productsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            // state.lastFetch = Date.now();
        },
        productsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsReceived, productsRequestFailed } = actions;

// const isOutdated = date => Date.now() - date > 10 * 60 * 1000;

export const loadProductsList =
    (category = "popular", page = 1, limit = 3) =>
    async (dispatch, getState) => {
        // const { lastFetch } = getState().products;
        // if (isOutdated(lastFetch)) {
        dispatch(productsRequested());
        try {
            const { content } = await productService.getByCategory(
                category,
                page,
                limit
            );
            dispatch(productsReceived(content));
        } catch (error) {
            dispatch(productsRequestFailed(error.message));
        }
        // }
    };

export const getProductsList = () => state => state.products.entities;

export const getProductsLoadingStatus = () => state => state.products.isLoading;

export const getProductById = productId => state => {
    if (state.products.entities) {
        return state.products.entities.find(
            product => product._id === productId
        );
    }
};

export default productsReducer;
