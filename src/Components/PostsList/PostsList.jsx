import React from "react";
import Post from "../Post/Post";
import PropTypes from "prop-types";

PostsList.propTypes = {
   postsList: PropTypes.array.isRequired,
   deletePost: PropTypes.func.isRequired,
};

export default function PostsList({ postsList, deletePost }) {
   return (
      <div>
         {postsList.map((post) => {
            return <Post post={post} deletePost={deletePost} key={post.id} />;
         })}
      </div>
   );
}
