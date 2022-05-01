import React from "react";
import { useSelector } from "react-redux";
import { usePagination } from "../../Hooks/usePagination";
import { selectTotalPages } from "../../Store/selectors";
import Button from "../UI/Button/Button";
import Select from "../UI/Select/Select";

export default function Pagination({
   // pagesList,
   limit,
   setLimit,
   curPage,
   setPage,
}) {
   const pagesCount = useSelector(selectTotalPages);
   const pagesList = usePagination(pagesCount);
   return (
      <div
         style={{
            padding: "8px",
            display: "flex",
            justifyContent: "space-between",
         }}
      >
         <div>
            {pagesList.map((page) => {
               return (
                  <Button
                     style={
                        page === +curPage
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
         <span>
            Вывод по:{" "}
            <Select
               options={[
                  { name: "10", value: 10 },
                  { name: "25", value: 25 },
                  { name: "50", value: 50 },
               ]}
               value={limit}
               changeHandler={(value) => setLimit(+value)}
            />
         </span>
      </div>
   );
}
