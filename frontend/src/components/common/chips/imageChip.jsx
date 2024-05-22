import React from "react";
import PropTypes from "prop-types";
import { IoCloseOutline } from "react-icons/io5";

const ImageChip = ({ file, onDelete, onOpenModal, onDownLoad }) => (
  <div
    className="flex items-center bg-gray-400 rounded px-3 py-1 m-1 cursor-pointer"
    onClick={onOpenModal}
    onClickCapture={onDownLoad}
  >
    {file.type.includes("image") ? (
      <img
        src={file.preview || URL.createObjectURL(file)}
        alt={file.name}
        className="w-10 h-10 mr-2 object-fit rounded"
      />
    ) : (
      <div className="w-10 h-10 mr-2 flex items-center justify-center bg-gray-300 text-gray-600 text-xs font-medium">
        File
      </div>
    )}
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
  onOpenModal: PropTypes.func,
  onDownLoad: PropTypes.func,
};

export default ImageChip;
