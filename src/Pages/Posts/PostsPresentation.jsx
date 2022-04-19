import React from "react";
import NewPost from "../../Components/NewPost/NewPost";
import Pagination from "../../Components/Pagination/Pagination";
import PostsList from "../../Components/PostsList/PostsList";
import PostsListsHandler from "../../Components/PostsListHandlers/PostsListsHandler";
import Loader from "../../Components/UI/Loader/Loader";

export default function PostsPresentation({
   addNewPost,
   postsList,
   page,
   setHandledPosts,
   fetchError,
   isLoading,
   handledPosts,
   deletePost,
   totalPosts,
   limit,
   setLimit,
   navigateToPage,
}) {
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
                  setLimit={setLimit}
                  curPage={page}
                  setPage={navigateToPage}
               />
            </>
         )}
      </div>
   );
}
