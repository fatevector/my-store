import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../../img/logo180.png";

import { getIsLoggedIn, getUserRole } from "../../store/auth";
import { useTheme } from "../hooks/useTheme";

import NavProfile from "./navProfile";

const NavBar = () => {
    const isLoggedIng = useSelector(getIsLoggedIn());
    const userRole = useSelector(getUserRole());
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={`navbar ${theme} mb-3 border border-secondary-subtle`}>
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link p-0" to="/">
                            <img src={logo} alt="Главная" className="logo" />
                        </Link>
                    </li>
                </ul>
                <ul className="d-flex align-items-baseline nav">
                    <li className="nav-item">
                        <button
                            className="btn btn-primary"
                            onClick={toggleTheme}
                        >
                            Сменить тему
                        </button>
                    </li>
                    {userRole === "admin" && (
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin">
                                Админ-панель
                            </Link>
                        </li>
                    )}
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
