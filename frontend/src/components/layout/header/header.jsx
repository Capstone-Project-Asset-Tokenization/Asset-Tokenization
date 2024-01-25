import React from 'react';

function Header() {
  return (
    <div className="flex  border  ">
      <div className='flex m-16 items-center'>Logo</div>
      <div className='flex m-16  flex-col'>

      <nav className='flex flex-row'>
        <ul>
          <li aria-label="Market Place">Market Place</li>
          <li aria-label="Features">Features</li>
          <li aria-label="Contact Us">Contact Us</li>
          <li>
            <button aria-label="Sign In" className='bg-black px-4  py-2 rounded-md text-white'>Sign In</button>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  );
}

export default Header;