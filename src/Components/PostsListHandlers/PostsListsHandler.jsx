import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import usePosts from "../../Hooks/usePosts";
import { selectPostsList } from "../../Store/selectors";
import PostsFilter from "../PostsFilter/PostsFilter";
import { postsListStructure } from "../PostsList/PostsList.types";
import SortPosts from "../SortPosts/SortPosts";

PostsListsHandler.propTypes = {
   // postsList: postsListStructure.isRequired, 
   setHandledPosts: PropTypes.func.isRequired,
};

export default function PostsListsHandler({ /*postsList,*/ setHandledPosts }) {
   const postsList = useSelector(selectPostsList);

   const [sortBy, setSortBy] = useState(null);
   const [filter, setFilter] = useState("");

   const setSorting = useCallback((sortBy) => {
      setSortBy(sortBy);
   }, []);
   const filterHandler = useCallback((string) => {
      setFilter(string);
   }, []);

   const sortedAndFilteredPosts = usePosts(postsList, sortBy, filter);

   useEffect(() => {
      setHandledPosts(sortedAndFilteredPosts);
   }, [sortedAndFilteredPosts, setHandledPosts]);

   return (
      <div>
         <hr style={{ margin: "8px 0" }} />
         <div>
            <PostsFilter filterHandler={filterHandler} />
            {/* <PostsLimit setPostsLimit={setPostsLimit} /> */}
         </div>
         <SortPosts postsSortHandler={setSorting} />
      </div>
   );
}
