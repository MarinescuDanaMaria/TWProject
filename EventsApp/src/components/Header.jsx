import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-row items-center justify-between">
        {}
        <div className="text-white font-bold text-xl">
          <a href="/" className="hover:text-blue-400">
            MyApp
          </a>
        </div>

        {}
        <div className="ml-auto space-x-4">
          {" "}
          {}
          <Link
            to="/login"
            className="inline-block px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 hover:text-white transition duration-300"
          >
            Login
          </Link>
          <Link
            to="/sign-in"
            className="inline-block px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 hover:text-white transition duration-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
