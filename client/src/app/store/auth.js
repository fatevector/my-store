import { createAction, createSlice } from "@reduxjs/toolkit";

import localStorageService from "../services/localStorage.service";
import authService from "../services/auth.service";
import generateAuthError from "../utils/generateAuthError";
import history from "../utils/history";
import userService from "../services/user.service";

const initialState = localStorageService.getAccessToken()
    ? {
          user: null,
          auth: { id: localStorageService.getUserId() },
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
    name: "Auth",
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
        userCreated: (state, action) => {
            if (!state.entities) state.entities = [];
            state.entities.push(action.payload);
        },
        userLoggedOut: state => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },
        userUpdated: (state, action) => {
            const userIndex = state.entities.findIndex(
                user => user._id === action.payload._id
            );
            state.entities[userIndex] = {
                ...state.entities[userIndex],
                ...action.payload
            };
            return state;
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
    userCreated,
    userUpdated
} = actions;

const userCreateRequested = createAction("users/userCreateRequested");
const userUpdateRequested = createAction("users/userUpdateRequested");
const updateUserFailed = createAction("users/updateUserFailed");
const createUserFailed = createAction("users/createUserFailed");

export const loadUser = () => async dispatch => {
    dispatch(userRequested());
    try {
        const { content } = await userService.get();
        dispatch(userReceived(content));
    } catch (error) {
        dispatch(userRequestFailed(error.message));
    }
};

export const logIn =
    ({ payload, redirect }) =>
    async dispatch => {
        const { email, password } = payload;
        dispatch(authRequested());
        try {
            const data = await authService.login({ email, password });
            dispatch(authRequestSuccess({ userId: data.localId }));
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

export const logOut = () => dispatch => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

const createUser = data => async dispatch => {
    dispatch(userCreateRequested());
    try {
        const { content } = await userService.create(data);
        dispatch(userCreated(content));
        history.push("/users");
    } catch (error) {
        dispatch(createUserFailed(error.message));
    }
};

export const signUp =
    ({ email, password, ...rest }) =>
    async dispatch => {
        dispatch(authRequested());
        try {
            const data = await authService.register({ email, password });
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
            dispatch(
                createUser({
                    _id: data.localId,
                    email,
                    image: `https://avatars.dicebear.com/api/avataaars/${(
                        Math.random() + 1
                    )
                        .toString(36)
                        .substring(7)}.svg`,
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

export const updateUser =
    ({ payload, redirect }) =>
    async (dispatch, getState) => {
        dispatch(userUpdateRequested());
        try {
            const currentUser = getState().users.entities.find(
                user => user._id === payload._id
            );
            if (payload.email !== currentUser.email) {
                const data = await authService.update(payload.email);
                localStorageService.setTokens(data);
            }
            const newData = {
                ...currentUser,
                ...payload
            };
            const { content } = await userService.update(newData);
            dispatch(userUpdated(content));
            history.push(redirect);
        } catch (error) {
            dispatch(updateUserFailed(error.message));
        }
    };

export const getIsLoggedIn = () => state => state.auth.isLoggedIn;

export const getDataStatus = () => state => state.auth.dataLoaded;

export const getCurrentUserId = () => state => state.auth.userId;

export const getUserLoadingStatus = () => state => state.auth.isLoading;

export const getCurrentUserData = () => state => state.auth.user;

export const getAuthErrors = () => state => state.auth.error;

export default authReducer;
