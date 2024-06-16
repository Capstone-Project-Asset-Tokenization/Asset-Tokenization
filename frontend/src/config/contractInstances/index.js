import { ethers } from "ethers";
import { AssetContractAddress, UserContractAddress, TransactionContractAddress } from "../contractAddress";
import { UserContractABI } from "../ABIs/userABI";
import { AssetContractABI } from "../ABIs/assetABI";
import { TransactionContractABI } from "../ABIs/transactionABI";
// import { AssetContractABI, UserContractABI, TransactionContractABI } from "../ABIs";

console.log("userABi", UserContractABI);
console.log("userContract", UserContractAddress);

export const getUserContractInstance = async () => {
  let provider = new ethers.BrowserProvider(window.ethereum);
  let contract = await new ethers.Contract(
    UserContractAddress,
    UserContractABI,
    // provider.getSigner()
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

export const getTransactionContractInstance = async () => {
  let provider = new ethers.BrowserProvider(window.ethereum);
  let contract = await new ethers.Contract(
    TransactionContractAddress,
    TransactionContractABI,
    provider.getSigner()
  );
  // let contractWithSigner = await contract.connect(provider.getSigner());

  const signer = await provider.getSigner()
  console.log('Signer', signer)
  let contractWithSigner = await new ethers.Contract(
    TransactionContractAddress,
    TransactionContractABI,
    signer
  );
  return [signer, contract, contractWithSigner];
};
