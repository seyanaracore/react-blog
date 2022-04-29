import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
   name: "posts",
   initialState: {
      page: null,
      limit: 10,
      totalPosts: 0,
      postsList: {},
      handledPosts: [],
   },
   reducers: {
      setPagePosts(state, action) {
         state.postsList[state.page] = [
            ...action.payload,
            ...(state.postsList[state.page] || []),
         ];
      },
      addPost(state, action) {
         const pageNum = Math.ceil(state.totalPosts / state.limit);
         state.postsList[pageNum]
            ? state.postsList[pageNum].push(action.payload)
            : (state.postsList[pageNum] = [action.payload]);
      },
      removePost(state, action) {
         state.postsList[state.page] = state.postsList[state.page].filter(
            (post) => post.id !== action.payload
         );
      },
      setTotalPosts(state, action) {
         state.totalPosts = action.payload;
      },
      setPage(state, action) {
         state.page = action.payload;
      },
      setLimit(state, action) {
         state.limit = action.payload;
      },
      setHandledPosts(state, action) {
         state.handledPosts = action.payload;
      },
   },
});

export const {
   setHandledPosts,
   setLimit,
   setPage,
   setPagePosts,
   addPost,
   removePost,
   setTotalPosts,
} = postsSlice.actions;
export default postsSlice.reducer;