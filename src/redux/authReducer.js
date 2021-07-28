import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    sign_out: (state) => {
      state.loadStatus = "idle";
      state.profile = {};
      localStorage.removeItem("profile");
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
  },
});

export const { sign_in_api, loading_status, sign_in_ls, sign_out } =
  authSlice.actions;

export default authSlice.reducer;
