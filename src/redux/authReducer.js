import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loadStatus: "idle",
    error: {},
    profile: {},
  },
  reducers: {
    loading_status: (state, action) => {
      state.loadStatus = action.payload;
    },
    sign_in_api: (state, action) => {
      state.loadStatus = "idle";
      state.profile = action.payload;
      localStorage.setItem("profile", JSON.stringify(action.payload));
    },
    sign_in_ls: (state, action) => {
      state.loadStatus = "idle";
      state.profile = JSON.parse(action.payload);
    },
  },
  extraReducers: {},
});

export const { sign_in_api, loading_status, sign_in_ls } = authSlice.actions;

export default authSlice.reducer;
