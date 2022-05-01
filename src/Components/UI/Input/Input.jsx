import React from "react";
import { forwardRef } from "react";
import classes from "./Input.module.css";

const Input = forwardRef((props, ref) => {
   return <input ref={ref} className={classes.input} {...props} />;
});

export default Input;
