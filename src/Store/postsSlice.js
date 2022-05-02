import { createSlice } from "@reduxjs/toolkit";

// const getInitialLastPage = (totalPosts, limit)

const postsSlice = createSlice({
   name: "posts",
   initialState: {
      page: null,
      limit: 10,
      totalPosts: 0,
      postsList: {},
      userPosts: {},
      handledPosts: [],
   },
   reducers: {
      setPagePosts(state, action) {
         state.postsList[state.page] = [
            ...action.payload,
            ...(state.userPosts[state.page] || []), //Примешиваем посты юзера
         ];
         //После - удаляем их из списка
         const userPosts = { ...state.userPosts };
         delete userPosts[state.page];
         state.userPosts = userPosts;
      },
      addPost(state, action) {
         state.totalPosts++;

         //Вычисляем последнюю возможную страницу
         const postsTotalPages = Math.ceil(state.totalPosts / state.limit) || 1;
         const postsListLastPage = Object.keys(state.postsList).at(-1) || 1;
         const lastPage = Math.max(postsListLastPage, postsTotalPages);

         //Если страница полна - выбираем следующую
         const pageNum =
            state.postsList[lastPage]?.length === state.limit
               ? lastPage + 1
               : lastPage;

         state.postsList[pageNum]
            ? state.postsList[pageNum].push(action.payload)
            : (state.userPosts[pageNum] = [action.payload]);
         //Если посты ещё не были получены с апи добавляем в список юзер постов
      },
      removePost(state, action) {
         state.postsList[state.page] = state.postsList[state.page].filter(
            (post) => post.id !== action.payload.id
         );

         //todo: добавить проверку последняя ли страница
         if (!state.postsList[state.page].length) {//Если постов не осталось удаляем номер страницы из объекта
            const postsList = { ...state.postsList };
            delete postsList[state.page];
            state.postsList = postsList;
         }
         state.totalPosts--;
      },
      setTotalPosts(state, action) {
         state.totalPosts = action.payload;
      },
      setPage(state, action) {
         state.page = action.payload;
      },
      setLimit(state, action) {
         state.limit = action.payload;
         state.postsList = {};
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
