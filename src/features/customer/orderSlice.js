// src/slices/cartSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPlaceOrder } from "../../utils/api";

// Async thunk to fetch items by restaurantId
export const getPlacedOrder = createAsyncThunk(
  "order/getPlacedOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      console.log("ORDER ID WHETHER PASSED",orderId)
      const response = await getPlaceOrder(orderId);
      console.log("DEBUG RESPONSE NEW",response)
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
    status: "idle",
    orderDetail: {}, // Array to hold cart items
    restaurantId: null, // To ensure all items are from the same restaurant
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPlacedOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPlacedOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("ACTION PAYLOAD --->",action.payload)
        state.orderDetail = action.payload; // Assuming payload is an array of items
        console.log("STATE ORDER DETAIL -->",state.orderDetail)
      })
      .addCase(getPlacedOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
