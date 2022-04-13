import { useState } from "react";

const useFetching = (callback) => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);
   const fetching = async () => {
      try {
         setLoading(true);
         await callback();
      } catch (e) {
         setError(e.message);
      } finally {
         setLoading(false);
      }
   };
   return [fetching, error, loading];
};

export default useFetching;
