import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Select from "../UI/Select/Select";

SortPosts.propTypes = {
   postsSortHandler: PropTypes.func.isRequired,
};

export default function SortPosts({ postsSortHandler }) {
   const sortingTypes = [
      { name: "По заголовку", value: "title" },
      { name: "По описанию", value: "body" },
   ];
   const [sortBy, setSortBy] = useState("");

   const sortHandler = useCallback(
      (value) => {
         setSortBy(value);
         postsSortHandler(value);
      },
      [postsSortHandler]
   );

   return (
      <div style={{ margin: "8px 0" }}>
         <Select
            options={sortingTypes}
            defualtValue="Сортировка"
            value={sortBy}
            changeHandler={sortHandler}
         />
      </div>
   );
}
