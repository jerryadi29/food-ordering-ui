import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchMerchantRestaurantDetails,
  postUpdatedMerchantRestaurantDetails,
} from "../../utils/api";

export const getRestaurantDetails = createAsyncThunk(
  "client/getRestaurantDetails",
  async (restaurantId) => {
    try {
      const response = await fetchMerchantRestaurantDetails(restaurantId);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addRestaurantDetails = createAsyncThunk(
  "client/addRestaurantDetails",
  async (restaurantDetail) => {
    try {
      const response = await postUpdatedMerchantRestaurantDetails(restaurantDetail);
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

export const merchantMenuDetailSlice = createSlice({
  name: "merchantMenuDetail",
  initialState: restaurantDetailInitialState,
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurantDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getRestaurantDetails.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload, "---payload---");
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
