import { useCallback, useEffect, useState } from "react";
import { PostService } from "./API/PostService";
import NewPost from "./Components/NewPost/NewPost";
import Pagination from "./Components/Pagination/Pagination";
import PostsList from "./Components/PostsList/PostsList";
import PostsListsHandler from "./Components/PostsListHandlers/PostsListsHandler";
import Loader from "./Components/UI/Loader/Loader";
import useFetching from "./Hooks/useFetching";
import "./Styles/App.css";

function App() {
   const [postsList, setPostsList] = useState({});
   const [handledPosts, setHandledPosts] = useState(postsList);
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(10);
   const [totalPosts, setTotalPosts] = useState(0);
   const [fetchPosts, fetchError, isLoading] = useFetching(async () => {
      if (postsList[page]) return;
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

   useEffect(() => {
      fetchPosts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page]);

   return (
      <div className="App">
         <NewPost addPostHandler={addNewPost} />
         <PostsListsHandler
            setHandledPosts={setHandledPosts}
            postsList={postsList[page] || []}
         />
         {fetchError && (
            <h1 style={{ textAlign: "center", color: "red" }}>
               Error: {fetchError}
            </h1>
         )}
         {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
               <Loader />
            </div>
         ) : (
            <>
               <PostsList postsList={handledPosts} deletePost={deletePost} />
               <Pagination
                  itemsTotalCount={totalPosts}
                  limit={limit}
                  curPage={page}
                  setPage={setPage}
               />
            </>
         )}
      </div>
   );
}

export default App;
