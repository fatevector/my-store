import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getCategoriesLoadingStatus,
    loadCategoriesList
} from "../../store/categories";
import { getDataStatus, getIsLoggedIn, loadUser } from "../../store/auth";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const categoriesStatusLoading = useSelector(getCategoriesLoadingStatus());
    const userDataIsLoaded = useSelector(getDataStatus());
    useEffect(() => {
        dispatch(loadCategoriesList());
        if (isLoggedIn && !userDataIsLoaded) {
            dispatch(loadUser(1));
        }
        //Нужно сделать загрузку корзины
        // if (isLoggedIn) {
        //     dispatch(loadUsersList());
        // }
    }, [isLoggedIn, userDataIsLoaded]);
    // }, [isLoggedIn]);

    if (categoriesStatusLoading || (isLoggedIn && !userDataIsLoaded))
        return "Loading...";
    return children;
};

export default AppLoader;
