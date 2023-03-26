import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        categoriesRequested: state => {
            state.error = null;
            state.isLoading = true;
        },
        categoriesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        categoriesRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoriesRequested, categoriesReceived, categoriesRequestFailed } =
    actions;

const isOutdated = date => Date.now() - date > 10 * 60 * 1000;

export const loadCategoriesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().categories;
    if (isOutdated(lastFetch)) {
        dispatch(categoriesRequested());
        try {
            const { content } = await categoryService.get();
            dispatch(categoriesReceived(content));
        } catch (error) {
            dispatch(categoriesRequestFailed(error.message));
        }
    }
};

export const getCategoriesList = () => state => state.categories.entities;

export const getCategoriesLoadingStatus = () => state =>
    state.categories.isLoading;

export const getCategoryById = categoryId => state => {
    if (state.categories.entities) {
        return state.categories.entities.find(
            category => category._id === categoryId
        );
    }
};

export const getCategoriesError = () => state => state.categories.error;

export default categoriesReducer;
