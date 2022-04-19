import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import About from "../../Pages/About";
import Posts from "../../Pages/Posts/Posts";
import PostItem from "../PostItem/PostItem";
import PostsList from "../PostsList/PostsList";

export default function AppRouter() {
   return (
      <Routes>
         <Route path="/" element={<Navigate to={"posts"} />} />
         <Route path="posts" element={<Posts />}>
            <Route path=":page" element={<PostsList />}>
               <Route path=":id" element={<PostItem />} />
            </Route>
         </Route>
         <Route path="about" element={<About />} />
         <Route path="*" element={<h1>404</h1>} />
      </Routes>
   );
}
