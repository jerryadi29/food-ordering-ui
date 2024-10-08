// src/slices/restaurantsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utils/api";

// Fetch Restaurants by City
export const fetchRestaurantsList = createAsyncThunk(
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
      .addCase(fetchRestaurantsList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRestaurantsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurantsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default restaurantsSlice.reducer;
