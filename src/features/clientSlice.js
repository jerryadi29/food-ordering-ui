import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postUserLoginDetails, getUserDetails,getClientRestaurants,getClientRestaurantId } from "../utils/api";
import { clientMenuDetail } from "../utils/response";

export const userCreditDetail = createAsyncThunk(
  "client/userCreditDetail",
  async (credentials) => {
    try {
      const userId = await postUserLoginDetails(credentials);
      const userDetail = await getUserDetails(
        `http://localhost:9090/food-ordering/users/getCredit/${userId}`
      );
      return userDetail;
    } catch (error) {}
  }
);

export const fetchClientRestaurants = createAsyncThunk(
  "client/fetchClientRestaurants",
  async (cityName) => {
    const response = await getClientRestaurants(cityName);
    return response;
  }
);

export const fetchClientMenuDetails = createAsyncThunk(
  "client/fetchClientMenuDetails",
  async (restaurantId) => {
    const response = await getClientRestaurantId(restaurantId);
    return response;
  }
);

export const clientSlice = createSlice({
  name: "client",
  initialState: {
    loading: null,
    userDetail: { credit: 10000, cityName: 'bangalore' },
    restaurantDetails: [],
    menuDetail:[],
    token: null,
    error: null,
  },
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(userCreditDetail.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(userCreditDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(userCreditDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch restaurants";
      });

      builder.addCase(fetchClientRestaurants.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchClientRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurantDetails = action.payload
      })
      .addCase(fetchClientRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch restaurants";
      });

      builder.addCase(fetchClientMenuDetails.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchClientMenuDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.menuDetail = action.payload
      })
      .addCase(fetchClientMenuDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch restaurants";
      });
  },
});
