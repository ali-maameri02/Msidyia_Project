import React, { useEffect, useState } from 'react';
// import TrafficSource from './TrafficSource';
import { FaChalkboardTeacher, FaBookOpen, FaTasks, FaMoneyCheckAlt } from 'react-icons/fa';
// import axios from "axios";
import Avatar from '@mui/material/Avatar';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Slide } from "react-awesome-reveal";
import { fetchUserData, User } from '../../../utils/userData'; // Adjust the import path if needed
import { getUserWalletBalance } from '../../../services/wallet.services';

const Student: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userBalance, setUserBalance] = useState(0)

  const getUserData = async () => {
    const userData = await fetchUserData();
    setUser(userData);
  };
  const fetchUserBalance = async () => {
    try {

      const amount = await getUserWalletBalance()
      setUserBalance(parseInt(amount))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getUserData();
    fetchUserBalance()
  }, []);
  return (
    <div className="flex mt-16 ml-16 ">


      {/* Main Content */}
      <main className="flex flex-col   mt-20 bg-transparent   ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <FaChalkboardTeacher className="text-purple-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Slots Progress</p>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-green-500">↑ 8% Since last month</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <FaBookOpen className="text-green-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Classes</p>
              <p className="text-2xl font-bold">150</p>
              <p className="text-sm text-red-500">↓ 2% Since last month</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <FaTasks className="text-orange-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Messages</p>
              <p className="text-2xl font-bold">75</p>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '75.5%' }}></div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaMoneyCheckAlt className="text-blue-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Wallet</p>
              <p className="text-2xl font-bold">MS {userBalance}</p>
              <p className="text-sm text-green-500">↑ 12% Since last month</p>
            </div>
          </div>
        </div>

        <Slide direction="left" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="user-profile-view h-[15rem]  w-[50rem] bg-[#fff] rounded-[1rem] border border-[#e5e7eb] shadow-lg flex">
            <img src={user?.Picture || 'default-profile.png'} className="h-[15rem] w-[15rem] rounded-[1rem] p-2" alt="User" />
            <div className="flex flex-col justify-evenly ml-2 w-full px-12">
              <span className="Username-tag font-almarai text-textcolor">{user?.username || 'Utilisateur inconnu'}</span>
              <span className="w-full flex flex-row justify-between px-2 text-gray-400">
                {user?.Address || 'Adresse non encore fournie'}
                <MapOutlinedIcon className="text-gray-400" />
              </span>
              <span className="w-full flex flex-row justify-between px-2 text-gray-400">
                {user?.Phone_number || 'Téléphone non encore fourni'}
                <LocalPhoneOutlinedIcon className="text-gray-400" />
              </span>
              <span className="w-full flex flex-row justify-between px-2 text-gray-400">
                {user?.email || 'Email non encore fourni'}
                <EmailOutlinedIcon className="text-gray-400" />
              </span>
            </div>
          </div>
        </Slide>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 bg-transparent">
          {/* Latest Notifications */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Latest Notifications</h2>
            <ul>
              <li className="py-2 border-b">Assignment deadline for Math 101</li>
              <li className="py-2 border-b">New message from John Doe</li>
              <li className="py-2 border-b">Class canceled for Biology 202</li>
              <li className="py-2">New enrollment in Chemistry 303</li>
            </ul>
          </div>

          {/* Recent Messages */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Recent Messages</h2>
            <ul>
              <li className="py-2 border-b">MSG-001 - From Jane Smith</li>
              <li className="py-2 border-b">MSG-002 - From Mark Wilson</li>
              <li className="py-2 border-b">MSG-003 - From Sarah Brown</li>
              <li className="py-2">MSG-004 - From Alex Johnson</li>
            </ul>
          </div>
        </div>
      </main>
    </div>

  );
};

export default Student;
