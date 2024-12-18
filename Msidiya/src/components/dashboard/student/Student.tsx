import React from 'react';
// import TrafficSource from './TrafficSource';
import { FaChalkboardTeacher, FaBookOpen, FaTasks, FaMoneyCheckAlt } from 'react-icons/fa';
// import axios from "axios";
import Avatar from '@mui/material/Avatar';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Slide } from "react-awesome-reveal";
import Alert from '@mui/material/Alert';
import CardMedia from '@mui/material/CardMedia';
import picture from '../../../assets/Capture d’écran_25-11-2024_44215_www.instagram.com.jpeg';
import Card from '@mui/material/Card';

const Student: React.FC = () => {
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
              <p className="text-gray-600">Progress</p>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-green-500">↑ 8% Since last month</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <FaBookOpen className="text-green-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Total Students</p>
              <p className="text-2xl font-bold">150</p>
              <p className="text-sm text-red-500">↓ 2% Since last month</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-orange-100 rounded-full">
              <FaTasks className="text-orange-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Groupe Number</p>
              <p className="text-2xl font-bold">75.5%</p>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div className="h-2 bg-purple-500 rounded-full" style={{ width: '75.5%' }}></div>
              </div>
              <p className="text-sm text-green-500">↑ 5% Since last month</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-xl flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <FaMoneyCheckAlt className="text-blue-500 text-2xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-600">Wallet</p>
              <p className="text-2xl font-bold">$15k</p>
              <p className="text-sm text-green-500">↑ 12% Since last month</p>
            </div>
          </div>
        </div>
       
        <Slide direction="left" style={{display:'flex',justifyContent:'center'}}>
            <div className="user-profile-view h-[15rem]   w-[50rem] bg-[#fff] rounded-[1rem] border-solid border border-[#e5e7eb] relative shadow-[0_4px_4px_0_rgba(174,174,174,0.25)]">
              <div className="flex flex-row row">
<div>
  <img src={picture} style={{height:'15rem',width:'15rem',borderRadius:'1rem'}} />
  </div>             
                <div className="column flex justify-evenly flex-col ml-2 w-[100%] px-12">
                  <span className="Username-tag font-almarai text-textcolor">
                    Admin
                  </span>
                  <span className="w-[100%] flex flex-row justify-between px-2 text-gray-400">
                   Adresse non encore fournie
                    <MapOutlinedIcon className="text-gray-400 font-almarai text-sm" />
                  </span>
                  <span className="w-[100%] flex flex-row justify-between text-gray-400 px-2">
                     Téléphone non encore fourni
                    <LocalPhoneOutlinedIcon className="text-gray-400 font-almarai text-sm" />
                  </span>
                  <span className="w-[100%] flex flex-row justify-between items-start text-gray-400 px-2">
                   Email non encore fourni
                    <EmailOutlinedIcon className="text-gray-400 font-almarai text-sm" />

                  </span>
                </div>
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
