import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { getIsLoggedIn, getUserRole } from "../../store/auth";

const ProtectedRoute = ({ component: Component, children, role, ...rest }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const userRole = useSelector(getUserRole());

    return (
        <Route
            {...rest}
            render={props => {
                if (isLoggedIn && (!role || role === userRole)) {
                    return Component ? <Component {...props} /> : children;
                }
                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }}
                    />
                );
            }}
        />
    );
};

export default ProtectedRoute;
