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
      const addresses = fetchedAssets.map((asset) => asset.creator);
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
        id: asset[0], // ID
        name: asset[1], // name
        symbol: asset[2], // symbol
        decimals: asset[3], // decimals
        totalSupply: asset[4], // totalSupply
        tokenPrice: asset[5], // tokenPrice
        verificationStatus: asset[6], // verificationStatus
        category: asset[7], // category
        description: asset[8], // description
        images: asset[9], // images
        supportingDocuments: asset[10], // supportingDocuments
        creator: asset[11], // creator
        ownerInfo: users ? users[index] : null,
        availableToken: asset[12],
      }));
      setCombinedData(combined);
      setDisplayedAssets(combined);
    }
    // } else if (userFetchError) {
    //   setError(userFetchError.message || 'An error occurred while fetching user data.');
    // }
  }, [assets, users, userFetchError]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // if (displayedAssets.length === 0) {
  //   return (

  //   );
  // }

  return (
    <div className="flex flex-col text-neutral-400">
      <div className="bg-[#2B2B2B] p-6 mb-10">
        <h1 className="text-3xl mt-6 text-neutral-200 md:text-4xl font-bold mb-16 pl-5">
          Browse Marketplace
        </h1>
        <p className="text-lg text-neutral-400 pl-5">
          Browse more through our marketplace.
        </p>
        <SearchForm onSearch={handleSearch} />
      </div>
      {(loading || fetchingUsers) && (
        <div className="flex h-[30vh] bg-[#303030] justify-center items-center w-full ">
          <SpinLoader />
        </div>
      )}
      {!loading && !fetchingUsers && displayedAssets.length === 0 && (
        <div className="bg-[#303030]">
          <div className="flex flex-col py-6 items-center justify-center  text-white">
            <h1
              className="text-3xl font-bold mb-6 text-neutral-300 font-sans
              "
            >
              No assets found
            </h1>
            <p className="text-xl text-neutral-400">
              There are no assets available at the moment.
            </p>
          </div>
        </div>
      )}
      <div className="bg-[#303030] w-full p-6 px-16 space-x-6 flex items-center justify-center">
        {!loading &&
          !fetchingUsers &&
          displayedAssets.map((asset, index) => (
            <div className="basis-1/4" key={index}>
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
