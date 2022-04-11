import React, { useCallback, useEffect, useMemo, useState } from "react";
import PostsFilter from "../PostsFilter/PostsFilter";
import SortPosts from "../SortPosts/SortPosts";
import PropTypes from "prop-types";
import { postsListStructure } from "../PostsList/PostsList.types";

PostsListsHandler.porpTypes = {
   postsList: postsListStructure.isRequired,
   setHandledPosts: PropTypes.func.isRequired,
};

export default function PostsListsHandler({ postsList, setHandledPosts }) {
   const [sortBy, setSortBy] = useState(null);
   const [filter, setFilter] = useState("");

   const sortedPosts = useMemo(() => {
      if (sortBy) {
         return [...postsList].sort((a, b) =>
            a[sortBy].localeCompare(b[sortBy])
         );
      } else {
         return postsList;
      }
   }, [postsList, sortBy]);
   const sortedAndFilteredPosts = useMemo(() => {
      return sortedPosts.filter((el) => {
         return (
            el.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            el.body.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
         );
      });
   }, [sortedPosts, filter]);

   const setSorting = useCallback((sortBy) => {
      setSortBy(sortBy);
   }, []);
   const filterHandler = useCallback((string) => {
      setFilter(string);
   }, []);

   useEffect(() => {
      setHandledPosts(sortedAndFilteredPosts);
   }, [sortedAndFilteredPosts, setHandledPosts]);

   return (
      <div>
         <SortPosts postsSortHandler={setSorting} />
         <hr style={{ margin: "8px 0" }} />
         <PostsFilter filterHandler={filterHandler} />
      </div>
   );
}
