import React, { useState } from'react';
import { useNavigate } from'react-router-dom';
import { createProduct, updateProduct } from '../../api';

function ProductForm({ product }) {
  const [name, setName] = useState(product? product.name : '');
  const [description, setDescription] = useState(product? product.description : '');
  const [price, setPrice] = useState(product? product.price : '');
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (product) {
      await updateProduct(product.id, { name, description, price });
    } else {
      await createProduct({ name, description, price });
    }
    history.push('/products');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      

      <label>
        Descripción:
        <textarea value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>
      

      <label>
        Precio:
        <input type="number" value={price} onChange={(event) => setPrice(event.target.value)} />
      </label>
      

      <button type="submit">Guardar</button>
    </form>
  );
}

export default ProductForm;