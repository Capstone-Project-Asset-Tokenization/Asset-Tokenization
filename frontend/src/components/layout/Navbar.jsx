import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // For menu icons
import { IoRocketOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  let dispatch = useDispatch();

  const authState = useSelector((state) => state.auth);

  const initialUrls = [
    {
      name: "Home",
      link: "/",
      protected: false,
    },
    {
      name: "Marketplace",
      link: "/asset-marketplace",
      protected: false,
    },
    {
      name: "Register Asset",
      link: "/asset-registration",
      protected: true,
    },
    {
      name: "Verify Asset",
      link: "/asset-verification",
      protected: true,
    },
    {
      name: "Login",
      link: "/signin",
      protected: false,
    },
    {
      name: "Sign Up",
      link: "/signup",
      protected: false,
    },
    {
      name: "Profile",
      link: "/profile",
      protected: true,
    },
    {
      name: "LogOut",
      link: "/",
      protected: true,
      onClick: () => {
        dispatch(logout());
      },
    },
  ];

  const [navbarItems, setNavbarItems] = useState(initialUrls);

  useEffect(() => {
    if (authState.isAuthenticated) {
      let temp = initialUrls.filter(
        (item) => item.name !== "Login" && item.name !== "Sign Up"
      );
      setNavbarItems(temp);
    } else {
      let temp = initialUrls.filter((item) => !item.protected);
      setNavbarItems(temp);
    }
  }, [authState.isAuthenticated]);

  return (
    <nav className=" shadow-lg text-white border-b-1.7 ">
      <div className="mx-4">
        <div className="flex justify-between">
          <Link to="/" className="p-1">
            <div className="w-36 object-contain">
              <img
                className=""
                src=" ../src/assets/ATPlogo.png"
                alt="clip image"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center ">
            {navbarItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                onClick={() => {
                  if (item.onClick) item.onClick();
                }}
                className="py-2 px-2 m-2 hover:bg-purple-500 transition duration-300  rounded font-semibold"
              >
                {item.name}
              </Link>
            ))}
          </div>
          {/* Secondary Navbar items */}
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="outline-none mobile-menu-button"
            >
              {isMenuOpen ? (
                <AiOutlineClose className="text-3xl" />
              ) : (
                <AiOutlineMenu className="text-3xl" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        {navbarItems.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="block py-2 px-4 text-sm hover:bg-purple-500 hover:text-white"
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
