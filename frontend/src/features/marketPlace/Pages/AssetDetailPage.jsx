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
import { useGetUsersInfoFromWalletQuery } from "../../../stores/auth/authAPI";
import { useSelector } from "react-redux";
import { ethers } from "ethers";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const AssetDetail = ({ asset, onClose, owner = false }) => {
  const categoryMapping = {
    0: "RealEstate",
    1: "Artwork",
    2: "IntellectualProperty",
    3: "Other",
  };

  const [isSingleToken, setIsSingleToken] = useState(
    Number(asset.category) === 1
  );
  console.log("isSingleToken", isSingleToken);
  const [buyModelOpen, setBuyModelOpen] = useState(false);
  const [newPrice, setNewPrice] = useState(Number(asset.tokenPrice));
  const [tokenCount, setTokenCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isMyAsset, setIsMyAsset] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const {
    data: users,
    error: userFetchError,
    isLoading: fetchingUsers,
  } = useGetUsersInfoFromWalletQuery([asset.creator.toLowerCase()]);

  if (userFetchError) {
    console.error("Error fetching user info:", userFetchError);
  }
  const fetchedAssets = { ...asset };
  fetchedAssets.ownerInfo = users ? users[0] : null;

  useEffect(() => {
    if (asset.creator.toLowerCase() === window.ethereum.selectedAddress) {
      setIsMyAsset(true);
    }
  }, [asset.creator]);

  const handleOpenBuyModal = () => {
    setBuyModelOpen(true);
  };

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

  const handleLockAsset = async () => {
    try {
      setLoading(true);
      // Ensure the contract instances are correctly retrieved
      const [contract, contractWithSigner] = await getAssetContractInstance();
      if (!contractWithSigner)
        throw new Error("Failed to get contract with signer");

      const tx = await contractWithSigner.lockTokens(asset.ID);
      if (!tx) throw new Error("Transaction failed");

      setLoading(false);
    } catch (error) {
      console.error("Error locking token:", error);
      setError("Error locking token, please try again!");
      setLoading(false);
    }
  };

  const handleUnlock = async () => {
    try {
      setLoading(true);
      // Ensure the contract instances are correctly retrieved
      const [contract, contractWithSigner] = await getAssetContractInstance();
      if (!contractWithSigner)
        throw new Error("Failed to get contract with signer");
      const tx = await contractWithSigner.unlockTokens(asset.ID);
      // if (!tx) throw new Error("Transaction failed");

      setLoading(false);
    } catch (error) {
      console.error("Error unlocking token:", error);
      setError("Error unlocking token, please try again!");
      setLoading(false);
    }
  };

  const handleBuyToken = async () => {
    try {
      setLoading(true);

      // Ensure the address is correctly retrieved
      const address = ethers.getAddress(window.ethereum.selectedAddress);
      console.log("address", address);
      if (!address) throw new Error("No Ethereum address selected");

      // Ensure the contract instances are correctly retrieved
      const [contract, contractWithSigner] = await getAssetContractInstance();
      if (!contractWithSigner)
        throw new Error("Failed to get contract with signer");
      const paymentAmount = ethers.parseUnits(
        (Number(tokenCount) * Number(asset.tokenPrice)).toString(),
        "ether"
      );
      // Ensure the transfer method is correctly called
      console.log(
        "asset",
        asset,
        "asset.ID",
        Number(asset.id),
        "address",
        address,
        "tokenCount",
        tokenCount,
        "paymentAmount",
        paymentAmount.toString(),
        "token price",
        asset.tokenPrice
      );
      const tx = await contractWithSigner.transfer(
        Number(asset.id),
        address,
        Number(tokenCount),
        // 3,
        {
          value: Number(tokenCount) * Number(asset.tokenPrice),
        }
      );
      if (!tx) throw new Error("Transaction failed");

      console.log(tx);
      setBuyModelOpen(false);
      setLoading(false);
    } catch (error) {
      console.error("Error buying token:", error);
      setError("Error buying token, please try again!");
      setLoading(false);
    }
  };

  const handleBuyConfirmation = () => {
    handleBuyToken()
      .then(() => {
        console.log("Token bought successfully");
      })
      .catch((error) => {
        console.error("Error buying token--:", error);
        setError("Error buying token, please try again!");
      });
  };

  if (!asset) return <div>No asset found</div>;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={!loading ? onClose : undefined}
    >
      {buyModelOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-10">
          <div
            className="bg-[#2B2B2B] text-white w-[50vw] mb-6 rounded-lg overflow-auto"
            onClick={(e) => e.stopPropagation()} // Stop propagation to prevent closing the first modal
          >
            <div className="flex flex-col gap-6 m-6 mx-20">
              <h1 class="text-2xl font-bold mb-2">Purchase Asset</h1>

              <h2 className="text-4xl mb-2 font-bold">{asset.name}</h2>
              <p className="text-xl opacity-50 ">
                You are about to buy a token of this asset for{" "}
                <span className="font-bold">
                  {Number(asset.tokenPrice)} WEI
                </span>
              </p>
              <p className="text-xl mb-5 opacity-50 ">
                This asset have a total of{" "}
                <span className="font-bold">{Number(asset.totalSupply)}</span>{" "}
                tokens available
              </p>
              {isSingleToken ? null : (
                <div className="flex w-full">
                  <label className="text-xl font-bold text-nowrap pr-5 opacity-50 ">
                    Number of Tokens
                  </label>
                  <input
                    type="number"
                    className="bg-neutral-800 text-white w-full p-2 rounded outline-none"
                    defaultValue={1}
                    onChange={(e) => {
                      setTokenCount(e.target.value);
                      setNewPrice(e.target.value * Number(asset.tokenPrice));
                    }}
                    disabled={loading}
                  />
                </div>
              )}
              <label className="text-xl opacity-50 ">
                Total Price : <span className="font-bold">{newPrice} WEI</span>
              </label>
              <button
                onClick={handleBuyConfirmation}
                className="bg-primary-main text-white px-4 py-2 rounded flex items-center justify-center position-relative bottom-0"
                disabled={loading}
              >
                {loading ? (
                  <div>
                    <AiOutlineLoading3Quarters className="animate-spin text-xl my-[0.5]" />
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

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex justify-between items-center border-b border-neutral-800 px-16 py-6 mx-6">
              <h1 className="text-3xl font-medium uppercase">{asset.name}</h1>
              <div className="flex justify-between space-x-2 items-center">
                <h3 className="text-neutral-500">Created By</h3>
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 mr-2 rounded-full object-cover"
                    src={dummyUserAvatar}
                    alt="Jese image"
                  />
                  <p className="text-neutral-300">
                    {fetchedAssets.ownerInfo
                      ? fetchedAssets.ownerInfo.firstName +
                        " " +
                        fetchedAssets.ownerInfo.lastName
                      : "Petros Beyene"}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-b border-neutral-800 px-16 py-3 mx-6">
              <p className="text-xl pb-4 opacity-50 flex justify-between ">
                <span className="font-medium pr-4">Price</span>
                <span className="font-bold">
                  {" "}
                  {parseInt(asset.tokenPrice)} WEI / Token
                </span>
              </p>
              <p
                className={`text-xl pb-4 opacity-50 flex justify-between ${
                  Number(asset.totalSupply) <= 10 ? "text-red-500" : ""
                }`}
              >
                <span className="pr-4 font-medium">Total tokens</span>{" "}
                <span className="font-bold">{Number(asset.totalSupply)}</span>
              </p>
              <p
                className={`text-xl pb-4 opacity-50 flex justify-between ${
                  Number(asset.totalSupply) <= 10 ? " text-red-500" : ""
                }`}
              >
                <span className="pr-4 font-medium">Available Tokens</span>{" "}
                <span className="font-bold">
                  {Number(asset.availableToken)}
                </span>
              </p>
              {owner && (
                <p
                  className={`text-xl pb-4 opacity-50 flex justify-between ${
                    Number(asset.totalSupply) <= 10 ? " text-red-500" : ""
                  }`}
                >
                  <span className="pr-4 font-medium">Owned Tokens</span>{" "}
                  <span className="font-bold">{Number(asset.ownedTokens)}</span>
                </p>
              )}
            </div>
          </div>

          <div className="border-b border-neutral-800 px-16 pb-6 mx-6">
            <h3 className="font-bold text-xl opacity-60 mb-3">Description</h3>
            <p className="text-neutral-400">{asset.description}</p>
          </div>
          {isMyAsset && (
            <div className="px-16 mx-6 flex justify-between border-b border-neutral-800">
              <div>
                <h3 className="font-bold text-xl opacity-50  mb-3">
                  Supporting Documents
                </h3>
                <div className="flex flex-col gap-4">
                  {asset.supportingDocuments.map((doc, index) => (
                    <div key={index} className="flex items-center">
                      <p className=" mr-4 text-neutral-400">
                        Document {index + 1}
                      </p>
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
                <h3 className="font-bold text-xl opacity-50  mb-3">
                  Supporting Images
                </h3>
                <div className="flex flex-col space-y-2">
                  {asset.images.map((doc, index) => (
                    <div key={index} className="flex items-center">
                      <p className=" mr-4 text-neutral-400">
                        Image {index + 1}
                      </p>
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
            </div>
          )}
          <div className="px-16 mx-6 flex justify-between items-center ">
            <div className="flex justify-between items-center space-x-2">
              <h3 className="font-bold opacity-50">Category</h3>
              <span className=" bg-neutral-900 bg-opacity-30 text-neutral-200 font-medium px-2.5 py-2 rounded">
                {categoryMapping[asset.category]}
              </span>
            </div>

            <div className="flex flex-row space-x-4">
              {asset.assetLocked ? (
                <div className="flex items-center gap-2">
                  <h3 className="font-bold opacity-50 ">Status</h3>
                  <span className="opacity-50 font-mono font-thin text-red-500">
                    Locked
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h3 className="font-bold opacity-50 ">Status</h3>
                  <span className="font-mono font-thin text-green-500">
                    Unlocked
                  </span>
                </div>
              )}

              <div>
                {/* create button based on locked status */}
                {owner && (
                  <>
                    {" "}
                    {asset.assetLocked ? (
                      <button
                        className="bg-primary-main text-white px-4 py-2 rounded"
                        onClick={() => {
                          handleUnlock();
                        }}
                      >
                        Unlock Asset
                      </button>
                    ) : (
                      <button
                        className="bg-primary-main text-white px-4 py-2 rounded"
                        onClick={() => {
                          handleLockAsset();
                        }}
                      >
                        Lock Asset
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>

          {!isMyAsset && !user.roles.includes("ADMIN") && (
            <button
              onClick={handleOpenBuyModal}
              className="bg-primary-main mx-20 my-4 text-white px-4 py-2 rounded"
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
