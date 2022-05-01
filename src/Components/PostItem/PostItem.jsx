import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { PostService } from "../../API/PostService";
import useFetching from "../../Hooks/useFetching";
import Loader from "../UI/Loader/Loader";
import Modal from "../UI/Modal/Modal";

export default function PostItem() {
   const { post = {}, postId } = useOutletContext();
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
         <div>
            {fetchErrror && <h1>{fetchErrror}</h1>}

            {isLoading ? (
               <div style={{ display: "flex", justifyContent: "center" }}>
                  <Loader />
               </div>
            ) : (
               <div>
                  <article>
                     <h2>{post.title}</h2>
                     <p>{post.body}</p>
                  </article>

                  <div style={{ marginTop: 25 }}>
                     <h2>Comments:</h2>

                     {postComments.length ? (
                        postComments.map((comment, idx) => (
                           <div key={comment.id} className="post-comment">
                              <h4>
                                 {idx + 1}. {comment.email}
                              </h4>
                              <p className="post-comment_name">
                                 Name: {comment.name}
                              </p>
                              <p>Body: {comment.body}</p>
                              <hr />
                           </div>
                        ))
                     ) : (
                        <p>Комментариев нет</p>
                     )}
                  </div>
               </div>
            )}
         </div>
      </Modal>
   );
}
