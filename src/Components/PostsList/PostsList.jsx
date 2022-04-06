import React from "react";
import Post from "../Post/Post";
import PropTypes from "prop-types";

PostsList.propTypes = {
   postsList: PropTypes.array.isRequired,
};

export default function PostsList({ postsList }) {
   return (
      <div>
         {postsList.map((post) => {
            return <Post post={post} key={post.id} />;
         })}
      </div>
   );
}
