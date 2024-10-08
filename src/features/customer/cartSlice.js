// src/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Each item: { itemId, itemName, quantity, price }
  },
  reducers: {
    addToCart: (state, action) => {
      const { id, itemName, price } = action.payload;
      const existingItem = state.items.find((item) => item.itemId === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ itemId: id, itemName, quantity: 1, price: Number(price) });
      }
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter((item) => item.itemId !== itemId);
    },
    clearCart: (state) => {
      state.items = [];
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.itemId === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((item) => item.itemId === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;

export default cartSlice.reducer;
