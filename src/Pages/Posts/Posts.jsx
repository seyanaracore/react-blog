import { useCallback, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { PostService } from "../../API/PostService";
import NewPost from "../../Components/NewPost/NewPost";
import Pagination from "../../Components/Pagination/Pagination";
import PostsListsHandler from "../../Components/PostsListHandlers/PostsListsHandler";
import Error from "../../Components/UI/Error/Error";
import Loader from "../../Components/UI/Loader/Loader";
import PostsContext from "../../Context";
import useFetching from "../../Hooks/useFetching";
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

   const [fetchPosts, fetchError, isLoading] = useFetching(async () => {
      if (
         postsList[page] &&
         limit === prevLimit &&
         postsList[page].length === limit
      )
         return;
      const response = await PostService.fetchAll(limit, page);
      const posts = response.data;
      setPostsList((prev) => ({ ...prev, [page]: posts }));
      setTotalPosts(response.headers["x-total-count"]);
   });

   const addNewPost = useCallback(
      (post) => {
         const newPost = { ...post, id: new Date().getTime() };

         setPostsList((prev) => {
            return { ...prev, [page]: [...prev[page], newPost] };
         });
      },
      [page]
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
      const currentPage = params.page;
      if (!currentPage) navigate("1");
      
      setPage(currentPage);
   }, [navigate, params.page]);

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
                  itemsTotalCount={totalPosts}
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
