import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getCategoriesLoadingStatus,
    loadCategoriesList
} from "../../store/categories";
import { loadUser } from "../../store/auth";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    // const isLoggedIn = useSelector(getIsLoggedIn());
    const categoriesStatusLoading = useSelector(getCategoriesLoadingStatus());
    useEffect(() => {
        dispatch(loadCategoriesList());
        dispatch(loadUser(1));
        // if (isLoggedIn) {
        //     dispatch(loadUsersList());
        // }
    }, []);
    // }, [isLoggedIn]);

    if (categoriesStatusLoading) return "Loading...";
    return children;
};

export default AppLoader;
