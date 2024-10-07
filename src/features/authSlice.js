import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  postUserLoginDetails,
  postSignInDetails,
  getUserDetails,
} from "../utils/api";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials) => {
    try {
      const response = await postUserLoginDetails(credentials);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await postSignInDetails(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for checking authentication status (optional)
export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await getUserDetails();
  return response;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    token: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });

    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });

    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || "Authentication failed";
      });
  },
});
