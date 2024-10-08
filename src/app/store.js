import { configureStore } from "@reduxjs/toolkit";
import { merchantSlice } from "../features/merchant/merchantSlice";
import { merchantMenuDetailSlice } from "../features/merchant/merchantMenuDetailSlice";
import { authSlice } from "../features/authSlice";
import { customerSlice } from "../features/customer/customerSlice";
import { customerMenuDetailSlice } from "../features/customer/customerMenuDetailSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    merchants : merchantSlice.reducer,
    customer : customerSlice.reducer,
    customerMenuDetail : customerMenuDetailSlice.reducer,
    merchantMenuDetail: merchantMenuDetailSlice.reducer,
  },
});
