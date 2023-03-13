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
    currentProductReceived,
    productDeleted,
    productCreated,
    productUpdated
} = actions;

const currentProductRequested = createAction(
    "products/currentProductRequested"
);
const currentProductRequestFailed = createAction(
    "products/currentProductRequestFailed"
);
const productDeleteRequested = createAction("products/productDeleteRequested");
const productDeleteFailed = createAction("products/productDeleteFailed");
const productCreateRequested = createAction("products/productCreateRequested");
const productCreateFailed = createAction("products/productCreateFailed");
const productUpdateRequested = createAction("products/productUpdateRequested");
const productUpdateFailed = createAction("products/productUpdateFailed");

export const loadProductsList =
    (category = { name: "Популярное" }, page, limit) =>
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

export const deleteProductById = id => async (dispatch, getState) => {
    dispatch(productDeleteRequested());
    try {
        const { content } = await productService.deleteById(id);
        if (!content) dispatch(productDeleted(id));
    } catch (error) {
        dispatch(productDeleteFailed(error.message));
    }
};

// todo: Проверить create, update

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
            console.log(error.message);
            dispatch(productUpdateFailed(error.message));
        }
    };

export const getProductsList = () => state => state.products.entities;

export const getProductsLoadingStatus = () => state => state.products.isLoading;

export const getCurrentProduct = () => state => state.products.currentProduct;

export default productsReducer;
