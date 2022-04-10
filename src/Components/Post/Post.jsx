import React from "react";
import PropTypes from "prop-types";

import Button from "../UI/Button/Button";

Post.propTypes = {
   post: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
   }).isRequired,
   deletePost: PropTypes.func.isRequired
};

export default function Post({ post, deletePost }) {
   return (
      <div className="post">
         <article>
            <h2>Title: {post.title}</h2>
            <p>Body: {post.body}</p>
         </article>
         <Button onClick={() => deletePost(post)}>Delete</Button>
      </div>
   );
}
