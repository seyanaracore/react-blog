import React, { useState } from "react";
import Input from "../UI/Input/Input";

export default function PostsFilter({ filterHandler }) {
   const [inputValue, setInputValue] = useState("");

   const inputHandler = (e) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      filterHandler(newValue);
   };

   return (
      <div style={{ margin: "8px 0" }}>
         <Input
            value={inputValue}
            onChange={inputHandler}
            placeholder="Введите слово для поиска..."
         />
      </div>
   );
}
