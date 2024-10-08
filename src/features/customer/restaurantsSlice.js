// src/slices/restaurantsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/api";

// Fetch Restaurants by City
export const fetchRestaurants = createAsyncThunk(
  "restaurants/fetchRestaurants",
  async (city, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/users/get-restaurant/${city}`);
      return response.data.restaurants;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Fetching Restaurants Failed"
      );
    }
  }
);

const restaurantsSlice = createSlice({
  name: "restaurants",
  initialState: {
    restaurants: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default restaurantsSlice.reducer;
