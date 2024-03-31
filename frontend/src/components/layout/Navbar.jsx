import React, { useEffect, useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'; // For menu icons
import { IoRocketOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const authState = useSelector(state => state.auth);
  console.log('authState', authState)

  const [navbarItems, setNavbarItems] = useState([
    {
      name: 'Home',
      link: '/',
      protected: false
    },
    {
      name: 'Marketplace',
      link: '/asset-marketplace',
      protected: false

    },
    {
      name: 'Register Asset',
      link: '/asset-registration',
      protected: true
    },
    {
      name: 'Verify Asset',
      link: '/asset-verification',
      protected: true
    },
    {
      name: 'Login',
      link: '/signin',
      protected: false
    },
    {
      name: 'Sign Up',
      link: '/signup',
      protected: false
    },
    {
      name: 'Profile',
      link: '/profile',
      protected: true
    }
  ]);

  useEffect(() => {
    if (authState.isAuthenticated) {
      let temp = navbarItems.filter(item => item.name !== 'Login' && item.name !== 'Sign Up');
      setNavbarItems(temp);
    } else {
      let temp = navbarItems.filter(item => !item.protected);
      setNavbarItems(temp);
    }
  }, [authState.isAuthenticated]);

  return (
    <nav className=" shadow-lg text-white border-b-1.7 mb-5 p-3">
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
            {
              navbarItems.map((item, index) => (
                <a key={index} href={item.link} className="py-2 px-2 m-2 hover:bg-purple-500 transition duration-300  rounded font-semibold">{item.name}</a>
              ))
            }

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
        {
          navbarItems.map((item, index) => (
            <a key={index} href={item.link} className="block py-2 px-4 text-sm hover:bg-purple-500 hover:text-white">{item.name}</a>
          ))
        }
      </div>
    </nav>
  );
};

export default Navbar;