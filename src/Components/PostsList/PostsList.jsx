import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Post from "../Post/Post";

export default function PostsList() {
   const { postsList, deletePost } = useOutletContext();
   const [postId, setPostId] = useState(null);
   const postItem = useMemo(
      () => postsList.find((post) => post.id === postId),
      [postId, postsList]
   );
   const params = useParams();

   useEffect(() => {
      const postId = params.id?.replace(/\D+/g, "");
      postId && setPostId(+postId);
   }, [params]);

   if (!postsList.length)
      return <h1 style={{ textAlign: "center" }}>Нет постов!</h1>;

   return (
      <div>
         <TransitionGroup>
            {postsList.map((post) => {
               return (
                  <CSSTransition timeout={200} classNames="post" key={post.id}>
                     <Post post={post} deletePost={deletePost} />
                  </CSSTransition>
               );
            })}
            {postId && postItem && (
               <Outlet
                  context={{
                     post: postItem,
                     postId,
                  }}
               />
            )}
         </TransitionGroup>
      </div>
   );
}
