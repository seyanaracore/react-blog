import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import usePosts from "../../Hooks/usePosts";
import PostsFilter from "../PostsFilter/PostsFilter";
import { postsListStructure } from "../PostsList/PostsList.types";
import SortPosts from "../SortPosts/SortPosts";

PostsListsHandler.propTypes = {
   postsList: postsListStructure.isRequired,
   setHandledPosts: PropTypes.func.isRequired,
};

export default function PostsListsHandler({ postsList, setHandledPosts }) {
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
         <PostsFilter filterHandler={filterHandler} />
         <SortPosts postsSortHandler={setSorting} />
      </div>
   );
}
