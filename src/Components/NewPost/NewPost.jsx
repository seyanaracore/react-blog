import React, { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import PropTypes from "prop-types";

NewPost.propTypes = {
   addPostHandler: PropTypes.func.isRequired,
};

export default function NewPost({ addPostHandler }) {
   const [title, setTitle] = useState("");
   const [body, setBody] = useState("");

   const addNewPost = (e) => {
      e.preventDefault();
      const newPost = {
         title,
         body,
      };
      if (title === "" || body === "") return;
      setTitle("");
      setBody("");
      addPostHandler(newPost);
   };

   return (
      <form className="newPostForm" onSubmit={addNewPost}>
         <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
         />
         <Input
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Body"
         />
         <Button>Создать пост</Button>
      </form>
   );
}
