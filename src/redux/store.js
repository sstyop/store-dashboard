import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    cart: cartReducer
  }
});

store.subscribe(() => {
  const state = store.getState().cart;
  localStorage.setItem('cart', JSON.stringify(state));
});