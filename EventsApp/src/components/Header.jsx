import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminImage from "../assets/public/images/admin.png";
import logo from "../assets/public/images/logo4.png";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    setIsDropdownOpen(false); 
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false); 
  };

  return (
    <header className="bg-gradient-to-r from-gray-800 to-indigo-800 text-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center">
        <div className="flex items-center space-x-4">
          <Link to="/">
            <img src={logo} alt="Events App Logo" className="w-16 h-auto" />
          </Link>
          <Link to="/" className="text-2xl font-bold tracking-wide hover:text-blue-300 transition duration-300">
            Events App
          </Link>
        </div>

        <div className="flex-grow"></div>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-blue-300 transition duration-300">
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-300 transition duration-300">
            About
          </Link>
          {!user && (
            <>
              <Link
                to="/login"
                className="hover:text-blue-300 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/sign-in"
                className="hover:text-blue-300 transition duration-300"
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        {user && (
          <div className="ml-6 flex items-center space-x-6">
            <div
              className="flex items-center space-x-2 cursor-pointer relative"
              onClick={toggleDropdown}
            >
              <img
                src={adminImage}
                alt="User Avatar"
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <span className="text-lg font-medium">{user.name}</span>
            </div>
            {isDropdownOpen && (
              <div className="absolute right-6 top-16 bg-white text-gray-700 rounded-lg shadow-lg w-48">
                <div className="py-2">
                  <button
                    onClick={() => handleNavigation("/")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Home
                  </button>
                  {user.role === "ORGANIZATOR" ? (
                    <button
                      onClick={() => handleNavigation("/organizer/dashboard")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Dashboard (Organizer)
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNavigation("/user/dashboard")}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      Dashboard (User)
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
