import { configureStore } from "@reduxjs/toolkit";
import { merchantSlice } from "../features/merchantSlice";
import { merchantMenuDetailSlice } from "../features/merchantMenuDetailSlice";
import { authSlice } from "../features/authSlice";
import { clientSlice } from "../features/clientSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    merchants: merchantSlice.reducer,
    client : clientSlice.reducer,
    merchantMenuDetail: merchantMenuDetailSlice.reducer,
  },
});
