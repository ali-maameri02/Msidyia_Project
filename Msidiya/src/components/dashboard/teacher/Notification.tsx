import "./style.css";
// import * as React from 'react';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
function Notification() {
  return (
    <main className=" mt-16 ml-16 ">

      <div className="grid  ">
        <p className="text-center text-3xl text-blue-500 my-2 font-bold rounded-xl ">Notification</p>
        <div className=" bg-blue-300 py-5 px-10 rounded-xl" >
          <div className=" grid bg-gray-200 p-5 rounded-xl   lg:grid-cols-8 md:grid-cols-5 my-2">
            <div className="lg:col-span-1">
              <div className="w-12 h-12 rounded-full bg-white flex align-middle justify-center items-center">
                <PaymentIcon />
              </div>

            </div>
            <div className=" lg:col-span-7 md:col-span-5">
              <p className="font-bold">Refund Request</p>
              <p className="text-sm">this a notification from center service</p>
              <p className="text-sm">29/08/2024, 15:58PM</p>
            </div>
          </div>

          <div className=" grid bg-gray-200 p-5 rounded-xl   lg:grid-cols-8 md:grid-cols-5 my-2">
            <div className="lg:col-span-1">
              <div className="w-12 h-12 rounded-full bg-white flex align-middle justify-center items-center">
                <PaymentIcon />
              </div>

            </div>
            <div className=" lg:col-span-7 md:col-span-5">
              <p className="font-bold">Refund Request</p>
              <p className="text-sm">this a notification from center service</p>
              <p className="text-sm">29/08/2024, 15:58PM</p>
            </div>
          </div>

          <div className=" grid bg-gray-200 p-5 rounded-xl   lg:grid-cols-8 md:grid-cols-5 my-2">
            <div className="lg:col-span-1">
              <div className="w-12 h-12 rounded-full bg-white flex align-middle justify-center items-center">
                <AccountBalanceIcon />
              </div>

            </div>
            <div className=" lg:col-span-7 md:col-span-5">
              <p className="font-bold">Refund Request</p>
              <p className="text-sm">this a notification from center service</p>
              <p className="text-sm">29/08/2024, 15:58PM</p>
            </div>
          </div>


          <div className=" grid bg-gray-200 p-5 rounded-xl   lg:grid-cols-8 md:grid-cols-5 my-2">
            <div className="lg:col-span-1">
              <div className="w-12 h-12 rounded-full bg-white flex align-middle justify-center items-center">
                <LocalMallIcon />
              </div>

            </div>
            <div className=" lg:col-span-7 md:col-span-5">
              <p className="font-bold">Refund Request</p>
              <p className="text-sm">this a notification from center service</p>
              <p className="text-sm">29/08/2024, 15:58PM</p>
            </div>
          </div>


          <div className=" grid bg-gray-200 p-5 rounded-xl   lg:grid-cols-8 md:grid-cols-5 my-2">
            <div className="lg:col-span-1">
              <div className="w-12 h-12 rounded-full bg-white flex align-middle justify-center items-center">
                <ShoppingCartIcon />
              </div>

            </div>
            <div className=" lg:col-span-7 md:col-span-5">
              <p className="font-bold">Refund Request</p>
              <p className="text-sm">this a notification from center service</p>
              <p className="text-sm">29/08/2024, 15:58PM</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


export default Notification;
