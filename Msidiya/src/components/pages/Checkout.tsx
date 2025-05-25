import React, { useState } from "react";
import { useLocation } from "react-router-dom";
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
  const { cartItems, totalPrice }: { cartItems: CartItem[]; totalPrice: number } = location.state || {
    cartItems: [],
    totalPrice: 0,
  };

  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, section: "shipping" | "payment") => {
    const { id, value } = e.target;
    if (section === "shipping") {
      setShippingDetails((prev) => ({ ...prev, [id]: value }));
    } else {
      setPaymentDetails((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleConfirmOrder = async () => {
    const classId = 42; // Replace with the actual class ID or dynamically pass it
    try {
      const response = await fetch(`http://localhost:8000/group-classes/${classId}/initiate-payment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems,
          totalPrice,
          shippingDetails,
          paymentDetails,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Payment successful!");
        console.log("Payment Response:", data);
        // optionally redirect or clear cart here
      } else {
        console.error("Payment failed:", data);
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shipping Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <form className="space-y-4">
              {["name", "email", "address", "city", "state", "zip"].map((field) => (
                <div className="flex flex-col" key={field}>
                  <label htmlFor={field} className="text-sm font-medium mb-1 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type="text"
                    id={field}
                    placeholder={`Enter your ${field}`}
                    className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={(shippingDetails as any)[field]}
                    onChange={(e) => handleInputChange(e, "shipping")}
                  />
                </div>
              ))}
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item: CartItem) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={item.main_image} alt={item.title} className="w-32 h-32 object-cover rounded" />
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

        {/* Payment Form */}
        <div className="bg-white rounded-lg shadow p-6 mt-8">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="cardNumber" className="text-sm font-medium mb-1">Card Number</label>
              <input
                type="text"
                id="cardNumber"
                placeholder="Enter your card number"
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={paymentDetails.cardNumber}
                onChange={(e) => handleInputChange(e, "payment")}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label htmlFor="expiry" className="text-sm font-medium mb-1">Expiry Date</label>
                <input
                  type="text"
                  id="expiry"
                  placeholder="MM/YY"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={paymentDetails.expiry}
                  onChange={(e) => handleInputChange(e, "payment")}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="cvv" className="text-sm font-medium mb-1">CVV</label>
                <input
                  type="text"
                  id="cvv"
                  placeholder="CVV"
                  className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={paymentDetails.cvv}
                  onChange={(e) => handleInputChange(e, "payment")}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Submit */}
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
