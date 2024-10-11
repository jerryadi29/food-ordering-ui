// src/slices/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Array to hold cart items
  restaurantId: null, // To ensure all items are from the same restaurant
};

const cartSlice = createSlice({
  name: 'cart', 
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, itemName, price,  additionalCustomizations, restaurantId } = action.payload;
      console.log(restaurantId)

      // If cart is empty, set the restaurantId
      if (state.items.length === 0) {
        state.restaurantId = restaurantId;
      }

      // Ensure all items are from the same restaurant
      if (state.restaurantId !== restaurantId) {
        // Optionally, notify the user or reset the cart
        alert('You can only order from one restaurant at a time.');
        return;
      }

      // Check if the item with the same customizations already exists
      const existingItem = state.items.find(
        (item) =>
          item.id === id &&
          JSON.stringify(item.additionalCustomizations) === JSON.stringify(additionalCustomizations)
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, itemName, price, quantity: 1, additionalCustomizations: additionalCustomizations });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item, index) => index !== action.payload);

      // If cart is empty, reset restaurantId
      if (state.items.length === 0) {
        state.restaurantId = null;
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.items[action.payload];
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.items[action.payload];
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.restaurantId = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
