import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import contentReducer from "./contentReducer";
import categoriesReducer from "./categoriesReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    contents: contentReducer,
    categories: categoriesReducer,
  },
});
