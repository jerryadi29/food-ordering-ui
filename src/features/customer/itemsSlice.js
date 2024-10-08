// src/slices/itemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClientRestaurantId} from '../../utils/api';

// Async thunk to fetch items by restaurantId
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await getClientRestaurantId(restaurantId);
      return response; // Assuming 'restaurants' contains the items
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to fetch items');
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearItems: (state) => {
      state.list = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload; // Assuming payload is an array of items
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearItems } = itemsSlice.actions;

export default itemsSlice.reducer;
