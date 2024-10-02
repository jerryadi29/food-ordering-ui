import { configureStore } from "@reduxjs/toolkit";
import { merchantSlice } from "../features/merchantSlice";
import {restaurantDetailSlice } from '../features/restaurantSlice'

export const store = configureStore({
    reducer: {
        'merchants': merchantSlice.reducer,
        'restaurant': restaurantDetailSlice.reducer
    }
})