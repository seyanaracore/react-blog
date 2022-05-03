import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "./ActionCreators";

const postsSlice = createSlice({
   name: "posts",
   initialState: {
      page: undefined,
      totalPosts: undefined,
      limit: 10,
      postsList: [],
      isLoading: false,
      error: null,
   },
   reducers: {
      setPage(state, action) {
         state.page = action.payload;
      },
      setLimit(state, action) {
         state.limit = action.payload;
      },
   },
   extraReducers: {
      [fetchPosts.fulfilled]: (state, action) => {
         state.isLoading = false;
         state.error = null;
         state.postsList = action.payload.postsList;
         state.totalPosts = action.payload.postsTotalCount;
      },
      [fetchPosts.pending]: (state) => {
         state.isLoading = true;
      },
      [fetchPosts.rejected]: (state, action) => {
         state.isLoading = false;
         state.error = action.payload;
      },
   },
});

export const { setLimit, setPage } = postsSlice.actions;
export default postsSlice.reducer;
