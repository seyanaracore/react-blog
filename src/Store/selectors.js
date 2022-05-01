export const selectTotalPages = (state) => {
   const postsTotalPages =
      Math.ceil(state.posts.totalPosts / state.posts.limit) || null;
   const postsListLastPage = +Object.keys(state.posts.postsList).at(-1) || null;

   return Math.max(postsListLastPage, postsTotalPages) || null;
};
export const selectPage = (state) => state.posts.page;
export const selectLimit = (state) => state.posts.limit;
export const selectTotalPosts = (state) => state.posts.totalPosts;
export const selectPagePosts = (state) =>
   state.posts.postsList[state.posts.page] || [];
export const selectPostsList = (state) => state.posts.postsList;
export const selectHandledPosts = (state) => state.posts.handledPosts || [];
