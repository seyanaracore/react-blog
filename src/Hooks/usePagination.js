import { useMemo } from "react";

export const usePagination = (pagesCount = null) =>
   useMemo(() => {
      return new Array(pagesCount || 1).fill().map((_, idx) => idx + 1);
   }, [pagesCount]);
