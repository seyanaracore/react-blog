import { useMemo } from "react";

export const useSortPosts = (postsList, sortBy) => {
   const sortedPosts = useMemo(() => {
      if (sortBy) {
         return [...postsList].sort((a, b) =>
            a[sortBy].localeCompare(b[sortBy])
         );
      } else {
         return postsList;
      }
   }, [postsList, sortBy]);
   return sortedPosts;
};
export const usePosts = (postsList, sortBy, filter) => {
   const sortedPosts = useSortPosts(postsList, sortBy);
   const sortedAndFilteredPosts = useMemo(() => {
      return sortedPosts.filter((el) => {
         return (
            el.title.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ||
            el.body.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
         );
      });
   }, [sortedPosts, filter]);

   return sortedAndFilteredPosts;
};

export default usePosts;
