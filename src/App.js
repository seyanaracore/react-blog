import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import About from "./Pages/About";
import Posts from "./Pages/Posts";

export default function App() {
   return (
      <BrowserRouter>
         <Navbar />
         <Routes>
            <Route path="/" element={<Navigate to={"posts"} />} />
            <Route path="posts" element={<Posts />}>
               <Route index path=":page" element={<Posts />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="*" element={<h1>404</h1>} />
         </Routes>
      </BrowserRouter>
   );
}
