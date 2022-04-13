import React from "react";
import Post from "../Post/Post";
import PropTypes from "prop-types";
import { postsListStructure } from "./PostsList.types";
import { TransitionGroup } from "react-transition-group";
import { CSSTransition } from "react-transition-group";

PostsList.propTypes = {
   postsList: postsListStructure.isRequired,
   deletePost: PropTypes.func.isRequired,
};

export default function PostsList({ postsList, deletePost }) {
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
         </TransitionGroup>
      </div>
   );
}
