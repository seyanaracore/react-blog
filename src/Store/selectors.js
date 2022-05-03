export const selectTotalPages = (state) =>
   Math.ceil(state.posts.totalPosts / state.posts.limit);
export const selectPage = (state) => state.posts.page;
export const selectLimit = (state) => state.posts.limit;
export const selectTotalPosts = (state) => state.posts.totalPosts;
export const selectPostsList = (state) => state.posts.postsList;
export const selectFetchError = (state) => state.posts.error;
export const selectIsLoading = (state) => state.posts.isLoading;
