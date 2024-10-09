import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUserDetails,
  postSignInDetails,
  postSignUpDetails,
  getClientCreditDetails,
} from "../utils/api";

export const signinCustomer = createAsyncThunk(
  "auth/login",
  async ({ email, password}, thunkAPI) => {
    const credentials = { email, password};
    try {
      const response = await postSignInDetails(
        "/authentication/sign-in/customer",
        credentials
      );
      return { ...response, userType: "customer" };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signupCustomer = createAsyncThunk(
  "auth/signupCustomer",
  async ({ email, password, city }, thunkAPI) => {
    const credentials = { email, password, city };

    try {
      const response = await postSignUpDetails(
        "/authentication/sign-up/customer",
        credentials
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Signup Failed"
      );
    }
  }
);

// Login for Merchant
export const signinMerchant = createAsyncThunk(
  "auth/loginMerchant",
  async ({ email, password, userType }, thunkAPI) => {
    try {
      const response = await postSignInDetails(
        "/authentication/sign-in/merchant",
        {
          email,
          password,
        }
      );
      return { ...response, userType: "merchant" };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Login Failed"
      );
    }
  }
);

// Signup for Merchant
export const signupMerchant = createAsyncThunk(
  "auth/signupMerchant",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await postSignUpDetails(
        "/authentication/sign-up/merchant",
        {
          email,
          password,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Signup Failed"
      );
    }
  }
);

export const fetchCredit = createAsyncThunk(
  "auth/fetchCredit",
  async (customerId, thunkAPI) => {
    try {
      const response = await getClientCreditDetails(
        customerId
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response.data.message || "Fetching Credit Failed"
      );
    }
  }
);

// Async thunk for user logout
export const logout = createAsyncThunk("auth/logout", async () => {});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    credit: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.credit = 0;
      state.status = "idle";
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    // Customer Sign-Up
    builder.addCase(signupCustomer.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signupCustomer.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(signupCustomer.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // Merchant Sign-Up
    builder.addCase(signupMerchant.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signupMerchant.fulfilled, (state, action) => {
      state.status = "succeeded";
    });
    builder.addCase(signupMerchant.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // Customer Sign-In
    builder.addCase(signinCustomer.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signinCustomer.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = {
        email: action.payload.email,
        customerId: action.payload.customerId,
        city: action.payload.city,
        role: "customer",
      };
      // Save to localStorage
      console.log("--hero aaya---",state)
      localStorage.setItem("user", JSON.stringify(state.user));
    });
    builder.addCase(signinCustomer.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // Merchant Sign-In
    builder.addCase(signinMerchant.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signinMerchant.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = {
        email: action.meta.arg.email,
        merchantId: action.payload.merchantId,
        role: "merchant",
      };
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(state.user));
    });
    builder.addCase(signinMerchant.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // Fetch Credit
    builder.addCase(fetchCredit.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCredit.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.credit = action.payload;
    });
    builder.addCase(fetchCredit.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { setUser } = authSlice.actions;

