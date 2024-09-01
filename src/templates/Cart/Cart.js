import React from 'react';
import { useSelector, useDispatch } from 'react-redux'

import './Cart.css';
import { removeFromCart } from '../../redux/cartSlice';

function Cart() {
  const cartStore = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const handleRemoveFromCart = (index) =>{
    dispatch(removeFromCart(index));
  }
  const totalAmount = ()=>{
    let amount = 0;
    cartStore.cart.forEach(cartProduct=>{
      amount+=parseFloat(cartProduct.price);
    })
    return amount;
  }
  return (
    <section className='cart-section'>
      <ul className='cart-products'>
        {cartStore.cart.map((cartProduct, index) => (
          <li style={{display: 'flex', flexDirection: 'column', marginBottom:'1em'}}>
            <img src={cartProduct.image_url} style={{width: '300px'}}/>
            <h2>{cartProduct.name}</h2>
            <p>{cartProduct.description}</p>
            <p>Precio: {cartProduct.price}</p>
            <button style={{cursor: 'pointer', padding: '0.5em'}} onClick={()=>handleRemoveFromCart(index)}>Quitar del carrito</button>
          </li>
        ))}
      </ul>
      <div style={{display: 'flex', width: '100%'}}>
        <span style={{ margin: 'auto'}}>Total: {totalAmount()} €</span>
      </div>
    </section>
  );
}

export default Cart;