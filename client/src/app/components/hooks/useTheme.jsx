import React, { useEffect } from "react";
import { useContext, useState } from "react";

import localStorageService from "../../services/localStorage.service";

const ThemeContext = React.createContext();

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

export const useTheme = () => {
    return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
    const storageTheme = localStorageService.getTheme();
    let initialTheme;
    if (storageTheme) {
        initialTheme = localStorageService.getTheme();
    } else {
        initialTheme = LIGHT_THEME;
        localStorageService.setTheme(LIGHT_THEME);
    }
    const [theme, setTheme] = useState(initialTheme);
    const bodyNode = document.querySelector("body");

    const toggleTheme = () => {
        setTheme(prevState => {
            if (prevState === LIGHT_THEME) {
                localStorageService.setTheme(DARK_THEME);
                bodyNode.classList.remove(LIGHT_THEME);
                bodyNode.classList.add(DARK_THEME);
                return DARK_THEME;
            } else {
                localStorageService.setTheme(LIGHT_THEME);
                bodyNode.classList.remove(DARK_THEME);
                bodyNode.classList.add(LIGHT_THEME);
                return LIGHT_THEME;
            }
        });
    };

    useEffect(() => {
        bodyNode.classList.add(theme);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
