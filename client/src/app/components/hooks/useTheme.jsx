import React, { useEffect } from "react";
import { useContext, useState } from "react";

const ThemeContext = React.createContext();

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

export const useTheme = () => {
    return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(LIGHT_THEME);
    const bodyNode = document.querySelector("body");

    const toggleTheme = () => {
        setTheme(prevState =>
            prevState === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
        );
        if (bodyNode.classList.contains(LIGHT_THEME)) {
            bodyNode.classList.remove(LIGHT_THEME);
            bodyNode.classList.add(DARK_THEME);
        } else if (bodyNode.classList.contains(DARK_THEME)) {
            bodyNode.classList.remove(DARK_THEME);
            bodyNode.classList.add(LIGHT_THEME);
        }
    };

    useEffect(() => {
        bodyNode.classList.add(LIGHT_THEME);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
