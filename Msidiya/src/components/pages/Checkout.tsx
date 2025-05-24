import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NavBar from "../Landing/NavBar";
import Footer from "../Landing/Footer";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  main_image: string;
}

const CheckoutPage = () => {
  const location = useLocation();

  // Extract cartItems and totalPrice from location.state
  const { cartItems, totalPrice }: { cartItems: CartItem[]; totalPrice: number } =
    location.state || {
      cartItems: [],
      totalPrice: 0,
    };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("user");
  
    if (!token) {
      alert("You must be logged in to make a payment.");
      return;
    }
  
    if (!cartItems.length) {
      alert("Your cart is empty.");
      return;
    }
  
    try {
      // Handle each class one by one
      for (const item of cartItems) {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/group-classes/initiate-payment/${item.id}/`,
          {},
          {
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
  
        // Redirect to the Chargily payment URL if available
        if (response.data.checkout_url) {
          window.location.href = response.data.checkout_url;
          return; // Redirects to only the first payment for now
        }
      }
  
      alert("Payment initiated.");
    } catch (error: any) {
      console.error("Error initiating payment:", error.response?.data || error.message);
      alert("Failed to initiate payment. Please try again.");
    }
  };
  

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 mt-20">
        {/* Shipping Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="fullName" className="text-sm font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="address" className="text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="city" className="text-sm font-medium mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="state" className="text-sm font-medium mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={formData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="zipCode" className="text-sm font-medium mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    placeholder="Enter your ZIP code"
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.main_image}
                      alt={item.title}
                      className="w-32 h-32 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-600">DA {item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">x{item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Total:</p>
                <p className="text-lg font-semibold">DA {totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="cardNumber" className="text-sm font-medium mb-1">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                placeholder="Enter your card number"
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="expiryDate" className="text-sm font-medium mb-1">
                  Expiry Date
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  placeholder="MM/YY"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cvv" className="text-sm font-medium mb-1">
                  CVV
                </label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="CVV"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Confirm Order Button */}
        <button
          onClick={handleConfirmOrder}
          className="w-full bg-cyan-500 text-white py-3 rounded-lg font-medium mt-6 hover:bg-cyan-600 transition-colors"
        >
          Confirm Order
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;