import React, { useContext } from "react";
import ThemeContext from "../context/ThemeContext"; // Importamos el contexto del tema

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useContext(ThemeContext); // Usamos el contexto del tema

    return (
        <button onClick={toggleTheme} className="theme-switcher">
            Cambiar a Modo {theme === "light" ? "oscuro" : "claro"}
            
        </button>
    );
};

export default ThemeSwitcher;
