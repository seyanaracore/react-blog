import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostService } from "../../API/PostService";

export const fetchPosts = createAsyncThunk(
   "fetchPostsStatus",
   async (_, { getState, rejectWithValue }) => {
		const state = getState().posts;
      try {
         const response = await PostService.fetchPosts(state.limit, state.page);
         const postsList = response.data;
         const postsTotalCount = +response.headers["x-total-count"];

         return { postsList, postsTotalCount };
      } catch (e) {
         rejectWithValue(e.message);
      }
   }
);
