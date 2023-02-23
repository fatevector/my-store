import { createAction, createSlice } from "@reduxjs/toolkit";

import productService from "../services/product.service";
import { addProductToUserCart, removeProductFromUserCart } from "./auth";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
        dataLoaded: false
    },
    reducers: {
        cartRequested: state => {
            state.isLoading = true;
            state.dataLoaded = false;
        },
        cartReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
            state.dataLoaded = true;
        },
        cartRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            state.dataLoaded = false;
        },
        cartReset: (state, action) => {
            state.entities = null;
            state.isLoading = true;
            state.error = null;
            state.lastFetch = null;
            state.dataLoaded = false;
        },
        productAdded: (state, action) => {
            state.entities.push(action.payload);
        },
        productRemoved: (state, action) => {
            state.entities = state.entities.filter(
                product => product.id != action.payload
            );
        }
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const {
    cartRequested,
    cartReceived,
    cartRequestFailed,
    cartReset,
    productAdded,
    productRemoved
} = actions;

const productAddRequested = createAction("cart/productAddRequested");
const productAddRequestFailed = createAction("cart/productAddRequestFailed");
const productRemoveRequested = createAction("cart/productRemoveRequested");
const productRemoveRequestFailed = createAction(
    "cart/productRemoveRequestFailed"
);

const isOutdated = date => Date.now() - date > 10 * 60 * 1000;

export const loadCart = idsList => async (dispatch, getState) => {
    const { lastFetch } = getState().cart;
    if (isOutdated(lastFetch)) {
        dispatch(cartRequested());
        try {
            const { content } = await productService.getByIdsList(idsList);
            dispatch(cartReceived(content));
        } catch (error) {
            dispatch(cartRequestFailed(error.message));
        }
    }
};

export const resetCart = () => async (dispatch, getState) => {
    dispatch(cartReset());
};

export const addProductToCart = product => async (dispatch, getState) => {
    dispatch(productAddRequested());
    try {
        dispatch(addProductToUserCart({ id: product.id, quantity: 1 }));
        dispatch(productAdded(product));
    } catch (error) {
        dispatch(productAddRequestFailed(error.message));
    }
};

export const removeProductFromCart = id => async (dispatch, getState) => {
    dispatch(productRemoveRequested());
    try {
        dispatch(removeProductFromUserCart(id));
        dispatch(productRemoved(id));
    } catch (error) {
        dispatch(productRemoveRequestFailed(error.message));
    }
};

export const getCart = () => state => state.cart.entities;

export const getCartLoadingStatus = () => state => state.cart.isLoading;

export const getCartDataStatus = () => state => state.cart.dataLoaded;

export default cartReducer;
