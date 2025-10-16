import React from "react";
import './Header.css';
import logo from './chococat.jpg';

const Header = () => {
    return (
        <header className="app-header">
            <img src={logo} className="app-logo" alt="logo" />
            <h1>Mi Aplicación Modular</h1>
        </header>
    );
};

export default Header;
