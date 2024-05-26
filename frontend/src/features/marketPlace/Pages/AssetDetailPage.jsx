import React, { useState, useEffect } from "react";
import dummyAsset from "../../../assets/dummy_asset.jpg";
import { dummyUserAvatar } from "../../../assets/avatar";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from "prop-types";
import { getAssetContractInstance } from "../../../config/contractInstances";
import { SpinLoader } from "../../../components/common/spinner/spinLoader";
import sprite from "../../../assets/sprite.svg";
import "../../../customCarousel.css";

const AssetDetail = ({ asset, onClose }) => {
  const categoryMapping = {
    0: "RealEstate",
    1: "Artwork",
    2: "IntellectualProperty",
    3: "Other",
  };

  const [isSingleToken, setIsSingleToken] = useState(asset.category === 1);
  const [buyModelOpen, setBuyModelOpen] = useState(false);
  const [newPrice, setNewPrice] = useState(asset.tokenPrice);
  const [tokenCount, setTokenCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMyAsset, setIsMyAsset] = useState(false);

  useEffect(() => {
    if (asset.creator.toLowerCase() === window.ethereum.selectedAddress) {
      setIsMyAsset(true);
    }
  }, [asset.creator]);

  const handleOpenBuyModal = () => {
    setBuyModelOpen(true);
  };

  const handleBuyToken = async () => {
    try {
      setLoading(true);
      const address = window.ethereum.selectedAddress;
      const [assetContract, assetContractWithSigner] =
        await getAssetContractInstance();
      const tx = await assetContractWithSigner.transfer(
        asset.ID,
        address,
        Number(tokenCount)
      );
      await tx.wait();
      setBuyModelOpen(false);
      setLoading(false);
    } catch (error) {
      console.error("Error buying token:", error);
      setError("Error buying token, please try again!");
      setLoading(false);
    }
  };

  if (!asset) return <div>No asset found</div>;

  console.log("images", asset.images.length);
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={!loading ? onClose : undefined}
    >
      {buyModelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-10">
          <div
            className="bg-[#2B2B2B] text-white w-[50vw] h-[90vh] mb-6 rounded-lg overflow-auto"
            onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing the first modal
          >
            <div className="flex flex-col gap-6 m-6 mx-20">
              <h1 className="text-6xl mb-5">Buy Asset </h1>
              <h2 className="text-4xl mb-5">{asset.name}</h2>
              <p className="text-xl mb-5 opacity-50 font-mono">
                You are about to buy a token of this asset for{" "}
                <span className="font-bold">
                  {Number(asset.tokenPrice)} ETH
                </span>
              </p>
              <p className="text-xl mb-5 opacity-50 font-mono">
                You will be able to view the asset details after the purchase
              </p>
              {isSingleToken ? null : (
                <>
                  <label className="text-xl opacity-50 font-mono">
                    Number of Tokens
                  </label>
                  <input
                    type="number"
                    className="bg-gray-600 text-white w-1/2 p-2 rounded outline-none"
                    onChange={(e) => {
                      setTokenCount(e.target.value);
                      setNewPrice(e.target.value * Number(asset.tokenPrice));
                    }}
                    disabled={loading}
                  />
                </>
              )}
              <label className="text-xl opacity-50 font-mono">
                Total Price : <span className="font-bold">{newPrice} ETH</span>
              </label>
              <button
                onClick={handleBuyToken}
                className="bg-primary-main text-white px-4 py-2 rounded flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center w-12 h-12 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600">
                    <svg
                      aria-hidden="true"
                      className="w-12 h-12 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                ) : (
                  "Confirm Purchase"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="bg-[#2B2B2B] text-white w-[50vw] h-[90vh] mb-6 rounded-lg overflow-auto"
        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing the first modal
      >
        <div className="">
          <Carousel
            // useKeyboardArrows={true}
            showThumbs={false}
            dynamicHeight={false}
            infiniteLoop={true}
            showIndicators
            renderArrowNext={(clickHandler, hasNext) => {
              return (
                hasNext && (
                  <button
                    className="nav_btn nav_btn_right"
                    onClick={clickHandler}
                  >
                    <svg>
                      <use xlinkHref={sprite + "#right"}></use>
                    </svg>
                  </button>
                )
              );
            }}
            renderArrowPrev={(clickHandler, hasNext) => {
              return (
                hasNext && (
                  <button
                    onClick={clickHandler}
                    className="nav_btn nav_btn_left"
                  >
                    <svg>
                      <use xlinkHref={sprite + "#left"}></use>
                    </svg>
                  </button>
                )
              );
            }}
          >
            {asset.images.length > 0 ? (
              asset.images.map((img, index) => (
                <div key={index} className="w-full h-full overflow-hidden">
                  <img
                    className="object-cover h-[300px]"
                    src={img}
                    alt={`Asset Image ${index + 1}`}
                  />
                </div>
              ))
            ) : (
              <div className="w-full h-full">
                <img
                  className="object-cover h-[400px]"
                  src={dummyAsset}
                  alt="No images available"
                />
              </div>
            )}
          </Carousel>
        </div>

        <div className="flex flex-col gap-6 m-6 mx-20">
          <div>
            <h1 className="text-6xl mb-5">{asset.name}</h1>
            <p className="text-xl mb-5 opacity-50 font-mono">
              {parseInt(asset.tokenPrice)} ETH per Token
            </p>
            <p
              className={`text-xl opacity-50 font-mono ${
                Number(asset.totalSupply) <= 10 ? "text-red-500" : ""
              }`}
            >
              Available Tokens for this asset are :{" "}
              <span className="font-bold">{Number(asset.totalSupply)}</span>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold opacity-50 font-mono mb-3">
              Created By
            </h3>
            <div className="flex items-center gap-3">
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={dummyUserAvatar}
                alt="Jese image"
              />
              <p className="font-mono">
                {asset.ownerInfo
                  ? asset.ownerInfo.firstName + " " + asset.ownerInfo.lastName
                  : "User not found"}
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-xl opacity-50 font-mono mb-3">
              Description
            </h3>
            <p className="font-mono">{asset.description}</p>
          </div>
          <div>
            <h3 className="font-bold mb-3">Category</h3>
            <h3 className="font-bold text-xl opacity-50 font-mono mb-3">
              Supporting Documents
            </h3>
            <div className="flex flex-col gap-4">
              {asset.documents.map((doc, index) => (
                <div key={index} className="flex items-center">
                  <p className="font-mono mr-4">Document {index + 1}</p>
                  <button
                    onClick={() =>
                      downloadFile(
                        doc,
                        doc.split("/")[doc.split("/").length - 1]
                      )
                    }
                    className="bg-primary-main text-white px-2 py-1 rounded"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold opacity-50 mb-3">Category</h3>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-2 rounded">
              {categoryMapping[asset.category]}
            </span>
          </div>
          {!isMyAsset && (
            <button
              onClick={handleOpenBuyModal}
              className="bg-primary-main text-white px-4 py-2 rounded"
            >
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetDetail;

AssetDetail.propTypes = {
  asset: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
