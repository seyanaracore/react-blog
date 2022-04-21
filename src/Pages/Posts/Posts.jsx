import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { PostService } from "../../API/PostService";
import NewPost from "../../Components/NewPost/NewPost";
import Pagination from "../../Components/Pagination/Pagination";
import PostsListsHandler from "../../Components/PostsListHandlers/PostsListsHandler";
import Error from "../../Components/UI/Error/Error";
import Loader from "../../Components/UI/Loader/Loader";
import PostsContext from "../../Context";
import useFetching from "../../Hooks/useFetching";
import { usePagination } from "../../Hooks/usePagination";
import usePrevious from "../../Hooks/usePrev";
import "../../Styles/App.css";

function Posts() {
   const navigate = useNavigate();
   const params = useParams();

   const { postsList, setPostsList } = useContext(PostsContext);
   const { totalPosts, setTotalPosts } = useContext(PostsContext);
   const [handledPosts, setHandledPosts] = useState([]);

   const [page, setPage] = useState(null);
   const [limit, setLimit] = useState(10);
   const prevLimit = usePrevious(limit);
   const pagesList = usePagination(totalPosts, limit);
   const currentPage = params.page;

   const [fetchPosts, fetchError, isLoading] = useFetching(async () => {
      if (
         postsList[page] //&&
         // limit === prevLimit &&
         // postsList[page].length === limit
      )
         return;
      const response = await PostService.fetchAll(limit, page);
      const posts = response.data;
      setPostsList((prev) => ({ ...prev, [page]: posts }));
      if (!totalPosts) setTotalPosts(+response.headers["x-total-count"]);
   });

   const addNewPost = useCallback(
      async (post) => {
         const response = await PostService.newPost(post);
         const newPost = response.data;
         setTotalPosts(totalPosts + 1);

         const pageNum = pagesList.length;

         setPostsList((prev) => {
            return {
               ...prev,
               [pageNum]: [...prev[pageNum], newPost],
            };
         });
      },
      [pagesList, totalPosts, setTotalPosts, setPostsList]
   );

   const deletePost = useCallback(
      (post) => {
         setPostsList((prev) => {
            return {
               ...prev,
               [page]: prev[page].filter((p) => p.id !== post.id),
            };
         });
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

      setPage(currentPage);
   }, [navigate, currentPage]);

   useEffect(() => {
      if (pagesList.length && currentPage > pagesList.length)
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
