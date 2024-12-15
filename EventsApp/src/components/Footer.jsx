import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Left Section */}
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Events App. All rights reserved.
        </div>

        {/* Middle Section */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link to="/about" className="hover:text-blue-300 transition duration-300">
            About
          </Link>
          <Link to="/about#contact" className="hover:text-blue-300 transition duration-300">
           Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="mt-4 md:mt-0">
          <div className="flex space-x-4 ml-2 inline-block">
          <span className="text-sm">Follow us:</span>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              Twitter
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
