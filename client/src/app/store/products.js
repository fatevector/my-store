import { createAction, createSlice } from "@reduxjs/toolkit";

import productService from "../services/product.service";
import history from "../utils/history";

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
            state.error = null;
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
        currentProductRequested: state => {
            state.error = null;
            state.isLoading = true;
        },
        currentProductReceived: (state, action) => {
            state.currentProduct = action.payload;
            state.isLoading = false;
        },
        currentProductRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        productDeleted: (state, action) => {
            state.entities = state.entities.filter(
                product => product._id !== action.payload
            );
        },
        productCreated: (state, action) => {
            if (!state.entities) state.entities = [];
            state.entities.push(action.payload);
        },
        productUpdated: (state, action) => {
            state.currentProduct = action.payload;
            if (state.entities) {
                const index = state.entities.findIndex(
                    p => p._id === action.payload._id
                );
                if (index !== -1) state.entities[index] = action.payload;
            }
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsReceived,
    productsRequestFailed,
    currentProductRequested,
    currentProductReceived,
    currentProductRequestFailed,
    productDeleted,
    productCreated,
    productUpdated
} = actions;

const productDeleteRequested = createAction("products/productDeleteRequested");
const productDeleteFailed = createAction("products/productDeleteFailed");
const productCreateRequested = createAction("products/productCreateRequested");
const productCreateFailed = createAction("products/productCreateFailed");
const productUpdateRequested = createAction("products/productUpdateRequested");
const productUpdateFailed = createAction("products/productUpdateFailed");

export const loadProductsList = (category, page, limit) => async dispatch => {
    dispatch(productsRequested());
    try {
        let content;
        if (category) {
            content = await productService.getByCategory(category, page, limit);
        } else {
            content = await productService.get();
        }
        dispatch(productsReceived(content.content));
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

export const deleteProductById = id => async (dispatch, getState) => {
    dispatch(productDeleteRequested());
    try {
        const { content } = await productService.deleteById(id);
        if (!content) dispatch(productDeleted(id));
    } catch (error) {
        dispatch(productDeleteFailed(error.message));
    }
};

export const createProduct =
    (payload, redirect) => async (dispatch, getState) => {
        dispatch(productCreateRequested());
        try {
            const { content } = await productService.create(payload);
            dispatch(productCreated(content));
            history.push(redirect);
        } catch (error) {
            dispatch(productCreateFailed(error.message));
        }
    };

export const updateProduct =
    (payload, redirect) => async (dispatch, getState) => {
        dispatch(productUpdateRequested());
        try {
            const { content } = await productService.update(payload);
            dispatch(productUpdated(content));
            history.push(redirect);
        } catch (error) {
            dispatch(productUpdateFailed(error.message));
        }
    };

export const getProductsList = () => state => state.products.entities;

export const getProductsLoadingStatus = () => state => state.products.isLoading;

export const getCurrentProduct = () => state => state.products.currentProduct;

export const getProductError = () => state => state.products.error;

export default productsReducer;
