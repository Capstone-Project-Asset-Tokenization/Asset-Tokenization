import React from "react";
// import "animate.css";
import { IoRocketOutline } from "react-icons/io5";
import LandingCard from "../components/landing/LandingCard";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const authState = useSelector((state) => state.auth);
  return (
    <div className=" px-6 sm:px-20">
      <div className="md:flex justify-between items-center ">
        <div className="basis-1/2 ml-8">
          <h1 className="text-4xl sm:text-6xl font-bold leading-16 mb-10 tracking-wide">
            Asset <br /> Tokenization <br />
            Platform
          </h1>
          <p className="mb-2">
            Tokenize and manage all your assets easily and quickly.
          </p>
          <p> Use simpler and cleanear ways .</p>
          <Link
            to={authState.isAuthenticated ? "/asset-registration" : "/signup"}
          >
            <button className="bg-primary-main rounded-xl mt-10 px-6 py-2 flex items-center">
              <IoRocketOutline className="inline-block mr-2" />
              Get Started
            </button>
          </Link>
          <div className="my-10 flex justify-between w-3/5">
            <div>
              <h2 className="text-2xl font-semibold">240+</h2>
              <p>Total sales</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">100K+</h2>
              <p>Auctions</p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">1000+</h2>
              <p>Users</p>
            </div>
          </div>
        </div>
        <div className="basis-1/2 justify-center items-center">
          <img
            className="mx-auto animate__animated animate__fadeInUp "
            src="../src/assets/Home.png"
            alt="clip image"
          />
          <div className="bg-background-secondary px-10 py-4 my-3 rounded-b-2xl ">
            <h5 className="text-xl font-bold">Tokenize your assets</h5>
            <p>on our platfrom</p>
          </div>
        </div>
        <div></div>{" "}
      </div>
      {/* TODO: Add marketplace overview */}
      <div className="my-20">
        <h5 className="text-4xl font-semibold mb-2">How it works</h5>
        <p className="text-lg text-gray-400">Find out how to get started.</p>

        <div className="sm:flex space-y-6 sm:space-y-0 justify-between sm:space-x-10 mt-10">
          <LandingCard
            title={"Create your assets"}
            description={
              "Create your own asset by providing all the necessary information"
            }
          />

          <LandingCard
            title={"Tokenize your assets"}
            description={"Tokenize your assets and own it digitally"}
          />
          <LandingCard
            title={"Trade with your assets"}
            description={
              "Choose between auctions and fixed-price listings. Start earning by selling your Assets or trading others."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
