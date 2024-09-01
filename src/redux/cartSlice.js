import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart : []
};

export const cartSlice = createSlice({
    name : 'cart',
    initialState,
    reducers : {
        addToCart : (state, product) => {
            state.cart.push(product.payload)
        },
        removeFromCart : (state, productPosition) => {
            state.cart.splice(productPosition, 1)
        },
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;