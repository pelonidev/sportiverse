import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProductForm({ product }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(undefined);
  const [stock, setStock] = useState(undefined);
  const navigate = useNavigate();

  const handleSubmitProduct = (event) => {
    event.preventDefault();
    navigate('/products');
  };

  return (
    <form onSubmit={handleSubmitProduct} className='login-form'>
      <h1>Hola de nuevo!</h1>
      <label>Nombre del producto</label>
      <input type="text" onChange={(event) => setName(event.target.value)} />
      <label>Precio € / unidad</label>
      <input type="number" onChange={(event) => setPrice(event.target.value)} />
      <label>
        Descripción
      </label>
      <textarea onChange={(event) => setDescription(event.target.value)} />
      <label>Stock</label>
      <input type="number" onChange={(event) => setStock(event.target.value)} />
      <input type='submit' value='Iniciar Sesión'></input>
    </form>
  );
}

export default ProductForm;