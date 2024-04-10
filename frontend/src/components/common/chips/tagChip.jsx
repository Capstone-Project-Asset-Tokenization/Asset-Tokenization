import React from "react";
import PropTypes from "prop-types";
import { IoCloseOutline } from "react-icons/io5";

const TagChip = ({ tag, onDelete }) => (
  <div className="flex items-center bg-blue-500 rounded-full px-3 py-1 m-1">
    <span className="text-sm font-medium mr-2 text-white">{tag}</span>
    <button
      onClick={() => onDelete(tag)}
      className="text-white focus:outline-none"
    >
      <IoCloseOutline />
    </button>
  </div>
);
TagChip.propTypes = {
  tag: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TagChip;
