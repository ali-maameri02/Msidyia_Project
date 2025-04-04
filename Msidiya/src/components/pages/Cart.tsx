import React from "react";
import { useCart } from "../Landing/context/CartContext";
import { Button } from "../atoms/Button";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  main_image:string;
}

const CartPage = () => {
  const { cartItems, clearCart, addToCart, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Button
            onClick={() => window.history.back()}
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
                {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"} in Cart
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
                      src={item.main_image} // Replace with actual image URL if available
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
                    >
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      onClick={() =>
                        addToCart({
                          id: item.id,
                          title: item.title,
                          price: item.price,
                          quantity: 1,
                          main_image:item.main_image,
                        })
                      }
                      className="bg-gray-200 text-gray-800 px-3 py-1 rounded"
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Total Price and Checkout Button */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-semibold">Total:</p>
            <p className="text-lg font-semibold">${totalPrice.toFixed(2)}</p>
          </div>
          <Button
            onClick={() => alert("Proceeding to checkout...")}
            className="w-full bg-cyan-500 text-white py-3 rounded-lg font-medium"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartPage;