import React, { useEffect, useMemo, useState } from "react";
import Post from "../Post/Post";
import PropTypes from "prop-types";
import { postsListStructure } from "./PostsList.types";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";
import { Outlet, useOutletContext, useParams } from "react-router-dom";

PostsList.propTypes = {
   postsList: postsListStructure.isRequired,
   deletePost: PropTypes.func.isRequired,
};

export default function PostsList(/*{ postsList, deletePost }*/) {
   const { postsList, deletePost } = useOutletContext();
   const [postId, setPostId] = useState(null);
   const postItem = useMemo(
      () => postsList?.find((post) => post.id === postId),
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
                     <div>
                        <Post post={post} deletePost={deletePost} />
                     </div>
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
