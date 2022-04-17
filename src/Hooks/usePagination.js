import { useMemo } from "react";
import { getPagesCountList } from "../Utils/Pages";

export const usePagination = (itemsTotalCount, limit) =>
   useMemo(() => {
      return getPagesCountList(itemsTotalCount, limit);
   }, [itemsTotalCount, limit]);
