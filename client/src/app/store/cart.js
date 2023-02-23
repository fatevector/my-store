import { createSlice } from "@reduxjs/toolkit";

import productService from "../services/product.service";

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
        }
    }
});

const { reducer: cartReducer, actions } = cartSlice;
const { cartRequested, cartReceived, cartRequestFailed } = actions;

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

export const getCart = () => state => state.cart.entities;

export const getCartLoadingStatus = () => state => state.cart.isLoading;

export const getCartDataStatus = () => state => state.cart.dataLoaded;

export default cartReducer;
