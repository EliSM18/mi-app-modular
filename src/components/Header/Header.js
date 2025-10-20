import React from "react";
import './Header.css';
import logo from './chococat-Photoroom.png';
import ThemeSwitcher from "../ThemeSwitcher";

const Header = () => {
    return (
        <header className="app-header">
            <div align="right">
                <ThemeSwitcher />
            </div>
            <img src={logo} className="app-logo" alt="logo" style={{ width: 150, height: 150 }}/>
            <h1>Mi Aplicación Modular</h1>
        </header>
    );
};

export default Header;
