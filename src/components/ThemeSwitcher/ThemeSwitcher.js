import React, { useContext } from "react";
import ThemeContext from "../../context/ThemeContext"; // Importamos el contexto del tema
import IconSun from "../Icon/IconSun";
import IconMoon from "../Icon/IconMoon";
import './ThemeSwitcher.css';

const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-switcher-btn">
      {theme === 'light' ? <IconMoon /> : <IconSun />}
    </button>
  );
};

export default ThemeSwitcher;