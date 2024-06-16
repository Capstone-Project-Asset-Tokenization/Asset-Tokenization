import React, { useEffect, useState } from "react";
import {
  getAssetContractInstance,
  getUserContractInstance,
} from "../../../config/contractInstances";
import { createAssetObjFromContract } from "../../../utils/contractToObject";
import { useGetUsersInfoFromWalletQuery } from "../../../stores/auth/authAPI";
import { Link } from "react-router-dom";
import { dummyUserAvatar } from "../../../assets/avatar";
import { enumMap } from "../../../utils/enumMap";
import { SpinLoader } from "../../../components/common/spinner/spinLoader";

function AssetVerification() {
  const [assets, setAssets] = useState([]);
  const [fullAssetsData, setFullAssetsData] = useState([]);
  const [filteredAssetsData, setFilteredAssetsData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [assetStatus, setAssetStatus] = useState(0);
  const ownerAddresses = assets.map((asset) => asset.creator.toLowerCase());

  const {
    data: users,
    error: userFetchError,
    isLoading: fetchingUsers,
  } = useGetUsersInfoFromWalletQuery(ownerAddresses);

  console.log("userData", users);

  const handleAssetStatusChange = (status) => {
    setAssetStatus(status);
    fetchAssets(status);
  };

  const fetchAssets = async (verificationStatus = 1) => {
    try {
      setLoading(true);
      const [assetContract, assetContractWithSigner] =
        await getAssetContractInstance();
      let response = await assetContractWithSigner.getAssetsByFilter(
        verificationStatus
      );
      response = await Promise.all(
        response.map(async (item) => {
          return await createAssetObjFromContract(item);
        })
      );
      response = response.filter(
        (item) => item.creator !== "0x0000000000000000000000000000000000000000"
      );
      setAssets(response);
      setLoading(false);
      console.log(
        "assets",
        response,
        response[0],
        "verification status",
        verificationStatus
      );
    } catch (error) {
      setLoading(false);
      setError(error.message);
      console.log("error in fetch asset", error);
    }
  };

  useEffect(() => {
    fetchAssets(assetStatus);
  }, [assetStatus]);

  useEffect(() => {
    setFullAssetsData(
      assets.map((asset, index) => ({
        ...asset,
        ownerInfo: users ? users[index] : "",
      }))
    );
  }, [assets, users]);

  const handleSearch = (e) => {
    const filteredData = fullAssetsData.filter((asset) => {
      const name = asset.name.toLowerCase();
      const ownerName = asset.ownerInfo
        ? `${asset.ownerInfo.firstName} ${asset.ownerInfo.lastName}`.toLowerCase()
        : "";
      return (
        name.includes(e.target.value.toLowerCase()) ||
        ownerName.includes(e.target.value.toLowerCase())
      );
    });
    setFilteredAssetsData(filteredData);
  };

  const tabs = [
    { label: "All" },
    { label: "Verified" },
    { label: "Unverified" },
    { label: "Declined" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-10">Created Assets</h1>

      <div className="flex justify-around my-8">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 w-full px-4 font-medium focus:outline-none ${
              assetStatus === index
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-neutral-500 hover:text-neutral-300"
            }`}
            onClick={() => handleAssetStatusChange(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="relative mt-20 mb-8">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-neutral-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </span>

        <input
          type="text"
          className="w-full py-3 px-10 bg-[#303030] outline-none rounded-sm"
          placeholder="Search by name"
          onChange={(e) => handleSearch(e)}
        />
      </div>

      <div className="relative overflow-x-auto mt-10 shadow-md sm:rounded-lg">
        {loading || fetchingUsers ? (
          <div className="flex justify-center h-80 items-center">
            <SpinLoader></SpinLoader>
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-neutral-500 dark:text-neutral-400">
            <thead className="text-xs h-16 text-neutral-700 uppercase bg-background-secondary dark:bg-background-secondary dark:text-neutral-400">
              <tr>
                <th scope="col" className="p-4">
                  #
                </th>
                <th scope="col" className="px-6 py-3">
                  Owner Info
                </th>
                <th scope="col" className="px-6 py-3">
                  Asset Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Detail
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {(filteredAssetsData.length > 0
                ? filteredAssetsData
                : fullAssetsData
              ).map((asset, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-background-primary dark:border-neutral-700 hover:bg-background-secondary dark:hover:bg-background-secondary"
                >
                  <td className="w-4 p-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-neutral-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full object-cover "
                      src={dummyUserAvatar}
                      alt="User image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">
                        {asset.ownerInfo?.firstName}
                      </div>
                      <div className="font-normal text-neutral-500">
                        {asset.ownerInfo?.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4">{asset.name}</td>
                  <td className="px-6 py-4">{asset.category}</td>
                  <td className="px-6 py-4">
                    {enumMap.verificationStatus[asset.verificationStatus]}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Link
                        state={asset}
                        to="/asset-verification-detail"
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        See Detail
                      </Link>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex justify-around ">
                      {Number(asset.verificationStatus) === 0 ? (
                        <>
                          <button
                            onClick={() => approveHandler(asset.ID)}
                            // className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-neutral-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                          >
                            <span
                              className="relative px-[41px] py-2.5 transition-all ease-in duration-75 text-white
                           bg-primary-dark font-bold"
                            >
                              Approve
                            </span>
                          </button>
                          <button
                            onClick={() => rejectHandler(asset.ID)}
                            // className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-neutral-900 rounded-lg group bg-gradient-to-br from-primary-main to-pink-500 group-hover:from-primary-main group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                          >
                            <span className="px-8 py-2.5 transition-all ease-in duration-75 bg-neutral-800 border border-red-400">
                              Reject
                            </span>
                          </button>
                        </>
                      ) : Number(asset.verificationStatus) === 1 ? (
                        <button
                          onClick={() => rejectHandler(asset.ID)}
                          // className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-neutral-900 rounded-lg group bg-gradient-to-br from-primary-main to-pink-500 group-hover:from-primary-main group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                        >
                          <span className=" px-8 py-2.5 transition-all ease-in duration-75 bg-neutral-800 border border-red-400">
                            Reject
                          </span>
                        </button>
                      ) : (
                        <button
                          onClick={() => approveHandler(asset.ID)}
                          // className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-neutral-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                        >
                          <span className=" px-8 py-2.5 transition-all ease-in duration-75 bg-neutral-800 border border-pirple-400">
                            Approve
                          </span>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && !fetchingUsers && fullAssetsData.length === 0 && (
          <div className="flex justify-center items-center h-80 py-8 bg-neutral-800">
            <div className="text-center">
              <p className="text-lg mb-8 text-neutral-400">
                It seems there are no assets to verify at the moment.
              </p>
            </div>
          </div>
        )}

        <nav
          className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
          aria-label="Table navigation"
        >
          <span className="text-sm font-normal text-neutral-500 dark:text-neutral-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {filteredAssetsData.length > 0 ? 1 : 0}-
              {filteredAssetsData.length > 10 ? 10 : filteredAssetsData.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {filteredAssetsData.length}
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-neutral-500 bg-white border border-neutral-300 rounded-s-lg hover:bg-background-secondary hover:text-neutral-700 dark:bg-background-primary dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-background-secondary dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            {[1].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-neutral-500 bg-white border border-neutral-300 hover:bg-background-secondary hover:text-neutral-700 dark:bg-background-primary dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-background-secondary dark:hover:text-white"
                >
                  {item}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-neutral-500 bg-white border border-neutral-300 rounded-e-lg hover:bg-background-secondary hover:text-neutral-700 dark:bg-background-primary dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-background-secondary dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AssetVerification;
