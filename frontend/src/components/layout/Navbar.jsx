import React from "react";

const Navbar = () => {
  return (
    <nav>
      <ul className="flex space-x-8 justify-end py-4 px-8">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/asset-registration">Asset </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
