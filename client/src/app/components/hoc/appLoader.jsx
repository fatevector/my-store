import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getCategoriesLoadingStatus,
    loadCategoriesList
} from "../../store/categories";
import {
    getCurrentUserId,
    getDataStatus,
    getIsLoggedIn,
    loadUser
} from "../../store/auth";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userId = useSelector(getCurrentUserId());
    const categoriesStatusLoading = useSelector(getCategoriesLoadingStatus());
    const userDataIsLoaded = useSelector(getDataStatus());
    useEffect(() => {
        dispatch(loadCategoriesList());
        if (isLoggedIn && !userDataIsLoaded) {
            dispatch(loadUser(userId));
        }
    }, [isLoggedIn, userDataIsLoaded]);

    if (categoriesStatusLoading || (isLoggedIn && !userDataIsLoaded))
        return "Loading...";
    return children;
};

export default AppLoader;
