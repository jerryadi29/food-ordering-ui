// src/slices/cartSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlacePlaceOrder } from "../../utils/api";

// Async thunk to fetch items by restaurantId
export const fetchPlacedOrder = createAsyncThunk(
  "order/fetchPlacedOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await getPlacePlaceOrder(orderId);
      console.log(response)
      return response; // Assuming 'restaurants' contains the items
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch items"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderDetail: [], // Array to hold cart items
    restaurantId: null, // To ensure all items are from the same restaurant
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlacedOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlacedOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orderDetail = action.payload; // Assuming payload is an array of items
      })
      .addCase(fetchPlacedOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
