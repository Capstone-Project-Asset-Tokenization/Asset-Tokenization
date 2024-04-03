import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Web3 from "web3";

const contractAddress = import.meta.env.VITE_APP_WEB3_ASSET_CONTRACT_ADDRESS;
const contractABI = import.meta.env.VITE_APP_WEB3_ASSET_CONTRACT_ABI;

// I feel like we need this a lot
const initWeb3 = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      return new Web3(window.ethereum);
    } catch (error) {
      console.error("Error during web3 initialization:", error);
      throw error;
    }
  } else {
    console.error("Non-Ethereum browser detected. Consider trying MetaMask.");
    throw new Error("Ethereum not available");
  }
};

export const blockchainApi = createApi({
  reducerPath: "blockchainApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    getAssets: builder.query({
      queryFn: async () => {
        const web3 = await initWeb3();
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
        if (!accounts[0]) throw new Error("No Ethereum account found");

        try {
          const data = await contract.methods
            .getAssets()
            .call({ from: accounts[0] });
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM", error: error.message } };
        }
      },
    }),
    registerAsset: builder.query({
      queryFn: async (
        assetId,
        assetType,
        assetOwner,
        supportingDocuments,
        supportingImages,
        quantity,
        location,
        tags,
        status
      ) => {
        const web3 = await initWeb3();
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        const accounts = await web3.eth.getAccounts();
        if (!accounts[0]) throw new Error("No Ethereum account found");
        try {
          const data = await contract.methods
            .registerAsset(
              assetId,
              assetType,
              assetOwner,
              supportingDocuments,
              supportingImages,
              quantity,
              location,
              tags,
              status
            )
            .send({ from: accounts[0] });
          return { data };
        } catch (error) {
          return { error: { status: "CUSTOM", error: error.message } };
        }
      },
    }),
  }),
});

export const { useGetAssetsQuery } = blockchainApi;
