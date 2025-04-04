import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface CartItem {
  main_image: string | undefined;
  id: number;
  title: string;
  price: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // Initialize cartItems from localStorage or as an empty array
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Save cartItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add an item to the cart
  const addToCart = (item: CartItem) => {
    console.log("Adding item to cart:", item);

    // Validate price
    if (typeof item.price !== "number") {
      console.error("Invalid price format for item:", item);
      return;
    }

    setCartItems((prev) => {
      // Check if the item already exists in the cart
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev; // Do not add duplicates
      } else {
        return [...prev, item];
      }
    });
  };

  // Remove an item from the cart
  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);