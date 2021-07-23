import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import contentReducer from "./contentReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    contents: contentReducer,
  },
});
