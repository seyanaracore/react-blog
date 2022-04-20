import React from "react";
import PropTypes from "prop-types";

import Button from "../UI/Button/Button";
import { postStructure } from "./Post.types";
import { useLocation, useNavigate } from "react-router-dom";

Post.propTypes = {
   post: postStructure.isRequired,
   deletePost: PropTypes.func.isRequired,
};

export default function Post({ post, deletePost }) {
   const navigate = useNavigate();
   const location = useLocation();

   return (
      <div className="post">
         <article>
            <h2>
               <span>{post.id}. </span>
               {post.title}
            </h2>
            <p>{post.body}</p>
         </article>
         <div
            style={{
               display: "flex",
               flexDirection: "column",
               alignItems: "flex-end",
               alignSelf: "center",
            }}
         >
            <Button
               onClick={() =>
                  navigate(location.pathname + "/post" + post.id.toString())
               }
            >
               Открыть
            </Button>
            <Button onClick={() => deletePost(post)}>Удалить</Button>
         </div>
      </div>
   );
}
