import { useState } from "react";

import { useTheme } from "../hooks/useTheme";

const Sort = ({ onPriceUp, onPriceDown, value }) => {
    const priceUp = (
        <>
            стоимость <i className="bi bi-sort-down-alt"></i>
        </>
    );
    const priceDown = (
        <>
            стоимость <i className="bi bi-sort-down"></i>
        </>
    );
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className="text-body d-flex align-items-baseline">
            Сортировка:{" "}
            <div
                className="dropdown"
                data-bs-theme={theme}
                onClick={toggleMenu}
            >
                <div
                    className="btn dropdown-toggle d-flex align-items-center text-body"
                    data-bs-theme={theme}
                >
                    <div className="me-2">
                        {value === "up" ? priceUp : priceDown}
                    </div>
                </div>
                <div
                    className={"w-100 dropdown-menu " + (isOpen ? "show" : "")}
                >
                    <span className="dropdown-item" onClick={onPriceUp}>
                        {priceUp}
                    </span>
                    <span className="dropdown-item" onClick={onPriceDown}>
                        {priceDown}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Sort;
