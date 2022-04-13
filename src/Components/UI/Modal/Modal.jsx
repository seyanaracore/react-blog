import React from "react";
import classes from "./Modal.module.css";
import PropTypes from "prop-types";

Modal.propTypes = {
   children: PropTypes.element.isRequired,
   visible: PropTypes.bool.isRequired,
   setVisible: PropTypes.func.isRequired,
};

export default function Modal({ children, visible, setVisible }) {
   const rootClasses = [classes.modal];

   if (visible) {
      rootClasses.push(classes.active);
   }

   return (
      <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
         <div
            onClick={(e) => {
               e.stopPropagation();
            }}
            className={classes.content}
         >
            {children}
         </div>
      </div>
   );
}
