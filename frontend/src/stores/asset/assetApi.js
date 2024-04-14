import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Web3 from "web3";
import { assetContractABI } from "../../config/config";

export const contractAddress = import.meta.env
  .VITE_APP_WEB3_ASSET_CONTRACT_ADDRESS;

// I feel like we need this a lot
export const initWeb3 = async () => {
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
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_APP_BASE_URL }),
  endpoints: (builder) => ({
    uploadSingleFile: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("AssetImage", file);
        console.log("file", file);
        console.log("formData", formData);
        return {
          url: "/file-upload/single",
          method: "POST",
          body: formData,
        };
      },
    }),
    uploadMultipleFiles: builder.mutation({
      query: (files) => {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("AssetImages", file);
        });
        return {
          url: "/file-upload/multiple",
          method: "POST",
          body: formData,
        };
      },
    }),
    uploadSingleImage: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("AssetImage", file);
        return {
          url: "/file-upload/single",
          method: "POST",
          body: formData,
        };
      },
    }),
    uploadMultipleImages: builder.mutation({
      query: (files) => {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("AssetImages", file);
        });
        return {
          url: "/file-upload/multiple",
          method: "POST",
          body: formData,
        };
      },
    }),
    getAssets: builder.query({
      queryFn: async () => {
        const web3 = await initWeb3();
        const contract = new web3.eth.Contract(
          assetContractABI,
          contractAddress
        );
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
        name,
        symbol,
        decimals,
        initialSupply,
        tokenPrice,
        category,
        description,
        images,
        supportingFiles
      ) => {
        console.log(typeof initialSupply, "totalSupply");
        console.log(typeof tokenPrice, "tokenPrice");
        console.log(typeof decimals, "decimal");
        console.log(typeof category, "category");
        console.log(typeof description, "description");
        console.log(typeof images, "uploadedImages");
        console.log(typeof supportingFiles, "uploadedFiles");
        console.log(typeof symbol, "symbol");
        console.log(typeof name, "assetName");
        const web3 = await initWeb3();
        console.log("Abi", assetContractABI);
        if (!Array.isArray(assetContractABI)) {
          throw new Error("ABI must be an array.");
        }
        const contract = new web3.eth.Contract(
          assetContractABI,
          contractAddress
        );
        const accounts = await web3.eth.getAccounts();
        if (!accounts[0]) throw new Error("No Ethereum account found");
        try {
          const data = await contract.methods
            .createAsset(
              name,
              symbol,
              decimals,
              initialSupply,
              tokenPrice,
              category,
              description,
              images,
              supportingFiles
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

export const {
  useUploadSingleFileMutation,
  useUploadMultipleFilesMutation,
  useUploadSingleImageMutation,
  useUploadMultipleImagesMutation,
  useGetAssetsQuery,
  useRegisterAssetQuery,
} = blockchainApi;
