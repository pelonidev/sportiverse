import React, { useState, useEffect } from 'react';

function ProductList() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/public/products')
     .then(response => response.json())
     .then(data => setProductos(data))
     .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Lista Productos</h2>
      <ul role='list'>
        {productos.length > 0 && productos.map(producto => (
          <li key={producto.id}>
            <h2>{producto.nombre}</h2>
            <p>{producto.descripcion}</p>
            <p>Precio: {producto.precio}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;