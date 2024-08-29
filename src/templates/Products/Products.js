import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ProductList from '../../components/ProductList/ProductList';
import ProductForm from '../../components/ProductForm/ProductForm';

function Products() {
  const userStore = useSelector(state => state.user);
  const isSeller = userStore.role === 2;
  useEffect(() => {
    fetch('http://localhost:8000/api/v1/public/categories')
     .then(response => response.json())
     .catch(error => console.error(error));
  }, []);
  return (
    <div>
      <h1>Productos</h1>
      {isSeller && <ProductForm />}
      <ProductList/>
    </div>
  );
}

export default Products;