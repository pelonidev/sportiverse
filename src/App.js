import Header from './components/Header/Header';
import React from 'react';
import { BrowserRouter, Routes, Route } from'react-router-dom';
import Admin from './templates/Admin/Admin';
import Cart from './templates/Cart/Cart';
import Seller from './templates/Seller/Seller';
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
            <Route path="/admin" element={<Admin />} />
            <Route path="/seller" element={<Seller />} />
            <Route path="/iniciar-sesion" element={<LoginSignup />} />
            <Route path="/cart" element={<Cart />} />
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