import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { getCategories } from "../api";

export const get_categories = createAsyncThunk(
  "category/get_categories",
  async (all, { rejectWithValue, signal }) => {
    try {
      const source = axios.CancelToken.source();

      signal.addEventListener("abort", () => {
        source.cancel();
      });

      const { data, status } = await getCategories(source);
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

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    loadStatus: "idle",
    error: {},
    categories: [],
  },
  extraReducers: {
    [get_categories.pending]: (state) => {
      state.loadStatus = "loading";
    },
    [get_categories.fulfilled]: (state, action) => {
      state.categories = [...action.payload.categories];
      state.loadStatus = "idle";
    },
    [get_categories.rejected]: (state, action) => {
      state.loadStatus = "failed";
      state.error = action.payload;
    },
  },
});

export default categorySlice.reducer;
