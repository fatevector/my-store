import { createSlice } from "@reduxjs/toolkit";
import categoryService from "../services/category.service";

const categoriesSlice = createSlice({
    name: "category",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        categoryRequested: state => {
            state.isLoading = true;
        },
        categoryReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        categoryRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: categoriesReducer, actions } = categoriesSlice;
const { categoryRequested, categoryReceived, categoryRequestFailed } = actions;

const isOutdated = date => Date.now() - date > 10 * 60 * 1000;

export const loadCategoryList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().category;
    if (isOutdated(lastFetch)) {
        dispatch(categoryRequested());
        try {
            const { content } = await categoryService.get();
            dispatch(categoryReceived(content));
        } catch (error) {
            dispatch(categoryRequestFailed(error.message));
        }
    }
};

export const getCategoriesList = () => state => state.category.entities;

export const getCategoriesLoadingStatus = () => state =>
    state.category.isLoading;

export const getCategoryById = categoryId => state => {
    if (state.category.entities) {
        return state.category.entities.find(
            category => category._id === categoryId
        );
    }
};

export default categoriesReducer;
