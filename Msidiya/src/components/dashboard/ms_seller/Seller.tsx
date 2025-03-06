import React, { useEffect, useState } from 'react';
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
import msidiyalogo from '../../../assets/msidiya.png';
import Card from '@mui/material/Card';
import SalesChart from './SalesChart';
import { motion } from "framer-motion";import msidiyalogo_M from '../../../assets/msidiya-m-logo.png'
// import { User } from '@phosphor-icons/react';
import { fetchUserData, User } from '../../../utils/userData'; // Adjust the import path if needed




const Seller: React.FC = () => {

  const [user, setUser] = useState<User | null>(null);

    const [cardNumber, setCardNumber] = useState("#### #### #### ####");
  const [cardHolder, setCardHolder] = useState("FULL NAME");
  const [expiryDate, setExpiryDate] = useState("MM/YY");
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value.toUpperCase());
  };


  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUserData();
      setUser(userData);
    };
    getUserData();
  }, []);
  return (
    <div className="flex mt-16 ml-16 ">
    

      {/* Main Content */}
      <main className="flex flex-col w-full   mt-20 bg-transparent   ">
        <div className="flex flex-row justify-around w-full align-middle items-center">
        <div className="flex flex-col items-center">
      {/* Card Container */}
      <div className="relative w-96 h-56 group perspective">
        {/* Card */}
        <motion.div
          className="relative w-full h-full rounded-xl shadow-xl shadow-slate-500"
          initial={{ rotateX: 0 }}
          whileHover={{ rotateX: 180 }}
          transition={{
            duration: 1.2, // Slow animation
            ease: [0.33, 1, 0.68, 1], // Smooth hand-like effect
          }}
          style={{
            transformStyle: "preserve-3d",
            perspective: "1000px",
          }}
        >
          {/* Front of the Card */}
          <div
            className="absolute w-full h-full rounded-xl bg-blue-600 text-white p-6 backface-hidden"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute top-3 left-4 h-5 w-8 rounded-sm">
              <img src={msidiyalogo_M} alt="Logo" />
            </div>
            <div className="absolute top-3 right-4 text-lg font-semibold">
              MS_Wallet
            </div>
            <div className="mt-8 text-xl tracking-wider">{cardNumber}</div>
            <div className="flex justify-between items-center mt-6 text-sm">
              <div>
                <span className="block uppercase text-gray-300">
                  Card Holder
                </span>
                <span className="block">{cardHolder}</span>
              </div>
              <div>
                <span className="block uppercase text-gray-300">Expires</span>
                <span className="block">{expiryDate}</span>
              </div>
            </div>
          </div>
          {/* Back of the Card */}
          <div
            className="absolute w-full h-full rounded-xl bg-blue-500 text-white flex justify-center items-center transform rotate-x-180"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateX(180deg)",
            }}
          >
<img src={msidiyalogo} alt="" className='p-5'/>          </div>
        </motion.div>
      </div>
    </div>

        <Slide direction="left" className='w-96' style={{display:'flex',justifyContent:'center'}}>
            <div className="user-profile-view    bg-[#fff] rounded-[1rem] border-solid border border-[#e5e7eb] relative shadow-[0_4px_4px_0_rgba(174,174,174,0.25)]">
              <div className="flex flex-col justify-content-around items-center py-2">
<div className='p-2'>
  <img src={user?.Picture} className='rounded-full' style={{height:'8rem',width:'8rem'}} />
  </div>             
                <div className="column flex justify-evenly items-center flex-col ml-2 w-[100%] px-12">
                  <span className="Username-tag font-almarai text-textcolor">
                  {user?.username}                
                    </span>
                  <span className="w-[100%] flex flex-row justify-between px-2 text-gray-400">
                  {user?.Address}        
                                      <MapOutlinedIcon className="text-gray-400 font-almarai text-sm" />
                  </span>
                  <span className="w-[100%] flex flex-row justify-between text-gray-400 px-2">
                  {user?.Phone_number}        
                                      <LocalPhoneOutlinedIcon className="text-gray-400 font-almarai text-sm" />
                  </span>
                  <span className="w-[100%] flex flex-row justify-between items-start text-gray-400 px-2">
                  {user?.email}   
                                      <EmailOutlinedIcon className="text-gray-400 font-almarai text-sm" />

                  </span>
                </div>
              </div>
            </div>
          </Slide>
          </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 bg-transparent">
        <div className="bg-white p-8 rounded-3xl shadow-2xl col-span-2">
            <h2 className="text-xl font-bold">Monthly Sales</h2>
            <div className="rounded-lg" style={{ zIndex: '-9999' }}>
              <SalesChart />
            </div>
          </div>
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

export default Seller;
