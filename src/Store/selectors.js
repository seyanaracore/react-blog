export const selectTotalPages = (state) =>
   Math.ceil(state.posts.postsTotal / state.posts.limit) || 1;
export const selectPage = (state) => state.posts.page;
export const selectLimit = (state) => state.posts.limit;
export const selectTotalPosts = (state) => state.posts.totalPosts;
export const selectPagePosts = (state) =>
   state.posts.postsList[state.posts.page] || [];
export const selectPostsList = (state) => state.posts.postsList
export const selectHandledPosts = (state) => state.posts.handledPosts || [];
