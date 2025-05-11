import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart
      ? JSON.parse(savedCart)
      : { items: [], totalQuantity: 0, totalPrice: 0, isMiniCartOpen: false };
  } catch (error) {
    console.error('Error loading cart from storage:', error);
    return { items: [], totalQuantity: 0, totalPrice: 0, isMiniCartOpen: false };
  }
};

const calculateTotals = (state) => {
  const totals = state.items.reduce(
    (acc, item) => {
      acc.totalQuantity += item.quantity;
      acc.totalPrice += item.product.price * item.quantity;
      return acc;
    },
    { totalQuantity: 0, totalPrice: 0 }
  );
  state.totalQuantity = totals.totalQuantity;
  state.totalPrice = totals.totalPrice;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromStorage(),
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.product.id !== action.payload);
      calculateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.product.id === id);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
      calculateTotals(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    toggleMiniCart: (state) => {
      state.isMiniCartOpen = !state.isMiniCartOpen;
    },
    closeMiniCart: (state) => {
      state.isMiniCartOpen = false;
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleMiniCart, closeMiniCart } = cartSlice.actions;
export default cartSlice.reducer;
