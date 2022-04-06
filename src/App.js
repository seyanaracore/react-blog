import { useState } from "react";
import PostsList from "./Components/PostsList/PostsList";
import "./Styles/App.css";

function App() {
   const [postsList, setPostsList] = useState([
      { id: 1, title: "Post #1 - Title", body: "Post #1 - Content" },
      { id: 2, title: "Post #2 - Title", body: "Post #2 - Content" },
   ]);

   return (
      <div className="App">
         <PostsList postsList={postsList} />
      </div>
   );
}

export default App;
