import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getFeaturedContents,
  getContentsByCat,
  getContentDetails,
} from "../api";

export const get_content_details = createAsyncThunk(
  "content/get_content_details",
  async (id, { signal, rejectWithValue }) => {
    try {
      const { data, status } = await getContentDetails(id);

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

export const get_contents_by_cat = createAsyncThunk(
  "content/get_contents_by_cat",
  async (cat, { signal, rejectWithValue }) => {
    try {
      const { data, status } = await getContentsByCat(cat);
      if (status === 200) return data;
    } catch (error) {
      console.log(error);
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
    contents: {},
    selected: {},
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
    [get_contents_by_cat.pending]: (state) => {
      state.loadStatus = "loading";
    },
    [get_contents_by_cat.fulfilled]: (state, action) => {
      state.contents = action.payload.data;
      state.loadStatus = "idle";
    },
    [get_contents_by_cat.rejected]: (state, action) => {
      state.loadStatus = "failed";
      state.error = action.payload;
    },
    [get_content_details.pending]: (state) => {
      state.loadStatus = "loading";
    },
    [get_content_details.fulfilled]: (state, action) => {
      state.selected = action.payload.content;
      state.loadStatus = "idle";
    },
    [get_content_details.rejected]: (state, action) => {
      state.loadStatus = "failed";
      state.error = action.payload;
    },
  },
});

export default contentSlice.reducer;
