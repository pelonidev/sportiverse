import Header from './components/Header/Header';
import React from 'react';
import { BrowserRouter, Routes, Route } from'react-router-dom';
import ProductList from './components/templates/ProductList';
import ProductForm from './components/templates/ProductForm';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/:id/edit" element={<ProductForm />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; 2023 Sportiverse</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;