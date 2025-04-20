import React from "react";
import { useCart } from "../../Landing/context/CartContext";
import { Button } from "../../atoms/Button";
// import NavBar from "../Landing/NavBar";
// import Footer from "../Landing/Footer";
import { useNavigate } from "react-router-dom";
import { Remove } from "@mui/icons-material";
import { Trash } from "@phosphor-icons/react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  main_image: string;
}

const CartPage = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // Redirect to Checkout Page
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items before proceeding to checkout.");
      return;
    }
    navigate("/cart/checkout", { state: { cartItems, totalPrice } });
  };

  return (
    <>
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg mb-4">Your cart is empty</p>
            <Button
              onClick={() =>  navigate('/group-classes')}
              className="bg-cyan-500 text-white px-6 py-2 rounded-lg"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div>
            {/* Cart Items List */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {cartItems.length} {cartItems.length === 1 ? "Group Class" : "Group Classes"} in Cart
                </h2>
                <Button
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Clear Cart
                </Button>
              </div>

              {/* Display Each Cart Item */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.main_image}
                        alt={item.title}
                        className="w-52 h-36 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-gray-600">DA {item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div>
                      <Button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        <Trash size={32}/>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Price and Checkout Button */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-lg font-semibold">Total:</p>
              <p className="text-lg font-semibold">DA {totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex flex-row justify-evenly">
            <Button
              onClick={() => navigate('/group-classes')}
              className="bg-cyan-500 text-white px-6 py-2 rounded-lg"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={handleCheckout}
              className=" bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium"
            >
              Proceed to Checkout
            </Button>
            </div>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default CartPage;