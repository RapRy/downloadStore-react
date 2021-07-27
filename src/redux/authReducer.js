import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateProfile } from "../api";

export const update_profile = createAsyncThunk(
  "auth/update_profile",
  async (formData, { rejectWithValue }) => {
    try {
      const { data, status } = await updateProfile(formData);

      if (status === 200) return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({
        message: data.message,
        errorCode: status,
      });
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loadStatus: "idle",
    successStatus: false,
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
    sign_out: (state) => {
      state.loadStatus = "idle";
      state.profile = {};
      localStorage.removeItem("profile");
    },
    reset_success_status: (state) => {
      state.successStatus = false;
    },
  },
  extraReducers: {
    [update_profile.pending]: (state) => {
      state.loadStatus = "loading";
    },
    [update_profile.fulfilled]: (state, action) => {
      const { token } = state.profile;
      state.profile = { user: action.payload.user, token };
      localStorage.setItem(
        "profile",
        JSON.stringify({ user: action.payload.user, token })
      );
      state.successStatus = true;
      state.loadStatus = "idle";
    },
    [update_profile.rejected]: (state, action) => {
      state.loadStatus = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  sign_in_api,
  loading_status,
  sign_in_ls,
  sign_out,
  reset_success_status,
} = authSlice.actions;

export default authSlice.reducer;
