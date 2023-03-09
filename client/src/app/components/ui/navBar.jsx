import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getIsLoggedIn, getUserRole } from "../../store/auth";
import NavProfile from "./navProfile";

const NavBar = () => {
    const isLoggedIng = useSelector(getIsLoggedIn());
    const userRole = useSelector(getUserRole());

    return (
        <nav className="navbar bg-light mb-3 border border-secondary-subtle">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">
                            Каталог
                        </Link>
                    </li>
                    {userRole === "admin" && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">
                                Админ-панель
                            </Link>
                        </li>
                    )}
                </ul>
                <ul className="d-flex align-items-baseline nav">
                    {isLoggedIng ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">
                                    Корзина
                                </Link>
                            </li>
                            <li className="nav-item">
                                <NavProfile />
                            </li>
                        </>
                    ) : (
                        <Link className="nav-link" to="/login">
                            Войти
                        </Link>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
