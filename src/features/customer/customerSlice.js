// src/slices/restaurantsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {axiosInstance} from '../../utils/api';

// Async thunk to fetch restaurants by city
export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (city, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/get-restaurant/${city}`);
      return response.data.restaurants;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch restaurants');
    }
  }
);

export const customerSlice = createSlice({
  name: 'restaurants',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurants.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchRestaurants.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.list = action.payload;
    });
    builder.addCase(fetchRestaurants.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

