import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance ,fetchMerchantRestaurantDetails,postMerchantRestaurantDetails } from "../../utils/api";
import {restaurantListData}  from '../../utils/response'


export const getRestaurants = createAsyncThunk(
  "merchant/getRestaurants",
  async (merchantId) => {
    // const response = await fetchMerchantRestaurantDetails(merchantId); //api will return actaul data once its ready
    // return  response;
    return restaurantListData.restaurants
  }
);

export const addRestaurant = createAsyncThunk(
  "merchants/addRestaurant",
  async (restaurantData) => {
    try {
      // Simulate a successful API response
      const responsestatus = await postMerchantRestaurantDetails(restaurantData)
      console.log("_____")
      console.log(responsestatus);
      return responsestatus; // Mock adding a new restaurant
    } catch (error) {
     console.log(error)
    }
  }
);

const restaurantListInitialState = {
  restaurants: [],
  loading: false,
  error: null,
};

export const merchantSlice = createSlice({
  name: "merchants",
  initialState: restaurantListInitialState,
  reducers: {
    addRestaurant(state, action) {
      state.list.push(action.payload);
    },
    setRestaurant(state, action) {
      state.list = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRestaurants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload;
      })
      .addCase(getRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch restaurants";
      })
      .addCase(addRestaurant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants.push(action.payload); // Append the new restaurant
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add restaurants";
      });
  },
});
