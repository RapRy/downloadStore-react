import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { deactivateAccount, getActivities } from "../api";

export const get_activities = createAsyncThunk(
  "auth/get_activities",
  async (id, { rejectWithValue, signal }) => {
    try {
      const source = axios.CancelToken.source();

      signal.addEventListener("abort", () => {
        source.cancel();
      });

      const { data, status } = await getActivities({ id, source });

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

export const update_account = createAsyncThunk(
  "auth/update_profile",
  async ({ formData, apiRequest }, { rejectWithValue }) => {
    try {
      const { data, status } = await apiRequest(formData);

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

export const deactivate_account = createAsyncThunk(
  "auth/deactivate_account",
  async (id, { rejectWithValue }) => {
    try {
      const { data, status } = await deactivateAccount(id);
      if (status === 200) {
        return data;
      }
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
    error: {},
    profile: {},
    activities: [],
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
    update_reviews: (state, action) => {
      state.profile.user.meta.reviews = [
        ...state.profile.user.meta.reviews,
        action.payload,
      ];
    },
  },
  extraReducers: {
    [update_account.pending]: (state) => {
      state.loadStatus = "loading";
    },
    [update_account.fulfilled]: (state, action) => {
      const { token } = state.profile;
      state.profile = { user: action.payload.user, token };
      localStorage.setItem(
        "profile",
        JSON.stringify({ user: action.payload.user, token })
      );
      state.loadStatus = "idle";
    },
    [update_account.rejected]: (state, action) => {
      state.loadStatus = "failed";
      state.error = action.payload;
    },
    [deactivate_account.pending]: (state) => {
      state.loadStatus = "loading";
    },
    [deactivate_account.fulfilled]: (state, action) => {
      localStorage.removeItem("profile");
      state.profile = {};
      state.loadStatus = "idle";
    },
    [deactivate_account.rejected]: (state, action) => {
      state.loadStatus = "failed";
      state.error = action.payload;
    },
    [get_activities.pending]: (state) => {
      state.loadStatus = "loading";
    },
    [get_activities.fulfilled]: (state, action) => {
      state.activities = action.payload.activities;
      state.loadStatus = "idle";
    },
    [get_activities.rejected]: (state, action) => {
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
  update_reviews,
} = authSlice.actions;

export default authSlice.reducer;
