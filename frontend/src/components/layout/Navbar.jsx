import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // For menu icons
import { IoRocketOutline } from "react-icons/io5";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className=" shadow-lg text-white border-b-1.7">
      <div className="mx-4">
        <div className="flex justify-between">
          <div className="flex ">
            <div>
              {/* Website Logo */}
              <a href="#" className="flex items-center py-4 px-2">
                <span className="font-semibold  text-lg">Asset Tokenization Platform</span>
              </a>
            </div>
            {/* Primary Navbar items */}
          </div>
          <div className="hidden md:flex items-center ">
            <a href="#" className="py-4 px-2 hover:bg-purple-500 transition duration-300  rounded font-semibold">Home</a>
            <a href="#" className="py-4 px-2 hover:bg-purple-500 transition duration-300 rounded font-semibold">Marketplace</a>
            <a href="#" className="py-4 px-2 hover:bg-purple-500 transition duration-300 rounded font-semibold">Tokenize</a>
            <a href="#" className="py-4 px-2 hover:bg-purple-500 transition duration-300  rounded font-semibold">Contact us</a>
          {/* <div className="hidden md:flex items-center "> */}
            <a href="#" className="py-2 px-2 flex justify-center items-center font-medium  rounded bg-purple-500 hover:text-white transition duration-300">
              <IoRocketOutline />
              Profile</a>
          {/* </div> */}
          </div>
          {/* Secondary Navbar items */}
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="outline-none mobile-menu-button">
              {isMenuOpen ? <AiOutlineClose className="text-3xl" /> : <AiOutlineMenu className="text-3xl" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-purple-500 hover:text-white">Home</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-purple-500 hover:text-white">Marketplace</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-purple-500 hover:text-white">Tokenize</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-purple-500 hover:text-white">Contact us</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-purple-500 hover:text-white">Profile</a>
      </div>
    </nav>
  );
};

export default Navbar;