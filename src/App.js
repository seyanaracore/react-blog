import { useCallback, useState } from "react";
import NewPost from "./Components/NewPost/NewPost";
import PostsList from "./Components/PostsList/PostsList";
import PostsListsHandler from "./Components/PostsListHandlers/PostsListsHandler";
import "./Styles/App.css";

function App() {
   const [postsList, setPostsList] = useState([
      { id: 1, title: "Post #1 - Title", body: "Post #1 - Content" },
      { id: 2, title: "Post #2 - Title", body: "Post #2 - Content" },
      { id: 3, title: "1", body: "2" },
      { id: 4, title: "2", body: "1" },
   ]);
   const [handledPosts, setHandledPosts] = useState(postsList);

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

   return (
      <div className="App">
         <NewPost addPostHandler={addNewPost} />
         <PostsListsHandler
            setHandledPosts={setHandledPosts}
            postsList={postsList}
         />
         <PostsList postsList={handledPosts} deletePost={deletePost} />
      </div>
   );
}

export default App;
