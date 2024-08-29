import Header from './components/Header/Header';
import React from 'react';
import { BrowserRouter, Routes, Route } from'react-router-dom';
import Home from './templates/Home/Home';
import MyAccount from './templates/MyAccount/MyAccount';
import Products from './templates/Products/Products';
import LoginSignup from './templates/LoginSignup/LoginSignup';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cuenta" element={<MyAccount />} />
            <Route path="/productos" element={<Products />} />
            <Route path="/iniciar-sesion" element={<LoginSignup />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2024 Sportiverse</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;