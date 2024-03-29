import { createAction, createSlice } from "@reduxjs/toolkit";

import generateAuthError from "../utils/generateAuthError";
import history from "../utils/history";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import { resetCart } from "./cart";

const initialState = localStorageService.getAccessToken()
    ? {
          user: null,
          auth: { userId: localStorageService.getUserId() },
          isLoading: true,
          error: null,
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          user: null,
          auth: null,
          isLoading: true,
          error: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userRequested: state => {
            state.isLoading = true;
        },
        userReceived: (state, action) => {
            state.user = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        userRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequested: state => {
            state.error = null;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userLoggedOut: state => {
            state.user = null;
            state.auth = null;
            state.isLoading = true;
            state.error = null;
            state.isLoggedIn = false;
            state.dataLoaded = false;
        },
        userUpdated: (state, action) => {
            state.user = action.payload;
        }
    }
});

const { reducer: authReducer, actions } = AuthSlice;
const {
    userRequested,
    userReceived,
    userRequestFailed,
    authRequested,
    authRequestSuccess,
    authRequestFailed,
    userLoggedOut,
    userUpdated
} = actions;

const userUpdateRequested = createAction("users/userUpdateRequested");
const updateUserFailed = createAction("users/updateUserFailed");

export const logOut = () => dispatch => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    dispatch(resetCart());
    history.push("/");
};

export const loadUser = id => async dispatch => {
    dispatch(userRequested());
    try {
        const { content } = await userService.get(id);
        dispatch(userReceived(content));
    } catch (error) {
        dispatch(userRequestFailed(error.message));
        dispatch(userLoggedOut());
    }
};

export const logIn =
    ({ payload, redirect }) =>
    async dispatch => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            dispatch(authRequestSuccess({ userId: data.userId }));
            localStorageService.setTokens(data);
            history.push(redirect);
        } catch (error) {
            const { code, message } = error.response.data.error;
            if (code === 400) {
                const errorMessage = generateAuthError(message);
                dispatch(authRequestFailed(errorMessage));
            } else {
                dispatch(authRequestFailed(error.message));
            }
        }
    };

export const signUp = payload => async dispatch => {
    dispatch(authRequested());
    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
        history.push("/users");
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

export const addProductToUserCart = product => async (dispatch, getState) => {
    dispatch(userUpdateRequested());
    try {
        const currentUser = getState().auth.user;
        const newCartData = currentUser?.cart
            ? [...currentUser.cart, product]
            : [product];
        const newUserData = currentUser
            ? {
                  ...currentUser,
                  cart: newCartData
              }
            : { cart: newCartData };
        const { content } = await userService.update(newUserData);
        dispatch(userUpdated(content));
    } catch (error) {
        dispatch(updateUserFailed(error.message));
    }
};

export const removeProductFromUserCart = id => async (dispatch, getState) => {
    dispatch(userUpdateRequested());
    try {
        const currentUser = getState().auth.user;
        const newCartData = currentUser.cart.filter(p => p.productId !== id);
        const newUserData = {
            ...currentUser,
            cart: newCartData
        };
        const { content } = await userService.update(newUserData);
        dispatch(userUpdated(content));
    } catch (error) {
        dispatch(updateUserFailed(error.message));
    }
};

export const updateProductQuantity =
    ({ id, quantity }) =>
    async (dispatch, getState) => {
        dispatch(userUpdateRequested());
        try {
            const currentUser = getState().auth.user;
            const newCartData = currentUser.cart.map(p => {
                if (p.productId === id) {
                    return {
                        ...p,
                        quantity
                    };
                }
                return p;
            });
            const newUserData = {
                ...currentUser,
                cart: newCartData
            };
            const { content } = await userService.update(newUserData);
            dispatch(userUpdated(content));
        } catch (error) {
            dispatch(updateUserFailed(error.message));
        }
    };

export const getIsLoggedIn = () => state => state.auth.isLoggedIn;

export const getDataStatus = () => state => state.auth.dataLoaded;

export const getCurrentUserId = () => state => state.auth.auth?.userId;

export const getUserRole = () => state => state.auth.user?.role;

export const getUserLoadingStatus = () => state => state.auth.isLoading;

export const getCurrentUserData = () => state => state.auth.user;

export const getAuthErrors = () => state => state.auth.error;

export const getUserCart = () => state => state.auth.user?.cart;

export default authReducer;
