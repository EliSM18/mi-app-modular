import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext"; // Importamos el contexto del tema
import IconSun from "../Icons/IconSun"; // Importamos el icono del sol
import IconMoon from "../Icons/IconMoon"; // Importamos el icono de la luna
import './ThemeSwitcher.css'; // Importamos los estilos para el ThemeSwitcher|

const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useContext(ThemeContext); // Usamos el contexto del tema

    return (
        <button onClick={toggleTheme} className="theme-switcher-btn">
            {/* Cambiar a Modo {theme === "light" ? "oscuro" : "claro"} */}
            {theme === "light" ? <IconMoon /> : <IconSun />}
        </button>
    );
};

export default ThemeSwitcher;
