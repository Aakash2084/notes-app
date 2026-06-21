import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

const initialState = {
  user: null,

  // AUTH CHECK LOADING
  authLoading: true,

  // NORMAL FORM LOADING
  loading: false,

  error: null,

  isAuthenticated: false,
};

export const signupUser = createAsyncThunk(
  "auth/signupUser",

  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/user/signup", userData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Signup Failed",
      );
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (userData, thunkAPI) => {
    try {
      const response = await api.post("/user/login", userData);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Login Failed",
      );
    }
  },
);

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",

  async (_, thunkAPI) => {
    try {
      const response = await api.get("/user/profile");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Unauthorized",
      );
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",

  async (_, thunkAPI) => {
    try {
      const response = await api.post("/user/logout");

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || "Logout Failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // SIGNUP
      .addCase(signupUser.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;

        state.isAuthenticated = true;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // CHECK AUTH
      .addCase(checkAuth.pending, (state) => {
        state.authLoading = true;
      })

      .addCase(checkAuth.fulfilled, (state, action) => {
        state.authLoading = false;

        state.user = action.payload.user;
        state.isAuthenticated = true;
      })

      .addCase(checkAuth.rejected, (state) => {
        state.authLoading = false;

        state.user = null;

        state.isAuthenticated = false;
      })

      // LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;

        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
