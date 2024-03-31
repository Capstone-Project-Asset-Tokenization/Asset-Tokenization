import React, { useState } from "react";
import { ethers } from "ethers";

const ConnectWallet = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const connectMetaMask = async () => {
    setLoading(true); 
    if (window.ethereum) {
      try {
        const result = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        accountChanged(result[0]);
      } catch (error) {
        setErrorMessage("Error connecting wallet: " + error.message);
      }
    } else {
      setErrorMessage("Please install MetaMask browser extension!!");
    }
    setLoading(false);
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  };

  // This function will be used in trading page to get user balance
  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage("Error fetching balance: " + error.message);
      });
  };

  const completeRegisteration = () => {
    console.log(defaultAccount, "Send to backend");
  };

  return (
    <div className="md:flex justify-between space-x-5 items-center px-20">
      <div className="basis-1/2 justify-center items-center">
        <img
          className="mx-auto animated-element"
          src="../src/assets/connect_wallet.png"
          alt="clip image"
        />
      </div>
      <div className="basis-1/2 pb-8">
        <h2 className="text-4xl mb-4 font-semibold">Connect wallet</h2>
        <p className=" mb-2">
          Choose a wallet you want to connect. There are several wallet
          providers.
        </p>
        <button
          onClick={connectMetaMask}
          className="border bg-neutral-800 border-primary-main flex rounded-xl mt-10 px-6 py-2 space-x-2 items-center justify-between"
        >
          <img
            className={`${isLoading ? "animate-spin" : ""}`}
            width={30}
            height={30}
            src="../src/assets/metamask.png"
            alt=""
          />
          <p>Connect Metamask</p>
        </button>

        {/* <h3>{defaultAccount}</h3> */}
        {defaultAccount && (
          <p className="mt-6 text-green-400">
            Your MetaMask account is connected!
          </p>
        )}
        {errorMessage && <p className="mt-6 text-red-400">{errorMessage}</p>}

        {defaultAccount && (
          <button
            onClick={completeRegisteration}
            className="bg-primary-main hover:bg-primary-dark rounded py-2 px-4 mt-6"
          >
            Complete registration
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectWallet;
