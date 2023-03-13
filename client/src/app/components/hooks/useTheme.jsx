import React from "react";
import { useContext, useState } from "react";

const ThemeContext = React.createContext();

const LIGHT_THEME = "light";
const DARK_THEME = "dark";

export const useTheme = () => {
    return useContext(ThemeContext);
};

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(LIGHT_THEME);

    const toggleTheme = () => {
        setTheme(prevState =>
            prevState === LIGHT_THEME ? DARK_THEME : LIGHT_THEME
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
