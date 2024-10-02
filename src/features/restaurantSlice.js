import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchRestaurantDetails } from "../utils/api";

export const getRestaurantDetails = createAsyncThunk(
  "restaurant/getRestaurantDetails",
  async (restaurantId) => {
    try {
      const response = await fetchRestaurantDetails(restaurantId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

const restaurantDetailInitialState = {
  details: [],
  loading: false,
  error: null,
};

export const restaurantDetailSlice = createSlice({
  name: "restaurant",
  initialState: restaurantDetailInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurantDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getRestaurantDetails.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload,'payload====')
        state.details = action.payload;
      })
      .addCase(getRestaurantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch restaurants";
      });
  },
});
