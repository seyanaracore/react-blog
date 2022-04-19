import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Components/AppRouter/AppRouter";
import Navbar from "./Components/Navbar/Navbar";
import PostsContext from "./Context";

export default function App() {
   const [postsList, setPostsList] = useState({});
   const [totalPosts, setTotalPosts] = useState(0);

   return (
      <PostsContext.Provider
         value={{
            postsList,
            setPostsList,
            totalPosts,
            setTotalPosts,
         }}
      >
         <BrowserRouter>
            <Navbar />
            <AppRouter />
         </BrowserRouter>
      </PostsContext.Provider>
   );
}
