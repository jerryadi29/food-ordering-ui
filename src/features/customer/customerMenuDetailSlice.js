// src/slices/itemsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/api";

// Async thunk to fetch items by restaurantId
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/merchants/items/${restaurantId}`);
      return response.data.restaurants; // Assuming 'restaurants' key contains items
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch items"
      );
    }
  }
);

export const customerMenuDetailSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});
