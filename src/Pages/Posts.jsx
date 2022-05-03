/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { PostService } from "../API/PostService";
import NewPost from "../Components/NewPost/NewPost";
import Pagination from "../Components/Pagination/Pagination";
import PostsListsHandler from "../Components/PostsListHandlers/PostsListsHandler";
import Error from "../Components/UI/Error/Error";
import Loader from "../Components/UI/Loader/Loader";
import { fetchPosts } from "../Store/reducers/ActionCreators";
// import useFetching from "../Hooks/useFetching";
import { setLimit, setPage } from "../Store/reducers/PostsSlice";
import {
   selectFetchError,
   selectIsLoading,
   selectLimit,
   selectPage,
   selectTotalPages,
} from "../Store/selectors";
import "../Styles/App.css";

function Posts() {
   const navigate = useNavigate();
   const params = useParams();
   const dispatch = useDispatch();

   const [handledPosts, setHandledPosts] = useState([]);

   const page = useSelector(selectPage);
   const limit = useSelector(selectLimit);
   const totalPages = useSelector(selectTotalPages);
   const currentPage = +params.page;

   const fetchError = useSelector(selectFetchError);
   const isLoading = useSelector(selectIsLoading);

   const handleFetchPosts = useCallback(() => {
      page && dispatch(fetchPosts());//todo: замыкает undefined
   }, [page]);

   const addNewPost = useCallback(async (post) => {
      post.author = "User";
      await PostService.newPost(post);
      handleFetchPosts();
   }, []);

   const deletePost = useCallback(async (post) => {
      await PostService.deletePost(post);
      handleFetchPosts();
   }, []);

   const navigateToPage = useCallback(
      (pageNum) => {
         navigate(pageNum.toString());
      },
      [navigate]
   );

   useEffect(() => {
      if (!currentPage) {
         navigate("1");
      } else if (totalPages && currentPage > totalPages) {
         navigate(totalPages.toString());
      } else {
         dispatch(setPage(currentPage));
      }
   }, [currentPage, totalPages]);

   useEffect(() => {
      handleFetchPosts();
   }, [page, limit]);

   return (
      <div className="App">
         <NewPost addPostHandler={addNewPost} />
         <PostsListsHandler
            setHandledPosts={setHandledPosts}
            // postsList={postsList}
         />
         {fetchError && <Error errorMessage={fetchError} />}
         {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
               <Loader />
            </div>
         ) : (
            <>
               <Outlet context={{ postsList: handledPosts, deletePost }} />
               <Pagination
                  limit={limit}
                  setLimit={(limit) => dispatch(setLimit(limit))}
                  curPage={page}
                  setPage={navigateToPage}
               />
            </>
         )}
      </div>
   );
}

export default Posts;
