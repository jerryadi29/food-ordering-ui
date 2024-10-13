// src/slices/itemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getClientRestaurantId} from '../../utils/api';

// Async thunk to fetch items by restaurantId
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (restaurantId, { rejectWithValue }) => {
    try {
      const response = await getClientRestaurantId(restaurantId);
      const initialQuantityResponse = response.map((eachItem)=>{
        return {...eachItem, quantity: 0}
      })
      return initialQuantityResponse; // Assuming 'restaurants' contains the items
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
    incrementQuantity: (state, action) => {
      const item = state.list[action.payload];
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      console.log(state)
      const item = state.list[action.payload];
      if (item && item.quantity >= 1) {
        item.quantity -= 1;
      }
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


export const { clearItems, incrementQuantity,decrementQuantity  } = itemsSlice.actions;

export default itemsSlice.reducer;
