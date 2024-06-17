/* eslint-disable react/prop-types */
import React from "react";
import dummyAsset from "../../../assets/dummy_asset.jpg";
import { Link } from "react-router-dom";
import { dummyUserAvatar } from "../../../assets/avatar";
import { useGetUsersInfoFromWalletQuery } from "../../../stores/auth/authAPI";

const AssetCard = ({ asset, openModal, isMyAsset = false }) => {
  console.log("asset", asset);

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
  return (
    <div
      className="bg-[#2B2B2B] shadow-lg rounded-lg overflow-hidden h-[420px] cursor-pointer"
      onClick={() => openModal(asset)}
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={asset.images.length > 0 ? asset.images[0] : dummyAsset}
          alt={asset.name}
        />
      </div>
      <div className="p-4 text-neutral flex flex-col justify-between flex-grow">
        <div className="flex items-center justify-between border-neutral-700 border-b">
          <h1 className="text-xl font-sans font-semibold">{asset.name}</h1>
          <div className="flex items-center gap-3 mt-2 mb-5">
            <img
              className="w-8 h-8 rounded-full object-cover"
              src={dummyUserAvatar}
              alt="Jese image"
            />
            <p className="text text-neutral-400 ">
              {fetchedAssets.ownerInfo
                ? fetchedAssets.ownerInfo.firstName +
                  " " +
                  fetchedAssets.ownerInfo.lastName
                : "Petros Beyene"}
            </p>
          </div>
        </div>

        <div className="my-3 flex justify-between">
          <div>
            <span className=" font-medium ">Total Supply</span>
            <p className=" pt-1">
              {asset.totalSupply.toLocaleString()} Units
            </p>
          </div>
          <div>
            <span className="font-medium ">Price</span>
            <p className=" pt-1">
              {asset.tokenPrice.toLocaleString()} WEI
            </p>
          </div>
        </div>
        <div>
          {asset.assetLocked ? (
            <div className="flex items-center ">
              <span className=" text-red-500">Locked</span>
            
            </div>
          ) : (
            <div className="flex items-center ">
              <span className=" text-green-500 ">Unlocked</span>
     
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => openModal(asset)}
            state={{ id: asset.ID }}
            className=" pt-6 mb-20 cursor-pointer"
          >
            See Details
          </button>
          {isMyAsset && (
            <Link
              to={`/edit-asset/${asset.ID}`}
              state={{ id: asset.ID }}
              className="  pt-6 cursor-pointer"
            >
              Edit
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetCard;
