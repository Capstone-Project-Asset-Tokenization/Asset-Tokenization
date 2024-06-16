import React from 'react';
import { FaDiscord, FaYoutube, FaTwitter, FaInstagram } from 'react-icons/fa'; // Icons for social media

const Footer = () => {
  return (
    <footer className="border-t-1.6 text-white border-t border-neutral-700">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="flex flex-col">
            <span className="font-bold text-2xl mb-2">Asset Tokenization</span>
            <p className="text-gray-400 text-sm">Tokenize and manage all your assets in one place</p>
            <p className="text-gray-400 text-sm mt-2">Join our community</p>
            <div className="flex mt-2">
              <a href="#" className="mr-2">
                <FaDiscord className="text-xl" />
              </a>
              <a href="#" className="mr-2">
                <FaYoutube className="text-xl" />
              </a>
              <a href="#" className="mr-2">
                <FaTwitter className="text-xl" />
              </a>
              <a href="#" className="mr-2">
                <FaInstagram className="text-xl" />
              </a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-20 justify-between">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-400 uppercase mb-2">Explore</span>
              <a href="#" className="text-gray-400 text-sm hover:text-gray-200 mb-1">Marketplace</a>
              <a href="#" className="text-gray-400 text-sm hover:text-gray-200">Assets</a>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-400 uppercase mb-2">Contact Us</span>
              <a href="/FAQ" className="text-gray-400 text-sm hover:text-gray-200 mb-1">Support</a>
              <a href="/FAQ" className="text-gray-400 text-sm hover:text-gray-200">FAQs</a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-500 text-xs mt-8">
          <p>© {new Date().getFullYear()} Asset Tokenization Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
