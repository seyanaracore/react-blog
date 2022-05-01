import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { PostService } from "../API/PostService";
import NewPost from "../Components/NewPost/NewPost";
import Pagination from "../Components/Pagination/Pagination";
import PostsListsHandler from "../Components/PostsListHandlers/PostsListsHandler";
import Error from "../Components/UI/Error/Error";
import Loader from "../Components/UI/Loader/Loader";
import useFetching from "../Hooks/useFetching";
import {
   addPost,
   removePost,
   setPage,
   setPagePosts,
   setTotalPosts,
   setLimit,
} from "../Store/postsSlice";
import {
   selectLimit,
   selectPage,
   selectPagePosts,
   selectTotalPages,
   selectTotalPosts,
} from "../Store/selectors";
import "../Styles/App.css";

function Posts() {
   const navigate = useNavigate();
   const params = useParams();
   const dispatch = useDispatch();

   const postsList = useSelector(selectPagePosts);
   const totalPosts = useSelector(selectTotalPosts);
   const [handledPosts, setHandledPosts] = useState([]);

   const page = useSelector(selectPage);
   const limit = useSelector(selectLimit);
   const totalPages = useSelector(selectTotalPages);
   const currentPage = +params.page;

   const [fetchPosts, fetchError, isLoading] = useFetching(async () => {
      if (!page || postsList.length) return;
      const response = await PostService.fetchAll(limit, page);
      const posts = response.data;

      posts.length && dispatch(setPagePosts(posts));
      if (!totalPosts)
         dispatch(setTotalPosts(+response.headers["x-total-count"]));
   });

   const addNewPost = useCallback(
      async (post) => {
         const response = await PostService.newPost(post);
         const newPost = response.data;

         dispatch(addPost(newPost));
      },
      [dispatch]
   );

   const deletePost = useCallback(
      (post) => {
         dispatch(removePost(post));
      },
      [page]
   );

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
   }, [currentPage, dispatch, totalPages, navigate]);

   useEffect(() => {
      fetchPosts();
   }, [page, limit]);

   return (
      <div className="App">
         <NewPost addPostHandler={addNewPost} />
         <PostsListsHandler
            setHandledPosts={setHandledPosts}
            postsList={postsList}
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
