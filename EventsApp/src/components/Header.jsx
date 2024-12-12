import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import adminImage from "../assets/public/images/admin.png";
function Header() {
  // Presupunem că datele utilizatorului sunt stocate în localStorage (poți folosi și context sau sesiune)
  const user = JSON.parse(localStorage.getItem("user")); // Aici presupunem că stocăm informațiile utilizatorului
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  console.log("user", user);
  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Optionally clear any other related data (session, etc.)

    // Redirect the user to the login page
    navigate("/login");
  };
  return (
    <header className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="text-white font-bold text-xl">
          <a href="/" className="hover:text-blue-400">
            MyApp
          </a>
        </div>

        {/* If user is logged in, show profile and dropdown */}
        {user ? (
          <div className="ml-auto flex items-center space-x-4">
            {/* User's profile image and name */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={toggleDropdown}
            >
              <img
                src={adminImage}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
              />
              <span className="text-white">{user.name}</span>
            </div>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-6 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <div className="py-2">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Home
                  </Link>
                  {user.role === "ORGANIZATOR" ? (
                    <Link
                      to="/organizer/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Dashboard (Organizer)
                    </Link>
                  ) : (
                    <Link
                      to="/user-dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Dashboard (User)
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="ml-auto space-x-4">
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
        )}
      </div>
    </header>
  );
}

export default Header;
