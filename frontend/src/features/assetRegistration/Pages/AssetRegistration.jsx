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
const AssetRegistration = () => {
  const [assetName, setAssetName] = useState("");
  const [description, setDescription] = useState("");
  const [tokenPrice, setTokenPrice] = useState(0);
  const [totalSupply, setTotalSupply] = useState(1);
  const [category, setCategory] = useState("1"); // Default category
  const [supportingFiles, setSupportingFiles] = useState([]);
  const supportingFilesInputRef = useRef(null);
  const [assetImages, setAssetImages] = useState([]);
  const assetImagesInputRef = useRef(null);
  // const [symbol, setSymbol] = useState("");
  // const [decimal, setDecimal] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
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
  const [isSingleToken, setIsSingleToken] = useState(true);
  // const {
  //   data,
  //   error: queryError,
  //   isLoading,
  //   refetch,
  // } = useRegisterAssetQuery(); // This is hypothetical; adjust according to your actual hook signature
  // const [tags, setTags] = useState([]);
  // const tagInputRef = useRef(null);
  const [error, setError] = useState(null);

  const uploadImages = useCallback(
    async (images, isMultiple = false) => {
      // const formData = new FormData();
      if (isMultiple) {
        console.log(images, "images");
        // images.forEach(image => formData.append('images[]', image));
        const imageUrls = await uploadMultipleImages(images).unwrap(); // Assumes returning an array of URLs
        if (imageUrls.error) throw new Error("Error uploading multiple images");
        console.log(imageUrls, "imageUrls");
        setUploadedImages((prev) => [
          ...prev,
          ...imageUrls.map((url) => url.url),
        ]);
      } else {
        // formData.append('image', images[0]);
        const img = images[0];
        const imageUrl = await uploadSingleImage(img).unwrap(); // Assumes returning a single URL
        if (imageUrl.error) throw new Error("Error uploading single image");
        console.log(imageUrl, "imageUrl");
        setUploadedImages((prev) => [...prev, imageUrl.url]);
      }
    },
    [uploadMultipleImages, uploadSingleImage]
  );
  const uploadFiles = useCallback(
    async (files, isMultiple = false) => {
      // const formData = new FormData();
      if (isMultiple) {
        console.log(files, "files");
        // files.forEach(file => formData.append('files[]', file));
        const urls = await uploadMultipleFiles(files).unwrap();
        if (urls.error) throw new Error("Error uploading multiple files");
        console.log(urls, "urls");
        setUploadedFiles((prev) => [...prev, ...urls.map((url) => url.url)]);
      } else {
        const file = files[0];
        const url = await uploadSingleFile(file).unwrap(); // Assumes returning a single URL
        if (url.error) throw new Error("Error uploading single file");
        console.log(url, "url");
        setUploadedFiles((prev) => [...prev, url.url]);
      }
    },
    [uploadMultipleFiles, uploadSingleFile]
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
        // symbol,
        totalSupply,
        // decimal,
        supportingFiles
      );
      if (
        !assetName ||
        !description ||
        !(tokenPrice > 0) ||
        !assetImages.length ||
        // !symbol ||
        !(totalSupply > 0) ||
        // !(decimal > 0) ||
        !supportingFiles.length
      ) {
        setLoading(false);
        setError(
          "Please fill all the above fields and upload all the necessary files!!"
        );
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

      // const web3 = await initWeb3();
      // const [contract, contractWithSigner] = await getAssetContractInstance();
      // const accounts = await window.ethereum.request({
      //   method: "eth_requestAccounts",
      // });

      // if (
      //   !contract ||
      //   !contractWithSigner ||
      //   !accounts ||
      //   accounts.length === 0
      // ) {
      //   setLoading(false);
      //   setError("Error Connecting to MetaMask. Please try again");
      //   return;
      // }

      // try {
      //   // uploadedImages.forEach((image) => {
      //   //   console.log(image, "image----");
      //   //   console.log(image.url, "image==");
      //   // });
      //   const name = assetName;
      //   const decimals = Number(decimal);
      //   const initialSupply = Number(totalSupply);
      //   // const images = uploadedImages.map((image) => image.url);
      //   // const supportingFiles = uploadedFiles.map((file) => file.url);
      //   console.log(uploadedImages, "images");
      //   console.log(uploadedFiles, "files");
      //   const transactionResponse = await contractWithSigner.createAsset(
      //     name,
      //     symbol,
      //     decimals,
      //     initialSupply,
      //     tokenPrice,
      //     category,
      //     description,
      //     uploadedImages,
      //     uploadedFiles
      //   );
      //   await transactionResponse.wait(); // Wait for the transaction to be mined
      //   setLoading(false);
      //   console.log("Asset created successfully!");
      //   console.log(transactionResponse, "data---");
      //   setLoading(false);
      //   setSuccess(true);
      //   // clear form
      //   setAssetName("");
      //   setDescription("");
      //   setTokenPrice(0);
      //   setCategory(0);
      //   setSupportingFiles([]);
      //   setAssetImages([]);
      //   setSymbol("");
      //   setTotalSupply(0);
      //   setDecimal(0);
      //   setUploadedFiles([]);
      //   setUploadedImages([]);
      //   // setTags([]);
      // } catch (error) {
      //   setLoading(false);
      //   setSuccess(false);
      //   console.log(error, "error");
      //   setError("Error creating asset. Please try again");
      // }
    },
    [
      assetName,
      description,
      tokenPrice,
      category,
      assetImages,
      // symbol,
      totalSupply,
      // decimal,
      supportingFiles,
      uploadFiles,
      uploadImages,
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
        const transactionResponse = await contractWithSigner.createAsset(
          assetName,
          // symbol,
          // Number(decimal),
          Number(totalSupply),
          Number(tokenPrice),
          Number(category),
          description,
          uploadedImages,
          uploadedFiles
        );

        await transactionResponse.wait();
        setSuccess(true);
        setError(null);
        setLoading(false);
        console.log("Asset created successfully!");
        resetForm();
      } catch (error) {
        setError("Sorry an the asset is not created ");
        setLoading(false);
        resetForm();
      }
    };

    if (uploadedFiles.length > 0 && uploadedImages.length > 0) {
      processSubmission();
    }
  }, [
    uploadedFiles,
    uploadedImages,
    assetName,
    // symbol,
    // decimal,
    totalSupply,
    tokenPrice,
    category,
    description,
  ]);

  const resetForm = () => {
    setAssetName("");
    setDescription("");
    setTokenPrice(0);
    setCategory(0);
    setSupportingFiles([]);
    setAssetImages([]);
    // setSymbol("");
    setTotalSupply(0);
    // setDecimal(0);
    setUploadedFiles([]);
    setUploadedImages([]);
  };
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

  // const handleTagInputKeyDown = (event) => {
  //   if (event.key === "Enter" && event.target.value.trim() !== "") {
  //     event.preventDefault();
  //     setTags([...tags, event.target.value.trim()]);
  //     tagInputRef.current.value = "";
  //   }
  // };
  // const handleDeleteTag = (tagToDelete) => {
  //   setTags(tags.filter((tag) => tag !== tagToDelete));
  // };

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
                      htmlFor="token"
                    >
                      Total Supply
                      <span className="text-xs text-gray-400">
                        {" "}
                        (Number of Tokens)
                      </span>
                    </label>
                    {isSingleToken ? (
                      <input
                        disabled
                        id="tokenOne"
                        className="bg-[#303030] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Set number of tokens"
                        defaultValue={1}
                      />
                    ) : (
                      <input
                        id="token"
                        className="bg-[#303030] w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
                        type="number"
                        placeholder="Set number of tokens"
                        value={totalSupply}
                        onChange={(e) => {
                          const val = e.target.value;
                          setTotalSupply(val > 0 ? val : 1);
                        }}
                      />
                    )}
                  </div>
                </div>
                <div className="flex space-x-4 justify-between">
                  {/* <div className="mb-4 w-full">
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
                  </div> */}
                  {/* <div className="mb-4 w-full">
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
                  </div> */}
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
                    onChange={(e) => {
                      const newCategory = e.target.value;
                      setIsSingleToken(newCategory === "1"); //"1" for single-token categories
                      setCategory(newCategory);
                    }}
                  >
                    <option value="0">REAL ESTATE</option>
                    <option value="1">ART-WORKS</option>
                    <option value="2">INTELLECTUAL PROPERTY</option>
                    <option value="3">OTHER</option>
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

export default AssetRegistration;
