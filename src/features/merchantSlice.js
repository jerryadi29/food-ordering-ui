import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { merchantAPI,postRestaurantDetails } from "../utils/api";
import axios from 'axios'

// const restaurantData = {
//   "message": "Retrieved 3 restaurants.",
//   "restaurants": [
//       {
//           "restaurantId": 11,
//           "name": "The Gourmet Spot",
//           "description": "A fine dining restaurant with exquisite cuisine.",
//           "address": "123 Main Street, Cityville",
//           "contact": "123-456-7890",
//           "merchantId": 10,
//           "available": true
//       },
//       {
//           "restaurantId": 12,
//           "name": "Pizza Palace",
//           "description": "Best pizza in town with freshly baked ingredients.",
//           "address": "456 Elm Street, Townsville",
//           "contact": "987-654-3210",
//           "merchantId": 10,
//           "available": true
//       },
//       {
//           "restaurantId": 14,
//           "name": "Sushi World",
//           "description": "Fresh sushi with an authentic experience.",
//           "address": "101 Maple Drive, Suburbia",
//           "contact": "333-444-5555",
//           "merchantId": 10,
//           "available": true
//       }
//   ]
// }

export const getRestaurants = createAsyncThunk(
  "merchant/getRestaurants",
  async (merchantId) => {
    const response = await merchantAPI.get(`${merchantId}`); //api will return actaul data once its ready
    return  response.data.restaurants;
  }
);

export const addRestaurant = createAsyncThunk(
  "merchants/addRestaurant",
  async (restaurantData) => {
    try {
      // Simulate a successful API response
      const responsestatus =  postRestaurantDetails(restaurantData)
      return responsestatus; // Mock adding a new restaurant
    } catch (error) {
     console.log(error)
    }
  }
);

const initialState = {
  restaurants: [],
  loading: false,
  error: null,
};

export const merchantSlice = createSlice({
  name: "merchants",
  initialState,
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
        state.restaurants = action.payload;
      })
      .addCase(addRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add restaurants";
      });
  },
});
