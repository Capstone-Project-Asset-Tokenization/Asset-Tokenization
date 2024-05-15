import { useState, useRef, useEffect, useCallback } from "react";
import { IoRocketOutline } from "react-icons/io5";
import ImageChip from "../../../components/common/chips/imageChip";
// import TagChip from "../../../components/common/chips/tagChip";
import {
  useUploadMultipleFilesMutation,
  useUploadMultipleImagesMutation,
  useUploadSingleImageMutation,
  useUploadSingleFileMutation,
  // useRegisterAssetQuery,
} from "../../../stores/asset/assetApi";
// import Web3 from "web3";
// import { assetContractABI } from "../../../config/config";
import { SpinLoader } from "../../../components/common/spinner/spinLoader";
import { Toaster } from "../../../components/common/toaster/toaster";
import { getAssetContractInstance } from "../../../config/contractInstances/index";
// const initWeb3 = async () => {
//   if (window.ethereum) {
//     try {
//       await window.ethereum.request({ method: "eth_requestAccounts" });
//       return new Web3(window.ethereum);
//     } catch (error) {
//       console.error("Error during web3 initialization:", error);
//       throw error;
//     }
//   } else {
//     console.error("Non-Ethereum browser detected. Consider trying MetaMask.");
//     throw new Error("Ethereum not available");
//   }
// };
const EditAssetDetails = () => {
  const assetId = window.location.pathname.split("/")[2];
  console.log(assetId, "assetId");
  const [assetName, setAssetName] = useState("");
  const [description, setDescription] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [category, setCategory] = useState(0); // Default category
  const [supportingFiles, setSupportingFiles] = useState([]);
  const supportingFilesInputRef = useRef(null);
  const [assetImages, setAssetImages] = useState([]);
  const assetImagesInputRef = useRef(null);
  const [symbol, setSymbol] = useState("");
  const [decimal, setDecimal] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [initialState, setInitialState] = useState(null);

  const [uploadMultipleFiles, { isLoading: isUploadingFiles }] =
    useUploadMultipleFilesMutation();
  const [uploadMultipleImages, { isLoading: isUploadingImages }] =
    useUploadMultipleImagesMutation();
  const [uploadSingleImage, { isLoading: isUploadingSingleImage }] =
    useUploadSingleImageMutation();
  const [uploadSingleFile, { isLoading: isUploadingSingleFile }] =
    useUploadSingleFileMutation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAsset = async () => {
      const [contract, contractWithSigner] = await getAssetContractInstance();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (
        !contract ||
        !contractWithSigner ||
        !accounts ||
        accounts.length === 0
      ) {
        setError("Error Connecting to MetaMask. Please try again");
        setLoading(false);
        console.log("error");
        return;
      }

      try {
        const assetData = await contractWithSigner.getAsset(assetId);
        console.log(assetData, "assetData");

        const files = Object.values(assetData[10]).map((url, index) => ({
          name: `File ${index + 1}`,
          type: "file",
          preview: url,
        }));
        const images = Object.values(assetData[9]).map((url, index) => ({
          name: `Image ${index + 1}`,
          type: "image",
          preview: url,
        }));
        const initialState = {
          assetName: assetData[1],
          description: assetData[8],
          tokenPrice: Number(assetData[5]),
          totalSupply: Number(assetData[4]),
          category: assetData[6],
          symbol: assetData[2],
          decimal: Number(assetData[3]),
          supportingFiles: files,
          assetImages: images,
        };
        const initialSupply = Number(assetData[4]);
        const assetDecimals = Number(assetData[3]);
        const normalizedTotalSupply =
          initialSupply / Math.pow(10, assetDecimals);

        setInitialState(initialState);
        setAssetName(assetData[1]);
        setDescription(assetData[8]);
        setTokenPrice(Number(assetData[5]));
        setCategory(assetData[6]);
        setSymbol(assetData[2]);
        setTotalSupply(normalizedTotalSupply);
        setDecimal(Number(assetData[3]));
        setSupportingFiles(files);
        setAssetImages(images);
        setLoading(false);
      } catch (error) {
        console.log(error, "error");
        setError("Error fetching asset details: " + error.message);
        setLoading(false);
      }
    };
    fetchAsset();
    console.log("fetching asset");
  }, [assetId]);

  const [error, setError] = useState(null);

  const uploadImages = useCallback(
    async (images) => {
      const newImageUrls = [];
      const uploadPromises = [];

      images.forEach((image) => {
        if (image instanceof File) {
          uploadPromises.push(
            uploadSingleImage(image)
              .unwrap()
              .then((response) => {
                if (response.error) {
                  throw new Error("Error uploading image");
                }
                newImageUrls.push(response.url);
              })
          );
        } else {
          newImageUrls.push(image.preview);
        }
      });

      try {
        await Promise.all(uploadPromises);
        setUploadedImages((prev) => [...prev, ...newImageUrls]);
      } catch (error) {
        console.error("Error uploading images:", error);
        throw error;
      }
    },
    [uploadSingleImage]
  );

  const uploadFiles = useCallback(
    async (files) => {
      const newFileUrls = [];
      const uploadPromises = [];

      files.forEach((file) => {
        if (file instanceof File) {
          uploadPromises.push(
            uploadSingleFile(file)
              .unwrap()
              .then((response) => {
                if (response.error) {
                  throw new Error("Error uploading file");
                }
                newFileUrls.push(response.url);
              })
          );
        } else {
          newFileUrls.push(file.preview);
        }
      });

      try {
        await Promise.all(uploadPromises);
        setUploadedFiles((prev) => [...prev, ...newFileUrls]);
      } catch (error) {
        console.error("Error uploading files:", error);
        throw error;
      }
    },
    [uploadSingleFile]
  );

  const handleSubmit = useCallback(
    async (event) => {
      setImageFileUploadError(null);
      setLoading(true);
      setError(null);
      event.preventDefault();
      console.log(
        "submitting form",
        assetName,
        description,
        tokenPrice,
        category,
        assetImages,
        symbol,
        totalSupply,
        decimal,
        supportingFiles
      );
      if (
        !assetName ||
        !description ||
        !(tokenPrice > 0) ||
        !assetImages.length ||
        !symbol ||
        !(totalSupply > 0) ||
        !(decimal > 0) ||
        !supportingFiles.length
      ) {
        setLoading(false);
        setError(
          "Please fill all the above fields and upload all the necessary files!!"
        );
        return;
      }

      let hasChange =
        assetName !== initialState.assetName ||
        description !== initialState.description ||
        tokenPrice !== initialState.tokenPrice ||
        category !== initialState.category ||
        symbol !== initialState.symbol ||
        totalSupply !== initialState.totalSupply ||
        decimal !== initialState.decimal;

      supportingFiles.forEach((each) => {
        if (each instanceof File) {
          hasChange = true;
        }
      });

      assetImages.forEach((each) => {
        if (each instanceof File) {
          hasChange = true;
        }
      });

      if (!hasChange) {
        setLoading(false);
        setError("No changes detected. Please make some changes to update");
        return;
      }

      if (
        supportingFiles.length > 0 &&
        typeof supportingFiles[0] !== "string"
      ) {
        console.log("uploading files");
        try {
          await uploadFiles(supportingFiles, supportingFiles.length > 1);
        } catch (error) {
          console.log("File upload error");
          setLoading(false);
          setSuccess(false);
          console.log(error, "error");
          setError("Error uploading files or Images. Please try again");
          return;
        }
      }

      if (assetImages.length > 0 && typeof assetImages[0] !== "string") {
        try {
          await uploadImages(assetImages, assetImages.length > 1);
        } catch (error) {
          setLoading(false);
          setSuccess(false);
          console.log(error, "error");
          setError("Error uploading files or Images. Please try again");
          return;
        }
      }
    },
    [
      assetName,
      description,
      tokenPrice,
      category,
      assetImages,
      symbol,
      totalSupply,
      decimal,
      supportingFiles,
      uploadFiles,
      uploadImages,
      initialState,
    ]
  );
  useEffect(() => {
    const processSubmission = async () => {
      const [contract, contractWithSigner] = await getAssetContractInstance();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (
        !contract ||
        !contractWithSigner ||
        !accounts ||
        accounts.length === 0
      ) {
        setError("Error Connecting to MetaMask. Please try again");
        setLoading(false);
        return;
      }

      try {
        console.log(
          assetName,
          symbol,
          // const transactionResponse = await contractWithSigner.updateAsset(
          assetName,
          symbol,
          Number(decimal),
          Number(totalSupply),
          Number(tokenPrice),
          category,
          description,
          uploadedImages,
          uploadedFiles
        );
        // );
        // await transactionResponse.wait();
        setSuccess(true);
        setError(null);
        setLoading(false);
        console.log("Asset updated successfully!");
        // clear uploaded files and images
        setUploadedFiles([]);
        setUploadedImages([]);
      } catch (error) {
        setError("Error updating asset: " + error.message);
        setLoading(false);
      }
    };

    if (
      uploadedFiles &&
      uploadedImages &&
      uploadedFiles.length > 0 &&
      uploadedImages.length > 0
    ) {
      processSubmission();
    }
  });

  const handleSupportingFileChange = (event) => {
    setSupportingFiles([...supportingFiles, ...Array.from(event.target.files)]);
  };

  const handleSupportingDeleteFile = (fileToDelete) => {
    setSupportingFiles(supportingFiles.filter((file) => file !== fileToDelete));
  };

  const triggerSupportingFileInput = () => {
    supportingFilesInputRef.current.click();
  };

  const handleAssetImageChange = (event) => {
    setAssetImages([...assetImages, ...Array.from(event.target.files)]);
  };

  const handleAssetImageDelete = (fileToDelete) => {
    setAssetImages(assetImages.filter((file) => file !== fileToDelete));
  };

  const triggerAssetImageInput = () => {
    assetImagesInputRef.current.click();
  };

  if (loading) {
    return <SpinLoader />;
  }
  return (
    <>
      <div className="container mx-auto px-4">
        <div className="w-full mx-auto py-16">
          <form onSubmit={handleSubmit} className="text-white rounded">
            <h1 className="block text-white font-bold mb-8 text-3xl">
              Create New Asset
            </h1>
            {success && (
              <div className="mt-4 flex items-center justify-end">
                <Toaster
                  message="Asset created successfully"
                  type={"success"}
                />
              </div>
            )}
            {error && (
              <div className="mt-4 flex items-center justify-end">
                <Toaster message={error} type={"error"} />
              </div>
            )}
            {imageFileUploadError && (
              <div className="mt-4 flex items-center justify-end">
                <Toaster message={imageFileUploadError} type={"error"} />
              </div>
            )}
            {(isUploadingFiles ||
              isUploadingImages ||
              isUploadingSingleImage ||
              isUploadingSingleFile) && (
              <div className="mt-4 flex items-center justify-end">
                <Toaster message="Uploading Files..." type={"info"} />
              </div>
            )}
            <div className="flex md:space-x-16 justify-between md:flex-row flex-col">
              <div className="w-full">
                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-400"
                    htmlFor="assetName"
                  >
                    Asset Name
                  </label>
                  <input
                    id="assetName"
                    className="bg-[#303030] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter Asset Name"
                    value={assetName}
                    onChange={(e) => setAssetName(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-400"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="bg-[#303030] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    rows="4"
                    placeholder="Write Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="flex space-x-4 space-around">
                  <div className="mb-4  w-full">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-400"
                      htmlFor="price"
                    >
                      Price of Token
                    </label>
                    <input
                      id="price"
                      className="bg-[#303030] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Set Price In ETH"
                      value={tokenPrice}
                      onChange={(e) => {
                        if (
                          e.target.value < 0 ||
                          e.target.value.toString().startsWith("0") ||
                          e.target.value.toString().includes("-")
                        ) {
                          setTokenPrice(0);
                        } else {
                          setTokenPrice(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="mb-4  w-full">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-400"
                      htmlFor="price"
                    >
                      Total Supply
                    </label>
                    <input
                      id="price"
                      className="bg-[#303030] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Set Price In ETH"
                      value={totalSupply}
                      onChange={(e) => {
                        if (
                          e.target.value < 0 ||
                          e.target.value.toString().startsWith("0") ||
                          e.target.value.toString().includes("-")
                        ) {
                          setTotalSupply(0);
                        } else {
                          setTotalSupply(e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex space-x-4 justify-between">
                  <div className="mb-4 w-full">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-400"
                      htmlFor="symbol"
                    >
                      Decimal
                    </label>
                    <input
                      id="symbol"
                      className="bg-[#303030] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="Enter Decimal"
                      value={decimal}
                      onChange={(e) => {
                        if (
                          e.target.value < 0 ||
                          e.target.value.toString().startsWith("0") ||
                          e.target.value.toString().includes("-")
                        ) {
                          setDecimal(0);
                        } else {
                          setDecimal(e.target.value);
                        }
                      }}
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-400"
                      htmlFor="symbol"
                    >
                      Symbol
                    </label>
                    <input
                      id="symbol"
                      className="bg-[#303030] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Enter Symbol"
                      value={symbol}
                      onChange={(e) => setSymbol(e.target.value)}
                    />
                  </div>
                  {/* <div className="mb-4 w-full">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-400"
                      htmlFor="tags"
                    >
                      Tags
                    </label>
                    <input
                      ref={tagInputRef}
                      id="tags"
                      className="bg-[#303030] w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Press enter to add tags"
                      onKeyDown={handleTagInputKeyDown}
                    />
                    <div className="flex flex-wrap mt-2">
                      {tags.map((tag, index) => (
                        <TagChip
                          key={index}
                          tag={tag}
                          onDelete={handleDeleteTag}
                        />
                      ))}
                    </div>
                  </div> */}
                </div>

                <div className="mb-4 w-full">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-400"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="bg-[#303030] rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value={0}>REAL ESTATE</option>
                    <option value={1}>ART-WORKS</option>
                    <option value={2}>INTELLECTUAL PROPERTY</option>
                    <option value={3}>OTHER</option>
                  </select>
                </div>
              </div>
              <div className="w-full">
                <div className="w-full mb-2">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-400"
                    htmlFor="assetImages"
                  >
                    Asset Images
                  </label>
                  <div
                    onClick={triggerAssetImageInput}
                    className="cursor-pointer bg-[#303030] w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <div className="flex flex-col items-center justify-center h-32 ">
                      <IoRocketOutline className="text-4xl text-gray-400" />
                      <span className="text-sm">Select Image</span>
                    </div>
                    <input
                      id="assetImages"
                      className="hidden"
                      ref={assetImagesInputRef}
                      type="file"
                      accept=".jpg,.jpeg,.png,.gif,.bmp,.svg"
                      onChange={handleAssetImageChange}
                      multiple
                    />
                  </div>
                  <div className="flex flex-wrap mt-2">
                    {assetImages.map((file) => (
                      <ImageChip
                        key={file.name}
                        file={file}
                        onDelete={handleAssetImageDelete}
                      />
                    ))}
                  </div>
                </div>
                <div className="w-full ">
                  <label
                    className="block mb-2 text-sm font-bold text-gray-400"
                    htmlFor="supportingFiles"
                  >
                    Supporting Files
                  </label>
                  <div
                    onClick={triggerSupportingFileInput}
                    className="cursor-pointer bg-[#303030] w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <div className="flex flex-col items-center justify-center h-32 ">
                      <IoRocketOutline className="text-4xl text-gray-400" />
                      <span className="text-sm">Select File</span>
                    </div>
                    <input
                      id="supportingFiles"
                      className="hidden"
                      ref={supportingFilesInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                      onChange={handleSupportingFileChange}
                      multiple
                    />
                  </div>
                  <div className="flex flex-wrap mt-2">
                    {supportingFiles.map((file) => (
                      <ImageChip
                        key={file.name}
                        file={file}
                        onDelete={handleSupportingDeleteFile}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end w-full">
              <button
                className="bg-primary-main hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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

export default EditAssetDetails;
