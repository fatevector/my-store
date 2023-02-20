import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getCategoriesLoadingStatus,
    loadCategoriesList
} from "../../store/categories";

// import {
//     getIsLoggedIn,
//     getUsersLoadingStatus,
//     loadUsersList
// } from "../../../store/users";
// import { loadQualitiesList } from "../../../store/qualities";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();
    // const isLoggedIn = useSelector(getIsLoggedIn());
    // const usersStatusLoading = useSelector(getUsersLoadingStatus());
    const categoriesStatusLoading = useSelector(getCategoriesLoadingStatus());
    useEffect(() => {
        // dispatch(loadQualitiesList());
        dispatch(loadCategoriesList());
        // if (isLoggedIn) {
        //     dispatch(loadUsersList());
        // }
    }, []);
    // }, [isLoggedIn]);

    if (categoriesStatusLoading) return "Loading...";
    return children;
};

export default AppLoader;
