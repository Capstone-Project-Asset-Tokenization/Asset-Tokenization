import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dummyUserAvatar } from "../../../assets/avatar";
import { getAssetContractInstance } from "../../../config/contractInstances";

function AssetDetail() {
  const location = useLocation();
  const asset = location.state;
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const downloadFile = (fileUrl, fileName) => {
    const anchor = document.createElement("a");
    anchor.style.display = "none";
    anchor.target = "_blank";
    anchor.href = fileUrl;
    anchor.download = fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const approveHandler = async () => {
    const [assetContract, assetContractWithSigner] =
      await getAssetContractInstance();
    try {
      const response = await assetContractWithSigner.verifyAsset(asset.ID, 1);
      console.log("asset verification response", response);
      navigate("/asset-verification");
    } catch (error) {
      console.log("asset verification error", error);
      setError(error.message.split('"')[1]);
    }
  };

  const rejectHandler = async () => {
    const [assetContract, assetContractWithSigner] =
      await getAssetContractInstance();
    try {
      const response = await assetContractWithSigner.verifyAsset(asset.ID, 2);
      console.log("asset verification response", response);
      navigate("/asset-verification");
    } catch (error) {
      console.log("asset verification error", error);
      setError(error.message.split('"')[1]);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container mx-auto">
        <div className=" rounded-lg shadow-lg overflow-hidden">
          <div className="w-full md:h-[30rem] sm:h-[15rem]">
            <img
              className="object-cover w-full h-full"
              src={asset.images[0]}
              alt="asset"
            />
          </div>
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-4">{asset.name}</h1>
            <p className="text-xl text-gray-800 mb-4">
              {parseInt(asset.tokenPrice)} ETH per Token
            </p>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Created By
              </h3>
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={dummyUserAvatar}
                  alt="owner"
                />
                <p className="text-xl font-semibold">
                  {asset.ownerInfo
                    ? `${asset.ownerInfo.firstName} ${asset.ownerInfo.lastName}`
                    : "User not found"}
                </p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Description
              </h3>
              <p className="text-xl">{asset.description}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Asset Images
              </h3>
              {asset.images.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3"
                >
                  <p className="text-xl">Image {index + 1}</p>
                  <button
                    onClick={() => downloadFile(doc, doc.split("/").pop())}
                    className="bg-primary-main text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Supporting Documents
              </h3>
              {asset.supportingDocuments.map((doc, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-3"
                >
                  <p className="text-xl">Document {index + 1}</p>
                  <button
                    onClick={() => downloadFile(doc, doc.split("/").pop())}
                    className="bg-primary-main text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Category
              </h3>
              <div className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded w-40">
                {asset.category}
              </div>
            </div>
            <div className="bg-red flex justify-center">
              <button
                onClick={approveHandler}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Approve
                </span>
              </button>
              <div className="w-5"></div>
              <button
                onClick={rejectHandler}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-primary-main to-pink-500 group-hover:from-primary-main group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Reject
                </span>
              </button>
            </div>
          </div>
        </div>
        {error && (
          <div className="mt-4 text-red-600 text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssetDetail;
