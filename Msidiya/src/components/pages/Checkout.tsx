import { axiosClient } from "../../assets/lib/axiosClient";
import NavBar from "../Landing/NavBar";
import Footer from "../Landing/Footer";
import { useCart } from "../Landing/context/CartContext";

// // CartItem remains the same for display purposes on the checkout page
// interface CartItem {
//   id: number; // Represents class_id
//   title: string;
//   price: number; // Used for display and calculating totalPrice on frontend
//   quantity: number;
//   main_image: string;
// }

// This is what we send to the backend per item
interface EnrollmentRequestItem {
  class_id: number;
}

const CheckoutPage = () => {
  // const location = useLocation();
  // const navigate = useNavigate();
  const { cartItems, clearCart, totalPrice } = useCart()

  const handleConfirmOrder = async () => {
    const token = localStorage.getItem("user");

    if (!token) {
      alert("You must be logged in to make a payment.");
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const itemsToEnroll: EnrollmentRequestItem[] = cartItems.map((item) => ({
      class_id: item.id,
    }));

    try {
      await axiosClient.post(
        "/api/e_wallet/transactions/enroll_class/",
        { items: itemsToEnroll }
      );

      // Notify success, clear cart and reload
      // Clear cart storage (adjust key if different in your implementation)
      clearCart()
      // Reload the page to reflect cleared cart
      window.location.reload();

    } catch (error: any) {
      console.error(
        "Error initiating enrollment:",
        error.response?.data || error.message
      );
      let errorMessage = "Failed to enroll in classes. Please try again.";
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
          if (error.response.data.detail) {
            errorMessage += ` ${error.response.data.detail}`;
          }
        } else if (error.response.data.detail) {
          errorMessage = error.response.data.detail;
        } else if (error.response.data.items && Array.isArray(error.response.data.items)) {
          const itemErrors = error.response.data.items
            .map((itemErr: any, index: number) =>
              itemErr && itemErr.class_id ? `Class ${cartItems[index]?.title || itemsToEnroll[index].class_id}: ${itemErr.class_id.join(', ')}` : null
            )
            .filter(Boolean)
            .join('\n');
          if (itemErrors) errorMessage = `Errors:\n${itemErrors}`;
        } else if (Object.keys(error.response.data).length > 0) {
          errorMessage = Object.entries(error.response.data)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('\n');
        }
      }
      alert(errorMessage);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <>
        <NavBar />
        <div className="container mx-auto p-4 mt-20 text-center">
          <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
          <p className="text-lg">Your cart is currently empty.</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.main_image}
                      alt={item.title}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-gray-600">
                        DA {item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">x{item.price}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">Total:</p>
                <p className="text-lg font-semibold">
                  DA {totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleConfirmOrder}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Confirm & Enroll
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
