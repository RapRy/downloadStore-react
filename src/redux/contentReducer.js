import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getFeaturedContents, getContentsBySub } from "../api";

export const get_contents_by_sub = createAsyncThunk(
  "content/get_contents_by_sub",
  async (subcat, { signal, rejectWithValue }) => {
    try {
      const { data, status } = await getContentsBySub(subcat);
      console.log(data);
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

export const get_featured_contents = createAsyncThunk(
  "content/get_featured_contents",
  async (all, thunkAPI) => {
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
    contents: [],
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
    [get_contents_by_sub.pending]: (state) => {
      state.loadStatus = "loading";
    },
    [get_contents_by_sub.fulfilled]: (state, action) => {
      state.contents = [...state.contents, action.payload];
      state.loadStatus = "idle";
    },
    [get_contents_by_sub.rejected]: (state, action) => {
      state.loadStatus = "failed";
      state.error = action.payload;
    },
  },
});

export default contentSlice.reducer;
