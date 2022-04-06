import React from "react";
import PropTypes from "prop-types";

import classes from "./Styles.module.css";

Post.propTypes = {
   post: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
   }).isRequired,
};

export default function Post({ post }) {
   return (
      <div>
         <div>
            <p>Title: {post.title}</p>
            <p>Body: {post.body}</p>
         </div>
			<button>Delete</button>
      </div>
   );
}
