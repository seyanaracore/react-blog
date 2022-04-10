import React from "react";
import PropTypes from "prop-types";

Select.propTypes = {
   options: PropTypes.arrayOf(PropTypes.object),
   defualtValue: PropTypes.string,
};

export default function Select({
   options,
   defualtValue,
   value,
   changeHandler,
}) {
   return (
      <select value={value} onChange={(e) => changeHandler(e.target.value)}>
         <option disabled value="">
            {defualtValue}
         </option>
         {options.map((option) => {
            return (
               <option value={option.value} key={option.value}>
                  {option.name}
               </option>
            );
         })}
      </select>
   );
}
