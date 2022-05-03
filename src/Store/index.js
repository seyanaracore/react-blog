import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./reducers/PostsSlice";

const store = configureStore({
   reducer: {
      posts: postsSlice,
   },
});

export default store;
