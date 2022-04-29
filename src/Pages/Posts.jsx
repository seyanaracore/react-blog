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
import { usePagination } from "../Hooks/usePagination";
import {
   addPost, setPage, setPagePosts, setTotalPosts
} from "../Store/postsSlice";
import {
   selectPage,
   selectPostsList,
   selectTotalPosts
} from "../Store/selectors";
import "../Styles/App.css";

function Posts() {
   const navigate = useNavigate();
   const params = useParams();
   const dispatch = useDispatch();

   const postsList = useSelector(selectPostsList);
   console.log(postsList);
   const totalPosts = useSelector(selectTotalPosts);
   const [handledPosts, setHandledPosts] = useState([]);

   const page = useSelector(selectPage);
   const [limit, setLimit] = useState(10);
   const pagesList = usePagination(totalPosts, limit);
   const currentPage = +params.page;

   const [fetchPosts, fetchError, isLoading] = useFetching(async () => {
      if (postsList[page]) return;
      const response = await PostService.fetchAll(limit, page);
      const posts = response.data;

      dispatch(setPagePosts(posts));
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
         // setPostsList((prev) => {
         //    return {
         //       ...prev,
         //       [page]: prev[page].filter((p) => p.id !== post.id),
         //    };
         // });
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
      if (!currentPage) navigate("1");

      dispatch(setPage(currentPage));
   }, [currentPage, dispatch, navigate]);

   useEffect(() => {
      if (currentPage && pagesList.length && currentPage > pagesList.length)
         navigate(pagesList.length.toString());
   }, [limit, currentPage, navigate, pagesList.length]);

   useEffect(() => {
      fetchPosts();
   }, [page, limit]);

   return (
      <div className="App">
         <NewPost addPostHandler={addNewPost} />
         <PostsListsHandler
            setHandledPosts={setHandledPosts}
            postsList={postsList[page] || []}
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
                  pagesList={pagesList}
                  limit={limit}
                  setLimit={setLimit}
                  curPage={page}
                  setPage={navigateToPage}
               />
            </>
         )}
      </div>
   );
}

export default Posts;
