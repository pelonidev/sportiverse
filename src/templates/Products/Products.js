import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import SportiverseServices from '../../services'

function Products() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cartStore = useSelector(state => state.cart);

  useEffect(() => {
    SportiverseServices.getProducts()
      .then(data => {
        console.log({data})
        setProducts(data)})
  }, []);
  
  const handleAddToCart = (product) =>{
    dispatch(addToCart(product));
  }

  return (
    <div>
      <h2>Lista Productos</h2>
      <ul style={{marginTop: '1em'}}>
        {products.length > 0 && products.map(product => (
          <li key={product.id} style={{display: 'flex', flexDirection: 'column'}}>
            <img src={product.image_url} style={{width: '300px'}}/>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Precio: {product.price}</p>
            <button style={{cursor: 'pointer', padding: '0.5em'}} onClick={()=>handleAddToCart(product)}>Añadir al carrito</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Products;