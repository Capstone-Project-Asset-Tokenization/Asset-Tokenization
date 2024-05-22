import React from "react";
import dummyAsset from "../../../assets/dummy_asset.jpg";
import { Link } from "react-router-dom";

const AssetCard = ({ asset, openModal, isMyAsset = false }) => {
  return (
    <div
      className="flex flex-col shadow-lg rounded-[20px] overflow-hidden h-[450px] cursor-pointer"
      onClick={() => openModal(asset)}
    >
      <div className="h-48 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={asset.images.length > 0 ? asset.images[0] : dummyAsset}
          alt={asset.name}
        />
      </div>
      <div className="p-6 bg-[#2B2B2B] text-white flex flex-col justify-between flex-grow">
        <h1 className="text-2xl font-sans font-semibold">{asset.name}</h1>
        <div className="my-3 flex justify-between">
          <div>
            <span className="opacity-50 font-mono font-thin">Total Supply</span>
            <p className="font-light pt-1">
              {asset.totalSupply.toLocaleString()} Units
            </p>
          </div>
          <div>
            <span className="opacity-50 font-mono font-thin">Price</span>
            <p className="font-light pt-1">
              {asset.tokenPrice.toLocaleString()} ETH
            </p>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => openModal(asset)}
            state={{ id: asset.ID }}
            className="opacity-50 font-mono font-thin pt-6"
          >
            See Details
          </button>
          {isMyAsset && (
            <Link
              to={`/edit-asset/${asset.ID}`}
              state={{ id: asset.ID }}
              className="opacity-50 font-mono font-thin pt-6"
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
