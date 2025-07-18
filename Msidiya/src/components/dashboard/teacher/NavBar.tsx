import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { User, fetchUserData } from '../../../utils/userData';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  // const [showLogin, setShowLogin] = useState(false);

  // Retrieve user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch user data from API (optional if you want to refresh periodically)
  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUserData();
  }, []);

  // Callback to update user state on login success
  // const handleLoginSuccess = (userData: User) => {
  //   setUser(userData);
  //   localStorage.setItem("user", JSON.stringify(userData));
  //   setShowLogin(false);
  // };

  return (
    <div>
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-white" style={{ zIndex: '9999' }}>
        <div className="flex-row flex">
          <div className="w-full border-b-2 border-gray-200">
            <div
              style={{
                width: '100vw',
                borderBottom: '0.5px solid',
                borderBottomColor: '',
                zIndex: '1',
              }}
              className="bg-white right-0 h-16 px-20 fixed justify-between items-center mx-auto flex"
            >
              <div className="lg:block mr-auto hidden relative max-w-xs">
                <p className="pl-3 items-center flex absolute inset-y-0 left-0 pointer-events-none">
                  <span className="justify-center items-center flex">
                    <span className="justify-center items-center flex">
                      <span className="items-center justify-center flex">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </span>
                    </span>
                  </span>
                </p>
                <input
                  placeholder="Type to search"
                  type="search"
                  className="border-none border-gray-300 focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm w-full rounded-lg pt-2 pb-2 pl-10 px-3 py-2 focus:outline-color1"
                />
              </div>
              <div className="md:space-x-6 justify-end items-center ml-auto flex space-x-3">
                <div className="relative">
                  <Link to="/dashboard/teacher/messages" className="pt-1 pr-1 pb-1 pl-1 bg-white text-gray-700 rounded-full transition-all duration-200 hover:text-gray-900 focus:outline-none hover:bg-gray-100">
                    <span className="items-center justify-center flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.2rem"
                        height="1.2rem"
                        viewBox="0 0 456.147 456.147"
                      >
                        <g>
                          <path
                            d="M445.666,4.445c-4.504-4.858-11.756-5.954-17.211-2.19L12.694,290.14c-3.769,2.609-5.878,7.012-5.555,11.586c0.323,4.574,3.041,8.635,7.139,10.686l95.208,47.607l37.042,86.43c1.78,4.156,5.593,7.082,10.064,7.727c0.621,0.091,1.242,0.136,1.856,0.136c3.833,0,7.506-1.697,9.989-4.701l38.91-46.994l107.587,52.227c1.786,0.867,3.725,1.306,5.663,1.306c1.836,0,3.674-0.393,5.384-1.171c3.521-1.604,6.138-4.694,7.146-8.432L448.37,18.128C449.314,14.629,449.878,8.988,445.666,4.445z M343.154,92.883L116.681,334.604l-71.208-35.603L343.154,92.883z M162.003,416.703l-27.206-63.48L359.23,113.665L197.278,374.771c-0.836,0.612-1.634,1.305-2.331,2.146L162.003,416.703z M312.148,424.651l-88.604-43.014L400.427,96.462L312.148,424.651z"
                          />
                        </g>
                      </svg>
                    </span>
                  </Link>
                </div>
                <div className="relative">
                  <Link to="/dashboard/teacher/notifications" className="pt-1 pr-1 pb-1 pl-1 bg-white text-gray-700 rounded-full transition-all duration-200 hover:text-gray-900 focus:outline-none hover:bg-gray-100">
                    <span className="justify-center items-center flex">
                      <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </span>
                  </Link>
                  <p className="px-1.5 py-0.5 font-semibold text-xs items-center bg-color1 text-white rounded-full inline-flex absolute -top-px -right-1">
                    2
                  </p>
                </div>
                <div className="justify-center items-center flex relative">
                  {user ? (
                    <div className="relative">
                      <img
                        src={user.Picture || "/default-avatar.png"}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full cursor-pointer object-cover"
                      />

                    </div>
                  ) : (
                    <>

                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
