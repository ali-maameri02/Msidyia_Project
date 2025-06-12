import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Navbar: React.FC = () => {
  const { user, isLoading, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-10 w-auto" src="/logo.png" alt="Logo" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="text-white hover:text-blue-200 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/group-classes"
                className="text-white hover:text-blue-200 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Group Classes
              </Link>
              <Link
                to="/Tutors"
                className="text-white hover:text-blue-200 inline-flex items-center px-1 pt-1 text-sm font-medium"
              >
                Tutors
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {isLoading ? (
              <div className="h-8 w-8 rounded-full animate-pulse bg-blue-300"></div>
            ) : user ? (
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="text-white hover:text-blue-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none">
                    {user.Picture ? (
                      <img
                        className="h-8 w-8 rounded-full object-cover ring-2 ring-white"
                        src={user.Picture}
                        alt={user.username}
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-blue-400 ring-2 ring-white flex items-center justify-center">
                        <span className="text-white text-sm">
                          {user.username?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <span className="text-sm font-medium text-white">
                      {user.username}
                    </span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    {user.Role === "Student" && (
                      <Link
                        to="/dashboardstudent"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        Dashboard
                      </Link>
                    )}
                    {user.Role === "Tutor" && (
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        Dashboard
                      </Link>
                    )}
                    {user.Role === "Ms_seller" && (
                      <Link
                        to="/dashboardseller"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
