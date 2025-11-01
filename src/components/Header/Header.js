import React from "react";
import './Header.css';
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { Link } from 'react-router-dom';
import apache from './github-octocat.svg';

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo-nav">
        <h1 className="logo"><img src={apache} alt="logo" className="logo"></img></h1>
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