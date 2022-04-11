import PropTypes from "prop-types";
import { postStructure } from "../Post/Post.types";

export const postsListStructure = PropTypes.arrayOf(postStructure.isRequired);
