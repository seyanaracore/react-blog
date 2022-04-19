import React from "react";
import PropTypes from "prop-types";

import Button from "../UI/Button/Button";
import { postStructure } from "./Post.types";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

Post.propTypes = {
   post: postStructure.isRequired,
   deletePost: PropTypes.func.isRequired,
};

export default function Post({ post, deletePost }) {
   const navigate = useNavigate()
   const location = useLocation()

   return (
      <div className="post">
         <article>
            <h2>
               <span>{post.id}. </span>Title: {post.title}
            </h2>
            <p>Body: {post.body}</p>
         </article>
         <div
            style={{
               display: "flex",
               flexDirection: "column",
               alignItems: "flex-end",
               alignSelf: "center",
            }}
         >
            <Button style={{fontWeight: "bold"}} onClick={()=>navigate(location.pathname + "/post" +post.id.toString())}>Открыть</Button>
            <Button onClick={() => deletePost(post)}>Delete</Button>
         </div>
      </div>
   );
}
