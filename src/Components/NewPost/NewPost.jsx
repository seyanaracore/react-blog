import React, { useState } from "react";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import PropTypes from "prop-types";
import Modal from "../UI/Modal/Modal";

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
      setModalVisible(false);
   };

   const [modalVisible, setModalVisible] = useState(false);

   return (
      <>
         <Modal visible={modalVisible} setVisible={setModalVisible}>
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
               <Button>Отправить</Button>
            </form>
         </Modal>
         <Button
            onClick={() => {
               setModalVisible(true);
            }}
         >
            Создать пост
         </Button>
      </>
   );
}
