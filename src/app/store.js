import { configureStore } from "@reduxjs/toolkit";
import { merchantSlice } from "../features/merchantSlice";

export const store = configureStore({
    reducer: {
        'merchants': merchantSlice.reducer
    }
})