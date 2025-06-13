import React, { useState } from "react";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Slide } from "react-awesome-reveal";
import msidiyalogo from "../../../assets/msidiya.png";
import SalesChart from "./SalesChart";
import { motion } from "framer-motion";
import msidiyalogo_M from "../../../assets/msidiya-m-logo.png";
import { useNotifications } from "../../../services/notifications/notification.queries";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAuth } from "../../../hooks/useAuth";
import { useLatestMessagesQuery } from "../../../services/chat/chat.queries";
import { FaTasks } from "react-icons/fa";

const Seller: React.FC = () => {
  const { user } = useAuth();
  const { data: notifications = [], isLoading: notificationsLoading } =
    useNotifications();
  const { data: latestMessages } = useLatestMessagesQuery(user || undefined);
  const [cardNumber] = useState("#### #### #### ####");
  const [cardHolder] = useState("FULL NAME");
  const [expiryDate] = useState("MM/YY");

  const getNotificationIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "payment":
        return <PaymentIcon />;
      case "account":
        return <AccountBalanceIcon />;
      case "mall":
        return <LocalMallIcon />;
      case "cart":
        return <ShoppingCartIcon />;
      default:
        return <PaymentIcon />;
    }
  };

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
                  <div className="mt-8 text-xl tracking-wider">
                    {cardNumber}
                  </div>
                  <div className="flex justify-between items-center mt-6 text-sm">
                    <div>
                      <span className="block uppercase text-gray-300">
                        Card Holder
                      </span>
                      <span className="block">{cardHolder}</span>
                    </div>
                    <div>
                      <span className="block uppercase text-gray-300">
                        Expires
                      </span>
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
                  <img src={msidiyalogo} alt="" className="p-5" />{" "}
                </div>
              </motion.div>
            </div>
          </div>

          <Slide
            direction="left"
            className="w-96"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div className="user-profile-view    bg-[#fff] rounded-[1rem] border-solid border border-[#e5e7eb] relative shadow-[0_4px_4px_0_rgba(174,174,174,0.25)]">
              <div className="flex flex-col justify-content-around items-center py-2">
                <div className="p-2">
                  <img
                    src={user?.Picture}
                    className="rounded-full"
                    style={{ height: "8rem", width: "8rem" }}
                  />
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
            <div className="rounded-lg" style={{ zIndex: "-9999" }}>
              <SalesChart />
            </div>
          </div>
          {/* Latest Notifications */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Latest Notifications</h2>
            {notificationsLoading ? (
              <p className="text-gray-500">Loading notifications...</p>
            ) : notifications.length === 0 ? (
              <p className="text-gray-500">No notifications found</p>
            ) : (
              <ul>
                {notifications.slice(0, 4).map((notification) => (
                  <li
                    key={notification.id}
                    className="py-2 border-b flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      {getNotificationIcon(notification.user)}
                    </div>
                    <div>
                      <p className="font-medium">{notification.message}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Recent Messages */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Recent Messages</h2>
            {!latestMessages ? (
              <p className="text-gray-500">Loading messages...</p>
            ) : latestMessages.length === 0 ? (
              <p className="text-gray-500">No messages found</p>
            ) : (
              <ul>
                {latestMessages.slice(0, 4).map((msg, index) => (
                  <li
                    key={index}
                    className="py-2 border-b flex items-center gap-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <FaTasks className="text-orange-500" />
                    </div>
                    <div>
                      <p className="font-medium">{msg.last_message}</p>
                      <p className="text-sm text-gray-500">
                        From {msg.user.username}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Seller;
