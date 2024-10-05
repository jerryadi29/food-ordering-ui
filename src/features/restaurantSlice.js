import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchRestaurantDetails,
  postUpdatedRestaurantDetails,
} from "../utils/api";

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

export const addRestaurantDetails = createAsyncThunk(
  "restaurant/addRestaurantDetails",
  async (restaurantDetail) => {
    try {
      const response = await postUpdatedRestaurantDetails(restaurantDetail);
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
        console.log(action.payload, "payload====");
        state.details = action.payload;
      })
      .addCase(getRestaurantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch restaurants";
      })
      .addCase(addRestaurantDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addRestaurantDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(addRestaurantDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to post restaurants";
      });
  },
});
