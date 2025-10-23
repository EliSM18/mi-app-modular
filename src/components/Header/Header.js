import React from "react";
import './Header.css';
import logo from './chococat-Photoroom.png';
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-nav">
        <h1 className="logo">Mi App</h1>
        <nav>
          {/* Usamos <Link> en lugar de <a href=""> */}
          <Link to="/">Inicio</Link>
          <Link to="/tareas">Tareas</Link>
          <Link to="/directorio">Directorio</Link>
        </nav>
      </div>
      <ThemeSwitcher />
    </header>
  );
};

export default Header;