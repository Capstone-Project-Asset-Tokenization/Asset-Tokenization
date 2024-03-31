import React, { useState, useRef } from 'react';
// Helper component to render image chips
import PropTypes from 'prop-types';
import { IoRocketOutline } from "react-icons/io5";

const ImageChip = ({ file, onDelete }) => (
  <div className="flex items-center bg-gray-200 rounded px-3 py-1 m-1">
    <span className="text-sm font-medium mr-2">{file.name}</span>
    <button
      onClick={() => onDelete(file)}
      className="text-gray-500 focus:outline-none"
    >
      &times;
    </button>
  </div>
);
ImageChip.propTypes = {
  file: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const AssetRegistration = () => {
  const [assetName, setAssetName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('LAND'); // Default category
  const [supportingFiles, setSupportingFiles] = useState([]);
  const supportingFilesInputRef = useRef(null);
  const [assetImages, setAssetImages] = useState([]);
  const assetImagesInputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here, such as sending data to a backend service.
    console.log({ assetName, description, price, category });
  };

  const handleSupportingFileChange = (event) => {
    // Add the new files to the existing files array
    setSupportingFiles([...supportingFiles, ...Array.from(event.target.files)]);
  };

  const handleSupportingDeleteFile = (fileToDelete) => {
    setSupportingFiles(supportingFiles.filter(file => file !== fileToDelete));
  };

  const triggerSupportingFileInput = () => {
    supportingFilesInputRef.current.click();
  };

  const handleAssetImageChange = (event) => {
    // Add the new files to the existing files array
    setAssetImages([...assetImages, ...Array.from(event.target.files)]);
  }

  const handleAssetImageDelete = (fileToDelete) => {
    setAssetImages(assetImages.filter(file => file !== fileToDelete));
  }

  const triggerAssetImageInput = () => {
    assetImagesInputRef.current.click();
  }


  return (
    <>
      <div className="container mx-auto px-4">
        <div className="w-full mx-auto py-16">
          <form onSubmit={handleSubmit} className="text-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
            <h1 className="block text-white font-bold mb-4 text-5xl font-mono">Create New Asset</h1>
            <div className='flex flex-row flex-wrap gap-3 w-full'>
              <div className='w-[35rem] min-w-[10rem]'>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-400" htmlFor="assetName">
                    Asset Name
                  </label>
                  <input
                    id="assetName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter Asset Name"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-400" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    rows="4"
                    placeholder="Write Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>



                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-400" htmlFor="price">
                    Price In ETH
                  </label>
                  <input
                    id="price"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Set Price In ETH"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-400" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    className="shadow border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="LAND">SHARE</option>
                    <option value="REAL_ESTATE">REAL ESTATE</option>
                    <option value="ART_WORKS">ART-WORKS</option>
                  </select>
                </div>
              </div>
              <div className="mb-4 w-[35rem]">
                <div className="flex items-center justify-between flex-col">
                  <div className="w-full mb-2">
                    <label className="block mb-2 text-sm font-bold text-gray-400" htmlFor="assetImages">
                      Asset Images
                    </label>
                    <div onClick={triggerAssetImageInput} className="cursor-pointer shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline">
                      <div
                        className="flex flex-col items-center justify-center h-32 ">
                        <IoRocketOutline className="text-4xl text-gray-400" />
                        <span className="text-sm">Select Image</span>
                      </div>
                      <input
                        id="assetImages"
                        className="hidden"
                        ref={assetImagesInputRef}
                        type="file"
                        onChange={handleAssetImageChange}
                        multiple
                      />
                    </div>
                    <div className="flex flex-wrap mt-2">
                      {assetImages.map(file => (
                        <ImageChip key={file.name} file={file} onDelete={handleAssetImageDelete} />
                      ))}
                    </div>
                  </div>
                  <div className="w-full ">
                    <label className="block mb-2 text-sm font-bold text-gray-400" htmlFor="supportingFiles">
                      Supporting Files
                    </label>
                    <div onClick={triggerSupportingFileInput} className="cursor-pointer shadow appearance-none border rounded w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline">
                      <div
                        className="flex flex-col items-center justify-center h-32 ">
                        <IoRocketOutline className="text-4xl text-gray-400" />
                        <span className="text-sm">Select Image</span>
                      </div>
                      <input
                        id="supportingFiles"
                        className="hidden"
                        ref={supportingFilesInputRef}
                        type="file"
                        onChange={handleSupportingFileChange}
                        multiple
                      />
                    </div>
                    <div className="flex flex-wrap mt-2">
                      {supportingFiles.map(file => (
                        <ImageChip key={file.name} file={file} onDelete={handleSupportingDeleteFile} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-primary-main hover:bg-purple-700 text-white font-bold py-2 px-4 w-2/6 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Create
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default AssetRegistration;