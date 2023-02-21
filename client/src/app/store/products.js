import { createAction, createSlice } from "@reduxjs/toolkit";

import productService from "../services/product.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        currentProduct: null,
        isLoading: true,
        error: null
    },
    reducers: {
        productsRequested: state => {
            state.isLoading = true;
        },
        productsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        productsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        currentProductReceived: (state, action) => {
            state.currentProduct = action.payload;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceived,
    productsRequestFailed,
    currentProductReceived
} = actions;

const currentProductRequested = createAction(
    "products/currentProductRequested"
);
const currentProductRequestFailed = createAction(
    "products/currentProductRequestFailed"
);

export const loadProductsList =
    (category = "popular", page, limit) =>
    async dispatch => {
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
    };

export const loadProductById = id => async (dispatch, getState) => {
    dispatch(currentProductRequested());
    try {
        const { content } = await productService.getById(id);
        dispatch(currentProductReceived(content));
    } catch (error) {
        dispatch(currentProductRequestFailed(error.message));
    }
};

export const getProductsList = () => state => state.products.entities;

export const getProductsLoadingStatus = () => state => state.products.isLoading;

export const getCurrentProduct = () => state => state.products.currentProduct;

export default productsReducer;
