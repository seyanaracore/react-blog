import React from "react";
import {
   BrowserRouter,
   Navigate,
   NavLink,
   Route,
   Routes,
} from "react-router-dom";
import About from "./Pages/About";
import Posts from "./Pages/Posts";

export default function App() {
   return (
      <>
         <BrowserRouter>
            <nav>
               <NavLink to="about">About</NavLink>
               <NavLink to="posts">Posts</NavLink>
            </nav>
            <Routes>
               <Route path="/" element={<Navigate to={"posts"} />} />
               <Route path="posts" element={<Posts />} />
               <Route path="about" element={<About />} />
               <Route path="*" element={<h1>404</h1>} />
            </Routes>
         </BrowserRouter>
      </>
   );
}
