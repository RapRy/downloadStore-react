import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFeaturedContents } from "../api";

export const get_featured_contents = createAsyncThunk(
  "content/get_featured_contents",
  async (dummy, thunkAPI) => {
    try {
      const { data, status } = await getFeaturedContents();
      if (status === 200) {
        return data;
      }
    } catch (error) {
      const { data, status } = error.response;
      return thunkAPI.rejectWithValue({
        message: data.message,
        errorCode: status,
      });
    }
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState: {
    loadStatus: "idle",
    error: {},
    featuredContents: [],
  },
  extraReducers: {
    [get_featured_contents.pending]: (state) => {
      state.loadStatus = "loading";
    },
    [get_featured_contents.fulfilled]: (state, action) => {
      state.featuredContents = [...action.payload.contents];
      state.loadStatus = "idle";
    },
    [get_featured_contents.rejected]: (state, action) => {
      state.loadStatus = "failed";
      state.error = action.payload;
    },
  },
});

export default contentSlice.reducer;
