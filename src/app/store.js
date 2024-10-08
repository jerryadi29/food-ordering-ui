import { configureStore } from "@reduxjs/toolkit";
import { merchantSlice } from "../features/merchant/merchantSlice";
import { merchantMenuDetailSlice } from "../features/merchant/merchantMenuDetailSlice";
import { authSlice } from "../features/authSlice";
import restaurantsReducer from '../features/customer/restaurantsSlice';
import itemsReducer from '../features/customer/itemsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    merchants : merchantSlice.reducer,
    merchantMenuDetail: merchantMenuDetailSlice.reducer,
    restaurants: restaurantsReducer,
    items: itemsReducer,
  },
});
