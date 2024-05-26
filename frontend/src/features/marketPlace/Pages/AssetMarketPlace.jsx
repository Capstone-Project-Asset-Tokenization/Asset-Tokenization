import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import AssetCard from "../Components/AssetCard";
import SearchForm from "../Components/SearchForm";
import { getAssetContractInstance } from "../../../config/contractInstances";
import { SpinLoader } from "../../../components/common/spinner/spinLoader";
import AssetDetail from "./AssetDetailPage";
import { createAssetObjFromContract } from "../../../utils/contractToObject";
import { useGetUsersInfoFromWalletQuery } from "../../../stores/auth/authAPI";

const Marketplace = () => {
  const [assets, setAssets] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayedAssets, setDisplayedAssets] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [ownerAddresses, setOwnerAddresses] = useState([]);

  // Use the hook at the top level
  const {
    data: users,
    error: userFetchError,
    isLoading: fetchingUsers,
  } = useGetUsersInfoFromWalletQuery(ownerAddresses, {
    skip: ownerAddresses.length === 0,
  });

  const fetchAssets = async () => {
    try {
      const [contract, contractWithSigner] = await getAssetContractInstance();
      let fetchedAssets = await contractWithSigner.getAssetsByFilter(1);
      // fetch assets that are not the user's
      console.log("current address", window.ethereum.selectedAddress);
      fetchedAssets = fetchedAssets.map((asset) =>
        asset.creator !== ethers.getAddress(window.ethereum.selectedAddress)
          ? asset
          : null
      );
      fetchedAssets = fetchedAssets.filter((asset) => asset !== null);
      console.log(fetchedAssets, "fetchedAssets");
      setAssets(fetchedAssets);
      setDisplayedAssets(fetchedAssets);
      const addresses = allAssets.map((asset) => asset.creator);
      setOwnerAddresses(addresses);
    } catch (error) {
      console.error("Error fetching assets from blockchain:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (asset) => {
    setSelectedAsset(asset);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAsset(null);
  };

  const handleSearch = (criteria) => {
    console.log(criteria);
    const categoryMapping = {
      RealEstate: 0,
      Artwork: 1,
      IntellectualProperty: 2,
      Other: 3,
    };
    const categoryValue = criteria.category
      ? categoryMapping[criteria.category]
      : null;

    const filtered = combinedData.filter((asset) => {
      const assetCategory = parseInt(asset.category);
      return (
        (!criteria.name ||
          asset.name.toLowerCase().includes(criteria.name.toLowerCase())) &&
        (categoryValue === null || assetCategory === categoryValue) &&
        (!criteria.minPrice ||
          parseFloat(asset.tokenPrice) >= parseFloat(criteria.minPrice)) &&
        (!criteria.maxPrice ||
          parseFloat(asset.tokenPrice) <= parseFloat(criteria.maxPrice))
      );
    });
    setDisplayedAssets(filtered);
  };

  useEffect(() => {
    fetchAssets();

    const handleAccountChange = (accounts) => {
      if (accounts.length > 0) {
        console.log("Account connected:", accounts[0]);
        fetchAssets();
      } else {
        console.log("Please connect to MetaMask.");
      }
    };

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChange);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
      }
    };
  }, []);

  useEffect(() => {
    if (assets.length > 0) {
      const combined = assets.map((asset, index) => ({
        id: asset[0],
        name: asset[1],
        currency: asset[2],
        totalSupply: asset[3],
        tokenPrice: asset[4],
        availableSupply: asset[5],
        category: asset[6],
        status: asset[7],
        description: asset[8],
        images: asset[9],
        documents: asset[10],
        creator: asset[11],
        ownerInfo: users ? users[index] : null,
      }));
      setCombinedData(combined);
      setDisplayedAssets(combined);
    }
    // } else if (userFetchError) {
    //   setError(userFetchError.message || 'An error occurred while fetching user data.');
    // }
  }, [assets, users, userFetchError]);

  if (loading || fetchingUsers)
    return (
      <div>
        <SpinLoader />
      </div>
    );

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col text-white">
      <div className="bg-[#2B2B2B] p-6 mb-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans pl-5">
          Browse Marketplace
        </h1>
        <p className="mb-6 text-2xl font-sans pl-5">
          Browse more through our Marketplace.
        </p>
        <SearchForm onSearch={handleSearch} />
      </div>
      <div className="bg-[#3B3B3B] w-full p-6 flex flex-wrap items-center justify-center">
        {displayedAssets.map((asset, index) => (
          <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2" key={index}>
            <AssetCard asset={asset} openModal={openModal} />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AssetDetail asset={selectedAsset} onClose={closeModal} />
      )}
    </div>
  );
};

export default Marketplace;
