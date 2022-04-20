import React from "react";
import PropTypes from "prop-types";

Error.propTypes = {
   errorMessage: PropTypes.string,
};

export default function Error({ errorMessage }) {
   return (
      <h1 style={{ textAlign: "center", color: "red" }}>
         Error: {errorMessage}
      </h1>
   );
}
