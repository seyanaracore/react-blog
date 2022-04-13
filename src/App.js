import { useCallback, useEffect, useState } from "react";
import { PostService } from "./API/PostService";
import NewPost from "./Components/NewPost/NewPost";
import PostsList from "./Components/PostsList/PostsList";
import PostsListsHandler from "./Components/PostsListHandlers/PostsListsHandler";
import Loader from "./Components/UI/Loader/Loader";
import useFetching from "./Hooks/useFetching";
import "./Styles/App.css";

function App() {
   const [postsList, setPostsList] = useState([]);
   const [handledPosts, setHandledPosts] = useState(postsList);
   const [fetchPosts, fetchError, isLoading] = useFetching(async () => {
      const posts = await PostService.fetchAll();
      setPostsList(posts);
   });

   const addNewPost = useCallback((post) => {
      const newPost = { ...post, id: new Date().getTime() };

      setPostsList((prev) => {
         return [...prev, newPost];
      });
   }, []);

   const deletePost = useCallback((post) => {
      setPostsList((prev) => {
         return prev.filter((p) => p.id !== post.id);
      });
   }, []);

   useEffect(() => {
      fetchPosts();
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return (
      <div className="App">
         <NewPost addPostHandler={addNewPost} />
         <PostsListsHandler
            setHandledPosts={setHandledPosts}
            postsList={postsList}
         />
         {fetchError && (
            <h1 style={{ textAlign: "center", color: "red" }}>
               Error: {fetchError}
            </h1>
         )}
         {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
               <Loader/>
            </div>
         ) : (
            <PostsList postsList={handledPosts} deletePost={deletePost} />
         )}
      </div>
   );
}

export default App;
