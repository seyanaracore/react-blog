import PropTypes from "prop-types";

export const postStructure = PropTypes.shape({
   title: PropTypes.string.isRequired,
   body: PropTypes.string.isRequired,
   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
});
