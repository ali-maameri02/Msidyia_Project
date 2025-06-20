import React, { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaBookOpen,
  FaTasks,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Slide } from "react-awesome-reveal";
import { getUserWalletBalance } from "../../../services/wallet.services";
import { useLatestMessagesQuery } from "../../../services/chat/chat.queries";
import { useAuth } from "../../../hooks/useAuth";
import { useNotifications } from "../../../services/notifications/notification.queries";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Student: React.FC = () => {
  const { user } = useAuth();
  const [userBalance, setUserBalance] = useState(0);
  const { data: latestMessages } = useLatestMessagesQuery(user || undefined);
  const { data: notifications = [], isLoading: notificationsLoading } =
    useNotifications();

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

  const fetchUserBalance = async () => {
    try {
      const amount = await getUserWalletBalance();
      setUserBalance(parseInt(amount));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUserBalance();
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
              <p className="text-2xl font-bold">
                {latestMessages && latestMessages.length}
              </p>
              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-2 bg-purple-500 rounded-full"
                  style={{ width: "75.5%" }}
                ></div>
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

        <Slide
          direction="left"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="user-profile-view h-[15rem]  w-[50rem] bg-[#fff] rounded-[1rem] border border-[#e5e7eb] shadow-lg flex">
            <img
              src={user?.Picture || "default-profile.png"}
              className="h-[15rem] w-[15rem] rounded-[1rem] p-2"
              alt="User"
            />
            <div className="flex flex-col justify-evenly ml-2 w-full px-12">
              <span className="Username-tag font-almarai text-textcolor">
                {user?.username || "Utilisateur inconnu"}
              </span>
              <span className="w-full flex flex-row justify-between px-2 text-gray-400">
                {user?.Address || "Adresse non encore fournie"}
                <MapOutlinedIcon className="text-gray-400" />
              </span>
              <span className="w-full flex flex-row justify-between px-2 text-gray-400">
                {user?.Phone_number || "Téléphone non encore fourni"}
                <LocalPhoneOutlinedIcon className="text-gray-400" />
              </span>
              <span className="w-full flex flex-row justify-between px-2 text-gray-400">
                {user?.email || "Email non encore fourni"}
                <EmailOutlinedIcon className="text-gray-400" />
              </span>
            </div>
          </div>
        </Slide>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 bg-transparent">
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

export default Student;
