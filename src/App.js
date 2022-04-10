import { useCallback, useMemo, useState } from "react";
import NewPost from "./Components/NewPost/NewPost";
import PostsFilter from "./Components/PostsFilter/PostsFilter";
import PostsList from "./Components/PostsList/PostsList";
import SortPosts from "./Components/SortPosts/SortPosts";
import "./Styles/App.css";

function App() {
   const [postsList, setPostsList] = useState([
      { id: 1, title: "Post #1 - Title", body: "Post #1 - Content" },
      { id: 2, title: "Post #2 - Title", body: "Post #2 - Content" },
      { id: 3, title: "1", body: "2" },
      { id: 4, title: "2", body: "1" },
   ]);

   const [sortBy, setSortBy] = useState("");
   // const [filteredPosts, setFilteredPosts] = useState(postsList);
   const getSortedPosts = useMemo(
      () => [...postsList].sort((a, b) => a[sortBy].localeCompare(b[sortBy])),
      [postsList, sortBy]
   );

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

   const setSorting = useCallback(
      // (sortBy) => {
      //    const sortedPosts = [...postsList].sort((a, b) => {
      //       return a[sortBy].localeCompare(b[sortBy]);
      //    });
      //    setPostsList(sortedPosts);
      // },
      // [postsList]
      (sortBy) => {
         setSortBy(sortBy);
      },
      []
   );

   const filterPosts = useCallback(
      (string) => {
         setFilteredPosts(() =>
            postsList.filter((el) => {
               return el.title.includes(string) || el.body.includes(string);
            })
         );
      },
      [postsList]
   );

   return (
      <div className="App">
         <NewPost addPostHandler={addNewPost} />
         {!filteredPosts.length ? (
            <h1 style={{ textAlign: "center" }}>Нет постов!</h1>
         ) : (
            <>
               <SortPosts postsSortHandler={setSorting} />
               <hr style={{ margin: "8px 0" }} />
               <PostsFilter filterHandler={filterPosts} />
               <PostsList postsList={postsList} deletePost={deletePost} />
            </>
         )}
      </div>
   );
}

export default App;
