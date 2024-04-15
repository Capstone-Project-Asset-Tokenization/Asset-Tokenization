import { ethers } from "ethers";
import { AssetContractAddress, UserContractAddress } from "../contractAddress";
import { AssetContractABI, UserContractABI } from "../ABIs";

console.log("userABi", UserContractABI);
console.log("userContract", UserContractAddress);

export const getUserContractInstance = async () => {
  let provider = new ethers.BrowserProvider(window.ethereum);
  let contract = await new ethers.Contract(
    UserContractAddress,
    UserContractABI,
    provider.getSigner()
  );
  // let contractWithSigner = await contract.connect(provider.getSigner());
  let contractWithSigner = await new ethers.Contract(
    UserContractAddress,
    UserContractABI,
    await provider.getSigner()
  );
  return [contract, contractWithSigner];
};

export const getAssetContractInstance = async () => {
  let provider = new ethers.BrowserProvider(window.ethereum);
  let contract = await new ethers.Contract(
    AssetContractAddress,
    AssetContractABI,
    provider.getSigner()
  );
  // let contractWithSigner = await contract.connect(provider.getSigner());
  let contractWithSigner = await new ethers.Contract(
    AssetContractAddress,
    AssetContractABI,
    await provider.getSigner()
  );
  return [contract, contractWithSigner];
};
