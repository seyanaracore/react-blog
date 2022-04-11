import React from "react";
import Post from "../Post/Post";
import PropTypes from "prop-types";
import { postsListStructure } from "./PostsList.types";

PostsList.propTypes = {
   postsList: postsListStructure.isRequired,
   deletePost: PropTypes.func.isRequired,
};

export default function PostsList({ postsList, deletePost }) {
   if (!postsList.length)
      return <h1 style={{ textAlign: "center" }}>Нет постов!</h1>;

   return (
      <div>
         {postsList.map((post) => {
            return <Post post={post} deletePost={deletePost} key={post.id} />;
         })}
      </div>
   );
}
