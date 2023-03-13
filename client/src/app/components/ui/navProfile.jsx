import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getCurrentUserData } from "../../store/auth";
import { useTheme } from "../hooks/useTheme";

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const { theme, toggleTheme } = useTheme();

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    if (!currentUser) return "Loading...";
    return (
        <div className="dropdown" data-bs-theme={theme} onClick={toggleMenu}>
            <div
                className="btn dropdown-toggle d-flex align-items-center text-body bg-body"
                data-bs-theme={theme}
            >
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    alt=""
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu " + (isOpen ? "show" : "")}>
                <Link to={`/profile`} className="dropdown-item">
                    Профиль
                </Link>
                <button className="dropdown-item" onClick={toggleTheme}>
                    Сменить тему
                </button>
                <Link to="/logout" className="dropdown-item">
                    Выйти
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
