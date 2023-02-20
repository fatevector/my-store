import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
    // const currentUser = useSelector(getCurrentUserData());
    const currentUser = {
        id: 1,
        name: "Иван",
        email: "test@test.com",
        image: "https://avatars.dicebear.com/api/avataaars/piie.svg"
    };

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    if (!currentUser) return "Loading...";
    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    alt=""
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div className={"w-100 dropdown-menu " + (isOpen ? "show" : "")}>
                <Link to={`/users/${currentUser.id}`} className="dropdown-item">
                    Профиль
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Выйти
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
