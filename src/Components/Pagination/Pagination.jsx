import React from "react";
import { usePagination } from "../../Hooks/usePagination";
import Button from "../UI/Button/Button";

export default function Pagination({
   itemsTotalCount,
   limit,
   curPage,
   setPage,
}) {
   const pagesList = usePagination(itemsTotalCount, limit);
   return (
      <div style={{ padding: "8px 0" }}>
         {pagesList.map((page) => {
            return (
               <Button
                  style={
                     page === curPage
                        ? {
                             fontWeight: "bold",
                             borderColor: "coral",
                             margin: "0 2px",
                          }
                        : { margin: "0 2px" }
                  }
                  onClick={() => setPage(page)}
                  key={page}
               >
                  {page}
               </Button>
            );
         })}
      </div>
   );
}
