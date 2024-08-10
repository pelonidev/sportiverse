import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <div className="header">
        <div className="logo">
          <h1>Sportiverse</h1>
        </div>
        <nav className="menu">
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Categorías</a></li>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Carrito</a></li>
            <li><a href="#">Iniciar sesión / Registrarse</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;