import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { PostService } from "../../API/PostService";
import useFetching from "../../Hooks/useFetching";
import Loader from "../UI/Loader/Loader";
import Modal from "../UI/Modal/Modal";

export default function PostItem() {
   const { post = [], postId } = useOutletContext();
   const navigate = useNavigate();
   const [postComments, setPostComments] = useState([]);
   const [fetchComments, fetchErrror, isLoading] = useFetching(async () => {
      const response = await PostService.fetchPost(postId);
      setPostComments(response.data);
   });

   useEffect(() => {
      fetchComments();
   }, [postId]);

   return (
      <Modal
         visible={true}
         setVisible={() => {
            navigate(-1);
         }}
      >
         {fetchErrror && <h1>{fetchErrror}</h1>}

         {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
               <Loader />
            </div>
         ) : (
            <div>
               <article>
                  <h2>
                     <span>{post.id}. </span>Title: {post.title}
                  </h2>
                  <p>Body: {post.body}</p>
               </article>

               <div>
                  <h2>Comments:</h2>
                  {postComments.map((comment) => (
                     <div>
                        <p>
                           {comment.id} {comment.name}
                        </p>
                        <p>{comment.email}</p>
                        <p>{comment.body}</p>
                     </div>
                  ))}
               </div>
            </div>
         )}
      </Modal>
   );
}
