import React from "react";
import PropTypes from "prop-types";
import { IoCloseOutline } from "react-icons/io5";


const ImageChip = ({ file, onDelete }) => (
  <div className="flex items-center bg-gray-200 rounded px-3 py-1 m-1">
    <img
      src={URL.createObjectURL(file)}
      alt={file.name}
      className="w-10 h-10 mr-2"
      />
    <span className="text-sm font-medium mr-2">{file.name}</span>
    <button
      onClick={() => onDelete(file)}
      className="text-gray-500 focus:outline-none"
      >
      <IoCloseOutline />
    </button>
  </div>
);

ImageChip.propTypes = {
  file: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ImageChip;
