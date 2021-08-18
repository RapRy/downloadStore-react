import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { update_reviews, update_comments } from "./authReducer";

import {
  getFeaturedContents,
  getContentsByCat,
  getContentDetails,
  createReview,
  createComment,
} from "../api";

export const create_comment = createAsyncThunk(
  "content/create_comment",
  async (rawData, { rejectWithValue, dispatch }) => {
    try {
      const { formData, indexReview } = rawData;
      const { data, status } = await createComment(formData);

      if (status === 200) {
        dispatch(update_comments(data.latestComment._id));
        return { data, indexReview };
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

export const create_review = createAsyncThunk(
  "content/create_review",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const { data, status } = await createReview(formData);

      if (status === 200) {
        dispatch(update_reviews(data.review._id));
        return data;
      }
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

export const get_content_details = createAsyncThunk(
  "content/get_content_details",
  async (id, { signal, rejectWithValue }) => {
    try {
      const source = axios.CancelToken.source();

      signal.addEventListener("abort", () => {
        source.cancel();
      });

      const { data, status } = await getContentDetails(id, source);

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
  async (args, { rejectWithValue }) => {
    const { cat, source } = args;
    try {
      const { data, status } = await getContentsByCat(cat, source);
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
    contents: {},
    selected: {
      details: {},
      reviews: [],
    },
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
      state.selected.details = action.payload.content;
      const reviews = action.payload.reviews.map((review) => ({
        ...review,
        comments: review.comments.reverse(),
      }));
      state.selected.reviews = reviews.reverse();
      state.loadStatus = "idle";
    },
    [get_content_details.rejected]: (state, action) => {
      state.loadStatus = "failed";
      state.error = action.payload;
    },
    [create_review.pending]: (state) => {
      state.loadStatus = "sending form";
    },
    [create_review.fulfilled]: (state, action) => {
      state.selected.reviews = [
        action.payload.review,
        ...state.selected.reviews,
      ];
      state.loadStatus = "idle";
    },
    [create_review.rejected]: (state, action) => {
      state.loadStatus = "failed";
      state.error = action.payload;
    },
    [create_comment.pending]: (state) => {
      state.loadStatus = "sending form";
    },
    [create_comment.fulfilled]: (state, action) => {
      const { data, indexReview } = action.payload;
      state.selected.reviews[indexReview].comments = [
        data.latestComment,
        ...state.selected.reviews[indexReview].comments,
      ];
      state.loadStatus = "idle";
    },
    [create_comment.rejected]: (state, action) => {
      state.loadStatus = "failed";
      state.error = action.payload;
    },
  },
});

export default contentSlice.reducer;
