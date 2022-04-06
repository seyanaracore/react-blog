import React from "react";
import PropTypes from "prop-types";
import "../../Styles/Post.css"

import Button from "../../UI/Button/Button";

Post.propTypes = {
   post: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
   }).isRequired,
};

export default function Post({ post }) {
   return (
      <div className="post">
         <article>
            <h2>Title: {post.title}</h2>
            <p>Body: {post.body}</p>
         </article>
         <Button>Delete</Button>
      </div>
   );
}
